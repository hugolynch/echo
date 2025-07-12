<script lang="ts">
    import type { Puzzle, State } from '../types/puzzle'
    import type { Key } from '../types/actions'
    import { game, input } from '../lib/state.svelte'
    import Keyboard from './Keyboard.svelte'
    import BoardClue from "./BoardClue.svelte"

    let { puzzle }: { puzzle: Puzzle } = $props()
    game.puzzle = puzzle
    game.state = loadState(game.puzzle.id)
    // on change, store the game state in local storage
    $effect(() => localStorage.setItem(game.puzzle.id, JSON.stringify(game.state)))

    /**
     * Given a puzzle ID, try to load the state from local storage.
     */
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

    /**
     * Given an action from the keyboard, trigger a custom 'key' event on the last focused input.
     */
    function key(key: Key): void {
        const target = input(game.focused.clue, game.focused.input)
        target?.dispatchEvent(new CustomEvent('key', {detail: key}))
    }
</script>

<div class="container">
    <BoardClue />
    <Keyboard {key} />
</div>

<style>
    :root {
        font-family: monospace;
        line-height: 1;
        font-weight: 400;
        font-size: 62.5%;
    }

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
      }
</style>