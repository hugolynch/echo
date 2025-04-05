<script lang="ts">
    import type { Puzzle, Clue } from '../types/puzzle'
    import EditorClue from "./EditorClue.svelte"

    // default puzzle to load if none is found in localStorage
    let empty: Puzzle = {name: "name", date: (new Date).toISOString(), solution: "", clues: []}
    let puzzle: Puzzle = $state(JSON.parse(localStorage.getItem('editor') || JSON.stringify(empty)))
    let copied = $state(false)

    $effect(() => {
        localStorage.setItem('editor', JSON.stringify(puzzle))
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
