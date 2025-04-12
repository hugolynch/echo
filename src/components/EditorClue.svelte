<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import { preventNewline, get, set } from '../lib/editable'
    import EditorClue from './EditorClue.svelte'
    import Placeholder from './Placeholder.svelte'

    let {
        index = 0,
        node = $bindable() as Clue,
        parent = $bindable() as Clue,
    } = $props()

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
            {solution: val?.slice(0, range.startOffset) ?? ''},
            {solution: val?.slice(range.startOffset, range.endOffset) ?? '', clues: [{solution: ""}]},
            {solution: val?.slice(range.endOffset) ?? ''},
        ].filter(s => s.solution?.length)

        if (text(node) && parent) {
            // text node with neighbours: need to splice new clues in the parent
            parent.clues?.splice(index, 1, ...newClues)
            parent.clues = adjustIds(parent.clues, parent.id)
        } else {
            // any other node: insert new clues for this solution
            node.clues = adjustIds(newClues, node.id)
        }
    }

    /**
     * Given a list of nodes and a prefix, adjust their IDs to match their actual position.
     * This basically needs to run on arrays of clues whenever we modify them to make sure the IDs stay correct.
     */
    function adjustIds(nodes?: Clue[], prefix?: string): Clue[] {
        if (! nodes) return [];

        for (let i = 0; i < nodes.length; i++) {
            if (!text(nodes[i])) {
                const id = nodes.slice(0, i).filter(n => !text(n)).length + 1
                nodes[i].id = prefix ? `${prefix}.${id}` : `${id}`
                // recursively adjust IDs down the tree
                nodes[i].clues = adjustIds(nodes[i].clues, nodes[i].id)
            }
        }
        return nodes
    }

    function deleteEmpty() {
        if (node.solution === "" && text(node) && parent) {
            parent.clues?.splice(index, 1)
        }
    }

    function collapse() {
        // turn leaf node into text node by deleting its clues
        node.clues = []
        if (parent) {
            // go through parent clues and concatenate any resulting adjacent text nodes
            parent.clues = parent.clues?.reduce((acc: Clue[], curr: Clue) => {
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
            parent.clues = adjustIds(parent.clues, parent.id)
        }
    }

    function leaf(node: Partial<Clue>): boolean {
        return node.clues?.length === 1 && text(node.clues[0])
    }

    function text(node: Partial<Clue>): boolean {
        return !node.clues?.length;
    }
</script>

<div class={{'node': true, 'leaf': leaf(node), 'text': text(node)}}>
    {#if text(node)}
        <!-- text node -->
        <span contenteditable tabindex="0" role="textbox"
            bind:innerHTML={() => get(node.solution), (val) => node.solution = set(val)}
            onblur={deleteEmpty}
            onkeypress={split}></span>
    {:else if leaf(node)}
        <!-- leaf node: we know we have exactly one clue here -->
        <span contenteditable tabindex="0" role="textbox"
            bind:innerHTML={() => get(node.clues![0].solution), (val) => node.clues![0].solution = set(val)}
            onkeypress={split}></span>
        <span class="solution" data-id={node.id}>
            <span contenteditable tabindex="0" role="textbox"
                bind:innerHTML={() => get(node.solution), (val) => node.solution = set(val)}
                onkeypress={preventNewline}></span>
            <button class="btn" onclick={collapse}>&downarrow;</button>
        </span>
    {:else}
        <!-- clue node: we know clues is defined here -->
        <div class="clue">
            {#each node.clues ?? [] as child, i}
                {#if i === 0 && !text(child)}
                    <Placeholder bind:clues={node.clues} position={0} />
                {/if}
                <EditorClue index={i} bind:node={node.clues![i]} bind:parent={node} />
                {#if i === node.clues!.length - 1 && !text(child)}
                    <Placeholder bind:clues={node.clues} position={node.clues!.length} />
                {:else if i < node.clues!.length && !text(child) && !text(node.clues![i + 1])}
                    <Placeholder bind:clues={node.clues} position={i + 1} />
                {/if}
            {/each}
        </div>
        <span class="solution" data-id={node.id}>
            <span contenteditable tabindex="0" role="textbox"
                bind:innerHTML={() => get(node.solution), (val) => node.solution = set(val)}
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

        &[data-id]:not([data-id=""])::before {
            content: attr(data-id);
            display: flex;
            align-items: center;
            background-color: #CBE8FD;
            color: #084E74;
            line-height: 16px;
            margin: 0 auto;
            padding: 0 4px;
        }

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