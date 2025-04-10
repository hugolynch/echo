<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import { preventNewline, get, set } from '../lib/editable'
    import EditorClue from './EditorClue.svelte'
    import Placeholder from './Placeholder.svelte'

    let {
        index = 0,
        parentId = '',
        solution = $bindable() as string,
        clues = $bindable([]) as Clue[],
        parent = $bindable(null) as Clue[]|null,
    } = $props()
    let node = $derived({solution, clues}) as Clue
    let id = $derived.by(() => {
        if (! parent) { return '' }
        const pos = parent.slice(0, index).filter(n => !text(n)).length + 1
        return parentId ? `${parentId}.${pos}` : `${pos}`
    })

    function split(e: KeyboardEvent) {
        if (e.key !== "Enter") {
            return
        } else {
            e.preventDefault()
        }

        const selection = window.getSelection()
        if (! selection) {
            console.log("no selection")
            return
        } else if (selection.rangeCount > 1) {
            console.log("multiple selections")
            return
        } else if (selection.isCollapsed) {
            console.log("empty selection")
            return
        } else if (selection.anchorNode !== selection.focusNode) {
            console.log("multi-container selection")
            return
        }

        // at this point, we know we have exactly one non-empty selection entirely within one container
        const range = selection.getRangeAt(0)
        const val = range.startContainer.textContent
        // selection of a whole container is inconsistent across browsers:
        //  - chrome gives (start: 0, end: length) with a text node
        //  - firefox gives (start: 0, end: 1) with the containing node (ie the contenteditable span)
        // the simplest way to handle this is checking if all the text was selected + the node isn't a text node
        // and modify the range accordingly
        if (range.startContainer.nodeType !== Node.TEXT_NODE && range.toString() === val) {
            // select the entire contents of the node's first child (which should be the relevant text node)
            // FIXME: probably not the most robust way of handling this...
            range.selectNodeContents(range.startContainer.childNodes[0])
        }

        let newClues: Clue[] = [
            {solution: val?.slice(0, range.startOffset) ?? '', clues: []},
            {solution: val?.slice(range.startOffset, range.endOffset) ?? '', clues: [{solution: "", clues: []}]},
            {solution: val?.slice(range.endOffset) ?? '', clues: []},
        ].filter(s => s.solution?.length)
        if (clues.length === 0 && parent) {
            // text node with neighbours: need to splice new clues in the parent
            parent.splice(index, 1, ...newClues)
        } else {
            // any other node: insert new clues for this solution
            clues = newClues
        }
    }

    function deleteEmpty() {
        if (solution === "" && text(node)) {
            parent?.splice(index, 1)
        }
    }

    function collapse() {
        // turn leaf node into text node by deleting its clues
        clues = []
        if (parent) {
            // go through parent clues and concatenate any resulting adjacent text nodes
            parent = parent.reduce((acc: Clue[], curr: Clue) => {
                if (acc.length === 0) {
                    acc.push(curr)
                } else {
                    if (text(acc[acc.length - 1]) && text(curr)) {
                        acc[acc.length - 1].solution += curr.solution;
                    } else {
                        acc.push(curr)
                    }
                }
                return acc
            }, [])
        }
    }

    function leaf(node: Clue): boolean {
        return node.clues?.length === 1 && text(node.clues[0])
    }

    function text(node: Clue): boolean {
        return !node.clues?.length;
    }
</script>

<div class={{'node': true, 'leaf': leaf(node), 'text': text(node)}}>
    {#if text(node)}
        <!-- text node -->
        <span contenteditable tabindex="0" role="textbox"
            bind:innerHTML={() => get(solution), (val) => solution = set(val)}
            onblur={deleteEmpty}
            onkeypress={split}></span>
    {:else if leaf(node)}
        <!-- leaf node -->
        <span contenteditable tabindex="0" role="textbox"
            bind:innerHTML={() => get(clues[0].solution), (val) => clues[0].solution = set(val)}
            onkeypress={split}></span>
        <span class="solution">
            {#if parent}[{id}]{/if}
            <span contenteditable tabindex="0" role="textbox"
                bind:innerHTML={() => get(solution), (val) => solution = set(val)}
                onkeypress={preventNewline}></span>
            <button class="btn" onclick={collapse}>&downarrow;</button>
        </span>
    {:else}
        <!-- clue node -->
        <div class="clue">
            {#each clues as clue, clueIndex}
                {#if clueIndex === 0 && !text(clue)}
                    <Placeholder bind:clues={clues} position={0} />
                {/if}
                <EditorClue bind:solution={clue.solution} bind:clues={clue.clues} bind:parent={clues}
                    parentId={id} index={clueIndex} />
                {#if clueIndex === clues.length - 1 && !text(clue)}
                    <Placeholder bind:clues={clues} position={clues.length} />
                {:else if clueIndex < clues.length && !text(clue) && !text(clues[clueIndex + 1])}
                    <Placeholder bind:clues={clues} position={clueIndex + 1} />
                {/if}
            {/each}
        </div>
        <span class="solution">
            {#if parent}[{id}]{/if}
            <span contenteditable tabindex="0" role="textbox"
                bind:innerHTML={() => get(solution), (val) => solution = set(val)}
                onkeypress={preventNewline}></span>
            <button class="btn" onclick={collapse}>&downarrow;</button>
        </span>
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

    .solution {
        display: inherit;
        position: relative;

        & > span[contenteditable] {
            width: 100%;
        }
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

    .btn {
        padding: 0 8px;
        /* position: absolute; */
        /* inset: auto 4px 4px auto; */
        /* border: 1px solid #1596D9; */
        display: none;
        border-radius: 0;
        background-color: #1596D9;
        color: white;

        .solution:focus-within > & {
            display: block;
        }
    }
</style>