<script lang="ts">
    import { game, node, siblings, text, clue, parse } from '../lib/state.svelte'
    import BoardClue from './BoardClue.svelte'
    import Input from './Input.svelte'

    let { depth = 0, idx = 0 } = $props()
    let curr = $derived(node(idx)!)
    let height = $derived(getHeight(idx))
    let solved = $derived.by((): boolean => {
        if (depth === 0) {
            // if root, solved when all of the node's children are solved (excluding text nodes)
            const children = (game.puzzle.clues[idx].clues ?? []).filter(i => {
                const child = game.puzzle.clues[i]
                return child.clues?.length && !game.state.includes(i)
            })
            return children.length === 0
        } else {
            // otherwise check game state array
            return game.state.includes(idx)
        }
    })

    /**
     * Returns the 'height' (i.e. distance from the bottom/furthest leaf) of the current node.
     * If the current node is a leaf (i.e. has no children), return 0.
     * Treats text & solved nodes as non-existent.
     */
    function getHeight(idx: number): number {
        // get list of children's indixes, excluding text
        const children = (game.puzzle.clues[idx].clues ?? []).filter(i => {
            const child = game.puzzle.clues[i]
            return child.clues?.length && !game.state.includes(i)
        })
        // default to 0 if the node has no children
        return Math.max(0, ...children.map(n => getHeight(n) + 1))
    }

    /**
     * Returns true iff we should display a whitespace box before the given node,
     * false otherwise.
     */
    function before(idx: number): boolean {
        const sibs = siblings(idx)
        const prev = sibs[sibs.indexOf(idx) - 1] ?? null
        return node(idx)!.text.startsWith(' ') && clue(prev)
    }

    /**
     * Returns true iff we should display a whitespace box after the given node,
     * false otherwise.
     */
    function after(idx: number): boolean {
        const sibs = siblings(idx)
        const next = sibs[sibs.indexOf(idx) + 1] ?? null
        return node(idx)!.text.endsWith(' ') && clue(next)
    }
</script>

{#snippet children(children: number[])}
    {#each children as i}
        {#if text(i)}
            {#if before(i) && after(i)}
                <span class="text space-before space-after">{node(i)!.text.trim()}</span>
            {:else if before(i)}
                <span class="text space-before">{node(i)!.text.trimStart()}</span>
            {:else if after(i)}
                <span class="text space-after">{node(i)!.text.trimEnd()}</span>
            {:else}
                <span class="text">{node(i)!.text}</span>
            {/if}
        {:else}
            <BoardClue depth={depth + 1} idx={i} />
        {/if}
    {/each}
{/snippet}

{#if solved}
    {#if depth}
        <span class="solution text">{curr.text}</span>
    {:else}
        <span class="puzzle text">
            {#each parse(curr.text) as line}
                {#if line instanceof URL}
                    <a href={line.href} target="_blank">{line.href}</a>
                {:else}
                    {line}
                {/if}
            {/each}
        </span>
    {/if}
{:else}
    <span class={{'clue': depth, 'puzzle': !depth, 'leaf': !height}} data-id={curr.key} style:--height={height}>
        {#if height === 0}
            <div class="wrapper">{@render children(curr.clues ?? [])}</div>
            <Input {idx} />
        {:else}
            {@render children(curr.clues ?? [])}
        {/if}
    </span>
{/if}

<style>
    .puzzle {
        display: flex;
        max-width: 100vw;
        overflow-x: scroll;
        align-items: center;
        padding: 24px;
        color: #084E74;
        font-size: 1.6rem;
        scroll-behavior: smooth;
        scrollbar-width: none;
        flex: 1;

        & > .text {
            margin-bottom: 6px;
        }
        &.text {
            display: block;
        }
        &.text {
            display: block;
        }
    }

    .clue {
        display: flex;
        border: 1px dashed color(display-p3 0.34375 0.7265625 0.9375);
        background-color: color(display-p3 0.34375 0.7265625 0.9375 / .2);
        padding: 4px;
        border-radius: calc((var(--height) + 1) * 4px);
        text-align: left;
        align-items: start;
        margin: 0 2px;
        align-self: center;

        &:last-child {
            margin-right: 0;
        }

        &:first-child {
            margin-left: 0;
        }
    }

    .clue:not(.solved)[data-id]:not([data-id=""])::before {
        display: flex;
        content: attr(data-id);
        box-sizing: border-box;
        line-height: 16px;
        padding: 2px;
        background-color: #F9FBFE;
        width: max-content;
        justify-content: center;
        margin-top: calc((var(--height)) * 5px);
        margin-right: 4px;
    }

    .leaf {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 8px;

        .wrapper {
            display: flex;
        }

        span {
            grid-row: 2 / 3;
            align-self: center;
        }
    }

    .text {
        white-space: pre;
        line-height: 16px;

        .clue:not(.leaf) > &{
            margin-top: calc((var(--height) + 1) * 5px + 23px);
        }

        &.space-before::before,
        &.space-after::after {
            content: ' ';
            background-color: rgba(255, 255, 255, 0.75);
        }
    }

    .solution {
        text-decoration: underline color(display-p3 0.34375 0.7265625 0.9375) 1px;
        text-underline-offset: 1px;
    }

</style>