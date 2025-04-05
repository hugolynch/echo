<script lang="ts">
    import EditorClue from './EditorClue.svelte'
    import Placeholder from './Placeholder.svelte'

    let {
        solution = $bindable(),
        clues = $bindable([]),
        parent = $bindable(null),
        parentIndex = 0
    } = $props()

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
        if(start === undefined || end === undefined || start === end) {
            console.log("no selection")
            return
        }

        let newClues = [
            {solution: val?.slice(0, start), clues: []},
            {solution: val?.slice(start, end), clues: [{solution: "", clues: []}]},
            {solution: val?.slice(end), clues: []},
        ].filter(s => s.solution?.length)
        if (clues.length === 0 && parent) {
            // text node with neighbours: need to splice new clues in the parent
            parent.splice(parentIndex, 1, ...newClues)
        } else {
            // any other node: insert new clues for this solution
            clues = newClues
        }
    }

    function text(node: {clues: object[]}): boolean {
        return node.clues.length === 0;
    }
</script>

<div class={{'node': true, 'leaf': clues.length === 1 && clues[0].clues.length === 0, 'text': clues.length === 0}}>
    {#if clues.length === 0}
        <!-- text node -->
        <!-- <div class="solution"> -->
            <span contenteditable bind:textContent={solution} onkeypress={split}></span>
            <!-- <button class="delete">X</button> -->
        <!-- </div> -->
    {:else if clues.length === 1 && clues[0].clues.length === 0}
        <!-- leaf node -->
        <span contenteditable bind:textContent={clues[0].solution} onkeypress={split}></span>
        <span contenteditable bind:textContent={solution} onkeypress={preventNewline} class="solution"></span>
    {:else}
        <!-- clue node -->
        <div class="clue">
            {#each clues as clue, parentIndex}
                {#if parentIndex === 0 && !text(clue)}
                    <Placeholder bind:clues={clues} position={0} />
                {/if}
                <EditorClue bind:solution={clue.solution} bind:clues={clue.clues} bind:parent={clues} {parentIndex} />
                {#if parentIndex === clues.length - 1 && !text(clue)}
                    <Placeholder bind:clues={clues} position={clues.length} />
                {:else if parentIndex < clues.length && !text(clue) && !text(clues[parentIndex + 1])}
                    <Placeholder bind:clues={clues} position={parentIndex + 1} />
                {/if}
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
        max-width: 80vw;
    }

    .clue {
        display: flex;
        align-items: end;
        gap: 4px;
        margin: 4px 4px 2px 4px;
        background-color: white;
        flex-wrap: wrap;
    }

    span[contenteditable] {
        border-radius: 0;
        border: none;
        padding: 4px;
        text-transform: none;
        background-color: #E9F5FE;
        letter-spacing: normal;
        font-family: monospace;
        white-space: pre;
        text-align: left;
        color: #084E74;
        text-decoration: none;
        overflow-x: auto;
        line-height: 16px;

        &:focus {
            outline: 1px solid #1596D9;
        }

        .text.node > & {
            background-color: white;
        }
        .leaf.node > &:first-child {
            width: 100%;
            background-color: white;

            &:empty::before {
                content: ' ';
                background-color: #E9F5FE;
                color: #98D1FA;
            }
        }
    }
</style>