<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import BoardClue from './BoardClue.svelte'
    import Input from './Input.svelte'

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

{#snippet children(children: Clue[])}
    {#each children as child, i}
        {#if ! child.clues?.length}
            <span class="text">{child.solution}</span>
        {:else}
            <BoardClue id={child.id} depth={depth + 1} bind:node={node.clues![i]} />
        {/if}
    {/each}
{/snippet}

{#if solved}
    {#if depth}
        <span class="solution text">{node.solution}</span>
    {:else}
        <span class="puzzle text">{node.solution}</span>
    {/if}
{:else}
    <span class={{'clue': depth, 'puzzle': !depth, 'leaf': !height}} data-id={id} style:--height={height}>
        {#if height === 0}
            <div class="wrapper">{@render children(node.clues ?? [])}</div>
            <Input solution={node.solution} bind:solved={node.solved} />
        {:else}
            {@render children(node.clues ?? [])}
        {/if}
    </span>
{/if}

<style>
    .puzzle {
            display: flex;
            max-width: 100vw;
            overflow-x: scroll;
            align-items: center;
            padding: 24px 24px 72px 24px;
            color: #084E74;
            font-size: 1.6rem;

            & > .text {
                margin-bottom: 40px;
            }
        }

    .clue {
        display: flex;
        border: 1px dashed color(display-p3 0.34375 0.7265625 0.9375);
        background-color: color(display-p3 0.34375 0.7265625 0.9375 / .2);
        padding: 4px;
        border-radius: calc((var(--height) + 1) * 4px);
        text-align: left;
        align-items: start;
        margin: 0 2px;
        align-self: center;

        &:last-child {
            margin-right: 0;
        }

        &:first-child {
            margin-left: 0;
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
        margin-top: calc((var(--height)) * 5px);
        margin-right: 4px;
    }

    .leaf {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 8px;

        .wrapper {
            display: flex;
        }

        span {
            grid-row: 2 / 3;
            align-self: center;
        }
    }

    .text {
        white-space: pre;
        line-height: 16px;

        .clue:not(.leaf) > &{
            margin-top: calc((var(--height) + 1) * 5px + 23px);
        }
    }

    .solution {
        text-decoration: underline color(display-p3 0.34375 0.7265625 0.9375) 1px;
        text-underline-offset: 1px;
    }
</style>