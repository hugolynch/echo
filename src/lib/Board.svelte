<script lang="ts">
    import Clue from "./Clue.svelte";
    import puzzles from '../assets/puzzles.json'

    interface Clue {
        solution: string,
        clues?: Clue[],
        solved?: boolean,
    }
    interface Puzzle extends Clue {
        name: string,
    }

    let val = $state("")
    let puzzle: Puzzle = $state(puzzles[puzzles.length - 1])

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
    <select name="puzzles" onchange={(e) => puzzle = puzzles[e.target.value]}>
        {#each puzzles as puzzle, i}
            <option value={i} selected={i === puzzles.length - 1}>
                {puzzle.name}
            </option>
        {/each}
    </select>
</div>

<div class="puzzle">
    <Clue {...puzzle} depth={0} />
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
