<script lang="ts">
    import EditorClue from "./EditorClue.svelte"
    let puzzle: {solution: string, clues: object[]|undefined} = $state({
        solution: "Benedict XIII is elected Pope at the 1724 papal conclave.",
        clues: [
            {
                clues: [
                    {
                        clues: [
                            {solution: "blessing"}
                        ],
                        solution: "benediction"
                    },
                    {solution: " - ",},
                    {
                        clues: [
                            {solution: "charged particle"}
                        ],
                        solution: "ion"
                    }
                ],
                solution: "Benedict"
            },
            {solution: " XIII..."}
        ],
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
