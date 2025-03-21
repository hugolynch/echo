<script>
    import Clue from './Clue.svelte';

    let { solution, clues } = $props();
    let solved = $state(false);
</script>

<span class="clue">
    {#if solved}
        <span class="solution">{solution}</span>
    {:else}
        {#each clues as clue}
            {#if typeof clue === "string"}
                {clue}
            {:else}
                <Clue {...clue} />
            {/if}
        {/each}
    {/if}
    <input type="checkbox" bind:checked={solved}>
</span>

<style>
.clue {
    display: inline-block;
    border: 1px solid #58baf9;
    border-radius: 5px;
    background-color: oklch(from #58baf9 l c h / 0.2);
    padding: 3px;
    margin: 1px;
}
.solution {
    white-space: pre;
}
input[type="checkbox"] {
    min-width: inherit;
}
</style>