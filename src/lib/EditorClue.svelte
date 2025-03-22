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

<div class={{'node': true, 'leaf': clues.length === 1, 'text': clues.length === 0}}>
    {#if clues.length === 0}
        <!-- text node -->
        <!-- <div class="solution"> -->
            <span contenteditable bind:textContent={solution} onkeypress={split}></span>
            <!-- <button class="delete">X</button> -->
        <!-- </div> -->
    {:else if clues.length === 1}
        <!-- leaf node -->
        <span contenteditable bind:textContent={clues[0].solution} onkeypress={split}></span>
        <span contenteditable bind:textContent={solution} onkeypress={preventNewline} class="solution"></span>
    {:else}
        <!-- clue node -->
        <div class="clue">
            {#each clues as clue}
                <EditorClue bind:solution={clue.solution} bind:clues={clue.clues} />
            {/each}
        </div>
        <span contenteditable bind:textContent={solution} onkeypress={preventNewline} class="solution"></span>
    {/if}
</div>

<style>
    .node {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border: 1px solid #CBE8FD;
        flex-grow: 1;
    }

    .clue {
        display: flex;
        align-items: end;
        gap: 2px;
        margin: 2px 2px 0 2px;
        background-color: white;
    }

    .leaf {
        gap: 1px;
    }

    span[contenteditable] {
        border-radius: 0;
        border: none;
        padding: 8px;
        text-transform: none;
        background-color: #E9F5FE;
        letter-spacing: normal;
        font-family: monospace;
        white-space: pre;
        text-align: left;
        color: #0E74A9;
        text-decoration: none;

        &:focus {
            outline: 1px solid #1596D9;
        }

        .text.node > & {
            background-color: #F9FBFE;
        }
        .leaf.node > &:first-child {
            width: 100%;
            background-color: white;

            &:empty::before {
                content: 'CLUE';
                color: #98D1FA;
            }
        }
    }
</style>