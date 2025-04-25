<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import BoardClue from './BoardClue.svelte';

    let {
        id = '',
        depth = 0,
        node = $bindable() as Clue
    } = $props();
    let height = $derived(getHeight(node));
    let solved = $derived.by((): boolean => {
        return depth === 0
            // if root, solved when every child clue is solved (excluding text nodes)
            ? (node.clues ?? []).filter(n => n.clues?.length).every(n => n.solved)
            // if not root, just return the node's solved value (default to false if undefined)
            : node.solved ?? false;
    });

    /**
     * Check if the current guess in the input is correct, and mark clue as solved if so.
     */
    function check(e: KeyboardEvent): void {
        if (e.key !== 'Enter') return;

        const guess = (e.target as HTMLInputElement).value;
        if (guess.trim().toLowerCase() === node.solution.toLowerCase()) {
            node.solved = true;
        }
    }

    /**
     * Returns the 'height' (i.e. distance from the bottom/furthest leaf) of the current node.
     * If the current node is a leaf (i.e. has no children), return 0.
     * Treats solved nodes as non-existent.
     */
    function getHeight(node: Clue): number {
        // get non-text, non-solved children (i.e. clue nodes)
        const clues = (node.clues ?? []).filter(n => n.clues?.length && !n.solved)
        // default to 0 if the node has no children
        return Math.max(0, ...clues.map(n => getHeight(n) + 1))
    }
</script>

<span class={{'clue': depth, 'solved': solved, 'puzzle': !depth, 'leaf': !height}} data-id={id} style:--height={height}>
    {#if solved}
        <span class="solution">{node.solution}</span>
    {:else}
        {#each node.clues ?? [] as child, i}
            {#if ! child.clues?.length}
                <span class="text">{child.solution}</span>
            {:else}
                <BoardClue id={child.id} depth={depth + 1} bind:node={node.clues![i]} />
            {/if}
        {/each}
        {#if height === 0}
            <div class="inputWrapper">
                <input onkeydown={check} placeholder={`${node.solution.length}`} enterkeyhint="done" />
            </div>
        {/if}
    {/if}
</span>

<style>
    .puzzle {
            display: flex;
            max-width: 100vw;
            overflow-x: scroll;
            align-items: center;
            padding: 24px 24px 72px 24px;
            color: #084E74;
            font-size: 1.6rem;
            gap: 4px;
        }

    .clue {
        display: flex;
        gap: 4px;
        border: 1px dashed color(display-p3 0.34375 0.7265625 0.9375);
        background-color: color(display-p3 0.34375 0.7265625 0.9375 / .2);        padding: 4px;
        /* need to multiply the height by a unit value to convert it */
        border-radius: calc((var(--height) + 1) * 4px);
        text-align: left;
        align-items: center;

        &.solved {
            background: none;
            border: none;
            padding: 0;
            margin: 0;

            & .solution {
                margin-top: 6px;
                text-decoration: underline color(display-p3 0.34375 0.7265625 0.9375) 1px;
                text-underline-offset: 1px;
            }
        }
    }

    .leaf {
        display: grid;
        align-items: center;
        column-gap: 0;

        grid-template-rows: 20px 24px 26px;
        grid-template-areas: 
            "index"
            "clue"
            "input";

        &::before {
            grid-area: index;
            /* align-self: center; */
        }

        .inputWrapper {
            grid-area: input;
            grid-column: 1 / 99;
            width: 100%;
            border: 1px solid #084E74;
            box-shadow: 1px 1px 0 0 #084E74;
        }

        span {
            grid-row: 2 / 3;
            align-self: center;
        }
    }

    .clue:not(.solved)[data-id]:not([data-id=""])::before {
        display: flex;
        content: attr(data-id);
        box-sizing: border-box;
        line-height: 16px;
        padding: 2px;
        background-color: #F9FBFE;
        width: max-content;
        justify-content: center;
    }

    .solution {
        white-space: pre;
    }

    .text {
        white-space: pre;
        line-height: 16px;
    }

    input {
        height: 24px;
        border-radius: 0;
        font-family: "IBM Plex Mono", monospace;
        color: #03304A;
        text-align: left;
        padding: 4px;
        border: none;
        outline: none;
        width: 100%;
        display: flex;
        background-color: #E9F5FE;


        &:focus {
            background-color: white;
        }
    }

</style>