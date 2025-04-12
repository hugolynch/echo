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
     * Treats solved nodes as non-existent.
     */
    function getHeight(node: Partial<Clue>): number {
        return node.clues?.length
            ? Math.max(...node.clues.filter(n => !n.solved).map(n => getHeight(n))) + 1
            : 0;
    }
</script>

<span class={{'clue': depth, 'leaf': height === 1, 'solved': solved}} data-id={id} style:--height={height} >
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
        {#if height === 1}
            <input onkeydown={check} placeholder={`${node.solution.length}`} />
        {/if}
    {/if}
</span>

<style>
    .clue {
        display: inline-block;
        border: 1px dashed #58BAF9;
        background-color: oklch(from #58BAF9 l c h / 0.2);
        padding: 1px;
        margin: 2px;
        /* need to multiply the height by a unit value to convert it */
        border-radius: calc(var(--height) * 4px);
        text-align: left;
        align-items:start;

        &.solved {
            background: none;
            border: none;
            padding: 0;
            margin: 0;

            & .solution {
                text-decoration: underline #58baf9 1px;
                text-underline-offset: 1px;
            }
        }
    }

    .clue:not(.solved)[data-id]:not([data-id=""])::before {
        content: attr(data-id);
        box-sizing: border-box;
        display: inline-block;
        min-width: 16px;
        line-height: 16px;
        padding: 0 2px;
        margin: 2px;
        background-color: #F9FBFE;
    }

    .solution {
        white-space: pre;
        display: inline-block;
        line-height: 16px;
        
    }

    .solved.clue {
        &:last-child {
            margin-right: 2px;
        }

        &:first-child {
            margin-left: 2px;
        }
    }

    .clue .text {
        display: inline-block;
        line-height: 16px;
        margin: 2px;
        white-space: pre;

        &:last-child:not(:first-child) {
            margin-left: 0px;
        }

        &:first-child:not(:last-child) {
            margin-right: 0px;
        }
    }

    input {
        height: 24px;
        border-radius: 0;
        font-size: 1.4rem !important;
        font-family: "IBM Plex Mono";
        color: #03304A;
        text-align: left;
        padding: 2px;
        margin: 2px;
        border: 1px solid #084E74;
        box-shadow: 1px 1px 0 0 #084E74;
        outline: none;
        width: 100px;
        display: flex;

        &:focus {
            /* outline: 1px solid #1DA9F4; */
            background-color: #E9F5FE;
        }
    }
</style>