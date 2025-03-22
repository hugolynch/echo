<script lang="ts">
    import EditorClue from "./EditorClue.svelte"
    let puzzle: {solution: string, clues?: object[]} = $state({
        solution: "",
    })
    $inspect(puzzle)
</script>

<h1>Editor</h1>
<EditorClue bind:solution={puzzle.solution} bind:clues={puzzle.clues} />

<style>
    h1 {
        padding: 12px;
    }
</style>
