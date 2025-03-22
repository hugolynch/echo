<script>
    import Clue from './Clue.svelte';

    let { solution, clues = [], depth, solved = false } = $props();
</script>

<span class={{'clue': depth}}>
    {#if solved}
        <span class="solution">{solution}</span>
    {:else}
        {#each clues as clue}
            {#if ! clue.clues?.length}
                {clue.solution}
            {:else}
                <Clue {...clue} depth={depth + 1} />
            {/if}
        {/each}
    {/if}
    <!-- <input type="checkbox" bind:checked={solved}> -->
</span>

<style>
    .clue {
        display: inline-block;
        border: 1px dashed #58baf9;
        border-radius: 2px;
        background-color: oklch(from #58baf9 l c h / 0.2);
        padding: 2px;
        margin: 2px;
    }

    .solution {
        white-space: pre;
    }

    input[type="checkbox"] {
        min-width: inherit;
    }
</style>