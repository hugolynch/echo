<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import BoardClue from './Clue.svelte';

    let { solution, clues = [], depth, solved = false } = $props();

    /**
     * Returns the 'height' (i.e. distance from the bottom/furthest leaf) of the current node.
     * Note: afaik because of the recursion we can't really use $derived.
     */
    function height(node: Clue): number {
        return node.clues?.length ? Math.max(...node.clues.map(n => height(n))) + 1 : 0;
    }
</script>

<span class={{'clue': depth, 'solved': solved}} style:--height={height({clues} as Clue)}>
    {#if solved}
        <span class="solution">{solution}</span>
    {:else}
        {#each clues as clue}
            {#if ! clue.clues?.length}
                {clue.solution}
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
        line-height: 1.6rem;
        padding: 2px;
        margin: 2px;
        /* need to multiply the height by a unit value to convert it */
        border-radius: calc(var(--height) * 4px);

        &.solved {
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            text-decoration: underline #58baf9 1px;
            text-underline-offset: 1px
        }
    }

    .solution {
        white-space: pre;
    }
</style>