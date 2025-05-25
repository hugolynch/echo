<script lang="ts">
    import type { Puzzle } from '../types/puzzle'
    import { game } from '../lib/state.svelte'
    import BoardClue from "./BoardClue.svelte"
    import puzzles from '../assets/puzzles.json'

    let filtered: Puzzle[] = puzzles.filter(function (puzzle) {
        const date = (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0")
        return puzzle.date <= date
    })

    game.puzzle = loadPuzzle()

    // let solved: string[] = $derived(getSolved(puzzle.root))
    // $effect(() => localStorage.setItem(puzzle.id, JSON.stringify(solved)))

    /**
     * Loads a puzzle.
     *
     * If given an ID, try to load the corresponding puzzle from the list.
     * Otherwise load the active puzzle, or else the latest one.
     */
    function loadPuzzle(id?: string): Puzzle {
        let saved: Puzzle|null
        if (id) {
            // when given an id, try to load that puzzle
            saved = filtered.find(p => p.id === id) ?? null
        } else {
            // when not given an id, try to load active puzzle
            const active = localStorage.getItem('active')
            saved = filtered.find(p => p.id === active) ?? null
        }
        // if we couldn't get a valid puzzle, return the last one
        if (! saved) {
            saved = filtered[filtered.length - 1]
        }

        // save active puzzle to local storage and return it
        localStorage.setItem('active', saved.id)
        return saved
    }

    /*
    function loadState(saved: SaveClue, ids: string[], parent: GameClue|null = null): GameClue {
        const node = {
            id: saved.id,
            parent,
            clues: [] as GameClue[],
            solution: saved.solution,
            solved: false
        }

        // if this node is solved, mark it as so
        if (saved.id && ids.includes(saved.id)) {
            node.solved = true
        }
        // recursively check child clues
        node.clues = (saved.clues ?? []).map(n => loadState(n, ids, node))

        return node
    }

    function getSolved(node: GameClue): string[] {
        return node.id && node.solved
            ? [node.id]
            : node.clues.flatMap(n => getSolved(n))
    }

    function reset(node: GameClue): void {
        node.solved = false
        node.clues.map(n => reset(n))
    }

    // switch active puzzle to the chosen one
    function choose(e: Event): void {
        const el = e.target as HTMLSelectElement
        puzzle = loadPuzzle(el.value)
    }
    */
</script>

<!-- <div>
    <select name="puzzles" onchange={choose}>
        {#each filtered as option}
            <option value={option.id} selected={option.id === puzzle.id}>
                {option.name}
            </option>
        {/each}
    </select>
</div> -->

<div>
    <h1>{game.puzzle.name || 'Untitled'}</h1>
    <span>by {game.puzzle.author || 'Unknown'}</span>
</div>

<BoardClue />
<!-- <button onclick={() => reset(puzzle.root)}>Reset Puzzle</button> -->

<style>
    /*
    select {
        margin: 0 auto;
    }

    button {
        margin: 0 24px;
        align-self: center;
    }
    */
</style>