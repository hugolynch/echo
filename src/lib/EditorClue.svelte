<script lang="ts">
    import EditorClue from './EditorClue.svelte'
    let {solution = $bindable(), clues = $bindable()} = $props()
    if (clues === undefined) {
        clues = []
    }

    function preventNewline(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    function split(e: KeyboardEvent) {
        if (e.key !== "Enter") {
            return
        } else {
            e.preventDefault()
        }

        const val = (e.target as HTMLSpanElement).textContent
        const start = window.getSelection()?.anchorOffset
        const end = window.getSelection()?.focusOffset
        console.log(window.getSelection()?.getRangeAt(0))
        if(start === undefined || end === undefined || start === end) {
            console.log("no selection")
            return
        }

        clues = [
            {solution: val?.slice(0, start)},
            {solution: val?.slice(start, end), clues: [{solution: ""}]},
            {solution: val?.slice(end)},
        ].filter(s => s.solution?.length)
    }
</script>

<div class="clue">
    {#if clues.length === 0}
        <span contenteditable bind:textContent={solution} onkeypress={split} class='filler'></span>
    {:else if clues.length === 1}
        <div class='group'>
            <span contenteditable bind:textContent={clues[0].solution} onkeypress={split} class='leaf'></span>
            <span contenteditable bind:textContent={solution} onkeypress={preventNewline}></span>
        </div>
    {:else}
        <div class="clues">
            {#each clues as clue}
                <EditorClue bind:solution={clue.solution} bind:clues={clue.clues} />
            {/each}
        </div>
        <span contenteditable bind:textContent={solution} onkeypress={preventNewline}></span>
    {/if}
</div>

<style>

    .clue {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: 1px solid #CBE8FD;
        flex-grow: 1;

    }
    .clues {
        display: flex;
        align-items: end;
        gap: 2px;
        margin: 2px 2px 0 2px;
        background-color: white;

    }

    span[contenteditable] {
        border-radius: 0;
        border: none;
        padding: 8px;
        text-transform: none;
        background-color: #E9F5FE;
        letter-spacing: normal;
        font-family: monospace;
        min-width: none;
        size: 12px;
        white-space: pre;
        text-align: left;
        color: #0E74A9;
        text-decoration: none;

        &.filler {
            background-color: #F9FBFE;
        }

        &.leaf {
            background-color: white;
        }

        &:focus {
            outline: 1px solid #1596D9;
        }
    }

    .leaf:empty::before {
        /* border: 1px solid red; */
        content: 'CLUE';
        color: #98D1FA;
    }

    .group {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }
</style>