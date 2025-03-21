<script lang="ts">
    import EditorClue from './EditorClue.svelte'
    let {solution = $bindable(), clues = $bindable()} = $props()
    if (clues === undefined) {
        clues = []
    }

    function split(e: KeyboardEvent) {
        if(e.key !== "Enter") {
            return
        }

        const elem = e.target as HTMLInputElement
        const start = elem.selectionStart
        const end = elem.selectionEnd
        if(start === null || end === null || start === end) {
            console.log("no selection")
            return
        }

        clues = [
            {solution: solution.slice(start, end)},
        ]
        // TODO: insert solution.slice(0, start) before
        // TODO: insert solution.slice(end) after
    }
</script>

<div class="clue">
    {#if clues.length === 0}
     <input bind:value={solution} onkeypress={split} class='leaf' />
    {:else}
        <div class="clues">
            {#each clues as clue}
                <EditorClue bind:solution={clue.solution} bind:clues={clue.clues} />
            {/each}
        </div>
        <input bind:value={solution} />
    {/if}
</div>

<style>
    .clue {
        display: flex;
        flex-direction: column;
    }
    .clues {
        display: flex;
        align-items: end;
    }
    input {
        border-radius: 0;
        margin: 1px;
        width: 100%;
        padding: 0;
        flex-shrink: 1;

        &.leaf {
            border: 1px solid green;
        }
    }
</style>