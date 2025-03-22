<script lang="ts">
    import Clue from "./Clue.svelte";
    import puzzles from '/public/puzzles/puzzles.json'

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

    function check(clues: Clue[], answer: string): boolean {
        if (!clues) return false;

        for (let i = 0; i < clues.length; i++) {
            if (clues[i].solution === answer) {
                clues[i].solved = true
                return true
            }
            check(clues[i].clues ?? [], answer)
        }
        return false
    }
</script>

<select id="puzzle-select" name="puzzles" onchange={(e) => puzzle = puzzles[e.target.value]}>
    {#each puzzles as puzzle, i}
        <option value={i} selected={i === puzzles.length - 1}>
            {puzzle.name}
        </option>
    {/each}
</select>

<h1>{puzzle.name}</h1>
<div class="puzzle">
    <Clue {...puzzle} depth={0} />
</div>

<div>
    <input type="text" id="answer-input" bind:value={val} />
    <button id="submit-button" onclick={() => check([puzzle], val)}>Check Answer</button>
</div>
<p id="feedback"></p>

<style>
    .puzzle {
        margin: 1rem;
    }

    select {
        margin-bottom: 32px;
    }
</style>
