<script lang="ts">
    import type { Puzzle, State } from '../types/puzzle'
    import type { Key } from '../types/actions'
    import { tick } from 'svelte'
    import { game, next, input } from '../lib/state.svelte'
    import Keyboard from './Keyboard.svelte'
    import BoardClue from "./BoardClue.svelte"
    import puzzles from '../assets/puzzles.json'

    let filtered: Puzzle[] = puzzles.filter(function (puzzle) {
        const date = (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0")
        return puzzle.date <= date
    })
    game.puzzle = loadPuzzle()
    game.state = loadState(game.puzzle.id)
    // on change, store the game state in local storage
    $effect(() => localStorage.setItem(game.puzzle.id, JSON.stringify(game.state)))

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

        // save active puzzle to local storage, focus first input, and return it
        localStorage.setItem('active', saved.id)
        tick().then(() => input(next(0), 0)?.focus())
        return saved
    }

    function loadState(id?: string): State {
        // if given an ID, check localStorage for it
        if (id) {
            const local = localStorage.getItem(id)
            // if we found a state, parse and return it
            if (local !== null) {
                return JSON.parse(local)
            }
        }

        // otherwise, no local state, so return empty array
        return []
    }

    // switch active puzzle to the chosen one
    function choose(e: Event): void {
        const el = e.target as HTMLSelectElement
        game.inputs = []
        game.state = loadState(el.value)
        game.puzzle = loadPuzzle(el.value)
    }

    /**
     * Given a action from the keyboard, trigger a custom 'key' event on the last focused input.
     */
    function key(key: Key): void {
        const target = input(game.focused.clue, game.focused.input)
         target?.dispatchEvent(new CustomEvent('key', {detail: key}))
    }

    function reset() {
        if (confirm('are you sure?')) {
            for (let inputRow of game.inputs) {
                for (let inputBox of inputRow ?? []) {
                    if (inputBox) inputBox.value = ''
                }
            }
            game.state = []
        }
    }
</script>

<div>
    <select name="puzzles" onchange={choose}>
        {#each filtered as option}
            <option value={option.id} selected={option.id === game.puzzle.id}>
                {option.date}
            </option>
        {/each}
    </select>
</div>

<div>
    <h1>{game.puzzle.name || 'Untitled'}</h1>
    <span>by {game.puzzle.author || 'Unknown'}</span>
</div>

<BoardClue />
<div class="controls">
    <button onclick={reset}>Reset Puzzle</button>
    <button class="keyboard-toggle" onclick={() => game.keyboardVisible = !game.keyboardVisible}>
        {game.keyboardVisible ? 'Hide' : 'Show'} Keyboard
    </button>
</div>
{#if game.keyboardVisible}
    <Keyboard {key}/>
{/if}

<style>
    :root {
        font-family: monospace;
        line-height: 1;
        font-weight: 400;
        font-size: 62.5%;
    }

    select {
        margin-top: 24px;
    }

    select, button {
        padding: 12px;
        border: none;
        border-radius: 8px;
    }

    .controls {
        display: flex;
        gap: 12px;
        margin-top: 12px;
    }

    .keyboard-toggle {
        display: inline-block;

        @media (pointer: coarse) {
            display: none;
        }
    }

    h1 {
        font-size: 1.6rem;
        padding: 8px 0;
    }
    span {
        font-size: 1.6rem;
    }
</style>