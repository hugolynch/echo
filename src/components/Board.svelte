<script lang="ts">
    import type { Puzzle, Clue } from '../types/puzzle'
    import BoardClue from "./Clue.svelte";
    import puzzles from '../assets/puzzles.json'

    console.log(puzzles.map(p => p.name))
    let filtered = puzzles.filter(function (puzzle) {
        const date = (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0");
        return puzzle.date <= date;
    })
    let val = $state("")
    let puzzle: Puzzle = $state(filtered[filtered.length - 1])

    function choose(e: Event) {
        const el = e.target as HTMLSelectElement
        // if we didn't pick a valid puzzle, select the first one
        puzzle = filtered[parseInt(el.value)] || filtered[0]
    }

    function handleKeypress(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            check([puzzle], val)
        }
    }

    function check(clues: Clue[], answer: string): boolean {
        if (!clues) return false;

        for (let i = 0; i < clues.length; i++) {
            if (clues[i].solution.toLocaleLowerCase() === answer.trim().toLowerCase()) {
                clues[i].solved = true
                val = ''
                return true
            }
            if (check(clues[i].clues ?? [], answer)) {
                return true;
            }
        }
        return false
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

<div class="puzzle">
    <BoardClue {...puzzle} depth={0} />
</div>

<div class="submit">
    <input type="text" bind:value={val} onkeypress={handleKeypress}/>
    <button onclick={() => check([puzzle], val)}>Check Answer</button>
</div>
<p id="feedback"></p>

<style>
    .puzzle {
        margin: 1rem;
        max-width: 90vw;
        color: #084E74
    }

    select {
        margin: 0 auto;
    }

    .submit {
        display: flex;
        gap: 12px;
        margin: 0 auto;
        flex-wrap: wrap;
        justify-content: center;
    }

    .help {
        color: #DC6B6E;
    }
</style>
