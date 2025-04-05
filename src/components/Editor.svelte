<script lang="ts">
    import EditorClue from "./EditorClue.svelte"

    let copied = $state(false)
    let puzzle: { name: string; date: string, solution: string; clues: object[] } = $state({
        name: "name", date: "date", solution: "", clues: []
    })

    function exportPuzzle() {
        console.debug($state.snapshot({...puzzle, date: (new Date).toString()}))
        let promise = navigator.clipboard.writeText(JSON.stringify(puzzle))
        promise.then(() => {
            copied = true
            setTimeout(() => {
                copied = false
          }, 2000);
        })
    }
</script>

<h1>Editor <span>BETA</span></h1>
<EditorClue bind:solution={puzzle.solution} bind:clues={puzzle.clues} />
<button onclick={exportPuzzle}>
    {#if !copied}
        Copy to Clipboard
    {:else}
        Copied to Clipboard ✅
    {/if}
</button>

<style>
    h1 {
        padding: 12px;

        span {
           color: #1DA9F4; 
           font-weight: normal;
        }
    }
</style>
