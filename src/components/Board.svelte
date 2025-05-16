<script lang="ts">
    import type { Puzzle, SaveClue, GameClue } from '../types/puzzle'
    import BoardClue from "./BoardClue.svelte"
    import puzzles from '../assets/puzzles.json'

    let filtered: Puzzle<SaveClue>[] = puzzles.filter(function (puzzle) {
        const date = (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0")
        return puzzle.date <= date
    })
    let puzzle: Puzzle<GameClue> = $state(loadPuzzle())
    let solved: string[] = $derived(getSolved(puzzle.root))

    $effect(() => localStorage.setItem(puzzle.id, JSON.stringify(solved)))

    /**
     * Loads a puzzle.
     *
     * If given an ID, try to load the corresponding puzzle from the list.
     * Otherwise load the active puzzle, or else the latest one.
     */
    function loadPuzzle(id?: string): Puzzle<GameClue> {
        let saved: Puzzle<SaveClue>|null
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

        // try to retrieve save state from local storage and load it into the saved puzzle
        // if no state is found, load puzzle with empty list of solved IDs
        // since this function also transforms the SavePuzzle into a GamePuzzle
        const state = localStorage.getItem(saved.id)
        const loaded = {
            ...saved,
            root: loadState(saved.root, state ? JSON.parse(state) : [])
        };

        // save active puzzle to local storage and return it
        localStorage.setItem('active', loaded.id)
        return loaded
    }

    function loadState(saved: SaveClue, ids: string[], parent: GameClue|null = null): GameClue {
        const node = {...saved, parent, solved: false}

        if (saved.id && ids.includes(saved.id)) {
            // if this node is solved, mark it as so
            node.solved = true
        } else {
            // otherwise, recursively check children
            node.clues = node.clues?.map(n => loadState(n, ids, node))
        }

        return node
    }

    function getSolved(node: GameClue): string[] {
        return node.id && node.solved
            ? [node.id]
            : (node.clues ?? []).flatMap(n => getSolved(n))
    }

    function reset(node: GameClue): void {
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

    button {
        margin: 0 24px;
        align-self: center;
    }
</style>