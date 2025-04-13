<script lang="ts">
    import type { Puzzle, Clue } from '../types/puzzle'
    import BoardClue from "./BoardClue.svelte";
    import puzzles from '../assets/puzzles.json'

    console.log(puzzles.map(p => p.name))
    let filtered: Puzzle[] = puzzles.filter(function (puzzle) {
        const date = (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0");
        return puzzle.date <= date;
    })
    let val = $state("")
    let puzzle: Puzzle = $state(loadPuzzle())

    // load puzzle from hash, or latest otherwise
    function loadPuzzle() {
        const hash = window.location.hash.substring(1);
        return hash ? JSON.parse(atob(hash)) : filtered[filtered.length - 1];
    }

    // switch active puzzle to the chosen one
    function choose(e: Event) {
        const el = e.target as HTMLSelectElement
        // if we didn't pick a valid puzzle, select the first one
        puzzle = filtered[parseInt(el.value)] || filtered[0]
    }
</script>

<div>
    <span class="help">Tutorial here →</span>

    <!-- <input name="puzzles" type="date" onchange={choose} /> -->
    <select name="puzzles" onchange={choose}>
        {#each filtered as puzzle, i}
            <option value={i} selected={i === filtered.length - 1}>
                {puzzle.name}
            </option>
        {/each}
    </select>
</div>

<div>
    <h1>{puzzle.name || 'Untitled'}</h1>
    <span>by {puzzle.author || 'Unknown'}</span>
</div>

<BoardClue bind:node={puzzle.root} />
<p id="feedback"></p>

<style>
    select {
        margin: 0 auto;
    }

    .help {
        color: #DC6B6E;
    }
</style>
