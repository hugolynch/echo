<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import BoardClue from './BoardClue.svelte';

    let {
        id = '',
        depth = 0,
        node = $bindable() as Clue
    } = $props();
    let height = $derived(getHeight(node));
    let guess = $state('');

    function check(e: KeyboardEvent) {
        if (e.key !== 'Enter') return;
        if (guess.toLowerCase() === node.solution.toLowerCase()) {
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

<span class={{'clue': depth, 'leaf': height === 1, 'solved': node.solved}} data-id={id} style:--height={height} >
    {#if node.solved}
        <span class="solution">{node.solution}</span>
    {:else}
        {#each node.clues ?? [] as clue, i}
            {#if ! clue.clues?.length}
                <span class="text">{clue.solution}</span>
            {:else}
                <BoardClue id={clue.id} depth={depth + 1} bind:node={node.clues![i]} />
            {/if}
        {/each}
        {#if height === 1}
            <input bind:value={guess} onkeydown={check} />
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
</style>