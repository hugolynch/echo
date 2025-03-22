<script lang="ts">
    import EditorClue from "./EditorClue.svelte"
    let puzzle: {name: string, solution: string, clues: object[]} = $state({
        name: "name", solution: "", clues: []
    })
    // $inspect(puzzle)

    function exportPuzzle() {
        console.log($state.snapshot({...puzzle, date: (new Date).toString()}))
    }
</script>

<h1>Editor</h1>
<EditorClue bind:solution={puzzle.solution} bind:clues={puzzle.clues} />
<button onclick={exportPuzzle}>Export (to console)</button>

<style>
    h1 {
        padding: 12px;
    }
</style>
