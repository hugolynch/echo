<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import BoardClue from './Clue.svelte';

    let { id = '', solution, clues = [], depth, solved = false } = $props();
    let height = $derived(getHeight({clues}));

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

<span class={{'clue': depth, 'leaf': height === 1, solved}} data-id={id} style:--height={height} >
    {#if solved}
        <span class="solution">{solution}</span>
    {:else}
        <!-- if statement & loop need to be on same line to avoid extra whitespace between elements -->
        <!-- should move to flexbox to get rid of this issue altogether -->
        {#each clues as clue}
            {#if ! clue.clues?.length}
                <span class="text">{clue.solution}</span>
            {:else}
                <BoardClue {...clue} depth={depth + 1} />
            {/if}
        {/each}
    {/if}
    <!-- <input type="checkbox" bind:checked={solved}> -->
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

    .clue[data-id]:not([data-id=""])::before {
        content: attr(data-id);
        background-color: #F9FBFE;
        margin-right: 0;
        line-height: 16px;
        margin: 2px;
        padding: 0 2px;
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
</style>