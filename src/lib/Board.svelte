<script lang="ts">
    import Clue from "./Clue.svelte";
    import puzzles from '/public/puzzles/puzzles.json'
    let val = $state("")
    let selected = $state(puzzles.length - 1)

    interface Clue {
        solution: string,
        clues?: Clue[],
        solved?: boolean,
    }
    interface Puzzle extends Clue {
        name: string,
    }

    const puzzle: Puzzle = $derived(puzzles[selected])

    function check(clues: Clue[], answer: string): boolean {
        if (!clues) return false;

        for (let i = 0; i < clues.length; i++) {
            if (clues[i].solution === answer) {
                clues[i].solved = true
                return true
            }
            check(clues[i].clues!, answer)
        }
        return false
    }
</script>

<select id="puzzle-select" name="puzzles" bind:value={selected}>
    {#each puzzles as puzzle, i}
        <option value={i}>{puzzle.name}</option>
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
