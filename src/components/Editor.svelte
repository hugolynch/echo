<script lang="ts">
    import type { Puzzle, Clue } from '../types/puzzle'
    import EditorClue from "./EditorClue.svelte"

    const copyState = {
        NONE: 0,
        SUCCESS: 1,
        FAILED: 2,
    }

    // default puzzle to load if none is found in localStorage
    const empty: Puzzle = {
        id: "",
        name: "Untitled",
        author: "Unknown",
        date: (new Date).getFullYear()
            + "-" + `${(new Date).getMonth() + 1}`.padStart(2, "0")
            + "-" + `${(new Date).getDate()}`.padStart(2, "0"),
        root: { solution: "" },
    }
    let puzzle: Puzzle = $state(loadPuzzle(empty))
    let copied = $state(copyState.NONE)

    // fetch puzzle from localStorage
    function loadPuzzle(empty: Puzzle): Puzzle {
        const loaded = localStorage.getItem('editor')
        return loaded ? JSON.parse(loaded) : empty
    }

    // save puzzle (on change)
    $effect(() => {
        localStorage.setItem('editor', JSON.stringify(puzzle))
    })

    // export puzzle to clipboard
    function exportPuzzle() {
        puzzle.id = crypto.randomUUID()
        console.debug($state.snapshot(puzzle))
        navigator.clipboard.writeText(JSON.stringify(puzzle))
            .then(() => {
                copied = copyState.SUCCESS
            }, () => {
                copied = copyState.FAILED
            })
            .finally(() => {
                setTimeout(() => {
                    copied = copyState.NONE
                }, 2000)
            })
    }
</script>

<h1>Editor <span>BETA</span></h1>

<div class="metadata">
    <label class="fw">
        <span>Title</span>
        <input type="text" bind:value={puzzle.name} />
    </label>
    <label>
        <span>Author</span>
        <input type="text" bind:value={puzzle.author} />
    </label>
    <label>
        <span>Date</span>
        <input type="date" bind:value={puzzle.date} />
    </label>
</div>
<EditorClue bind:node={puzzle.root} />

<button onclick={exportPuzzle}>
    {#if copied === copyState.NONE}
        Copy to Clipboard
    {:else if copied === copyState.SUCCESS}
        Copied to Clipboard ✅
    {:else} <!-- copied === copyState.FAILED -->
        Could not copy to Clipboard ❎
    {/if}
</button>

<style>
    h1 {
        padding: 12px;

        span {
           color: #1DA9F4; 
           font-weight: normal;
        }
    }

    .metadata {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;

        & > label {
            text-align: left;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-grow: 1;

            &.fw {
                width: 100%;
            }

            & > input {
                width: 100%;
                margin-left: 1rem;
                text-transform: unset;
            }
        }
    }
</style>
