<script lang="ts">
    import Clue from './Clue.svelte';

    let { solution, clues = [], depth, solved = false } = $props();
</script>

<span class={{'clue': depth, 'solved': solved}}>
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