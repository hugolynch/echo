<script lang="ts">
    import type { Puzzle, Clue } from '../types/puzzle'
    import BoardClue from "./BoardClue.svelte"
    import puzzles from '../assets/puzzles.json'

    let filtered: Puzzle[] = puzzles.filter(function (puzzle) {
        const date = (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0")
        return puzzle.date <= date
    })
    let puzzle: Puzzle = $state(loadPuzzle())
    let solved: string[] = $derived(getSolved(puzzle.root))

    $effect(() => localStorage.setItem(puzzle.id, JSON.stringify(solved)))

    /**
     * Loads a puzzle.
     *
     * If given an ID, try to load the corresponding puzzle from the list.
     * Otherwise load the active puzzle, or else the latest one.
     */
    function loadPuzzle(id?: string): Puzzle {
        let chosen: Puzzle|null
        if (id) {
            console.log(`id: ${id}`)
            // when given an id, try to load that puzzle
            chosen = filtered.find(p => p.id === id) ?? null
        } else {
            // when not given an id, try to load active puzzle
            const active = localStorage.getItem('active')
            chosen = filtered.find(p => p.id === active) ?? null
        }
        // if we couldn't get a valid puzzle, return the last one
        if (! chosen) {
            chosen = filtered[filtered.length - 1]
        }

        // load...
        const saved = localStorage.getItem(chosen.id)
        if (saved) {
            chosen.root = loadState(chosen.root, JSON.parse(saved))
        }

        // save active puzzle to local storage and return it
        localStorage.setItem('active', chosen.id)
        return chosen
    }

    function loadState(node: Clue, ids: string[]): Clue {
        if (node.id && ids.includes(node.id)) {
            // if this node is solved, mark it as so
            node.solved = true
        } else {
            // otherwise, recursively check children
            node.clues = node.clues?.map(n => loadState(n, ids))
        }

        return node
    }

    function getSolved(node: Clue): string[] {
        return node.id && node.solved
            ? [node.id]
            : (node.clues ?? []).flatMap(n => getSolved(n))
    }

    function reset(node: Clue): void {
        node.solved = false
        node.clues?.map(n => reset(n))
    }

    // switch active puzzle to the chosen one
    function choose(e: Event): void {
        const el = e.target as HTMLSelectElement
        puzzle = loadPuzzle(el.value)
    }
</script>

<div>
    <span class="help">Tutorial here →</span>

    <select name="puzzles" onchange={choose}>
        {#each filtered as option}
            <option value={option.id} selected={option.id === puzzle.id}>
                {option.name}
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

<button onclick={() => reset(puzzle.root)}>Reset Puzzle</button>

<style>
    select {
        margin: 0 auto;
    }

    .help {
        color: #DC6B6E;
    }
</style>