<script lang="ts">
    import type { Puzzle, Clue } from '../types/puzzle'
    import EditorClue from "./EditorClue.svelte"

    const copyState = {
        NONE: 0,
        SUCCESS: 1,
        FAILED: 2,
    }

    // default puzzle to load if none is found in localStorage
    let empty: Puzzle = {name: "name", date: (new Date).toISOString(), solution: "", clues: []}
    let puzzle: Puzzle = $state(JSON.parse(localStorage.getItem('editor') || JSON.stringify(empty)))
    let copied = $state(copyState.NONE)

    $effect(() => {
        localStorage.setItem('editor', JSON.stringify(puzzle))
    })

    function exportPuzzle() {
        console.debug($state.snapshot({...puzzle, date: (new Date).toString()}))
        navigator.clipboard.writeText(JSON.stringify(puzzle))
            .then(() => {
                copied = copyState.SUCCESS
            }, () => {
                copied = copyState.FAILED
            })
            .finally(() => {
                setTimeout(() => {
                    copied = copyState.NONE
                }, 2000)
            })
    }
</script>

<h1>Editor <span>BETA</span></h1>
<EditorClue bind:solution={puzzle.solution} bind:clues={puzzle.clues} />
<button onclick={exportPuzzle}>
    {#if copied === copyState.NONE}
        Copy to Clipboard
    {:else if copied === copyState.SUCCESS}
        Copied to Clipboard ✅
    {:else} <!-- copied === copyState.FAILED -->
        Could not copy to Clipboard ❎
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
