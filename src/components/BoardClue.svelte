<script lang="ts">
    import { tick } from 'svelte'
    import type { Clue } from '../types/puzzle'
    import BoardClue from './BoardClue.svelte';
    import { preventDefault } from 'svelte/legacy';

    let {
        id = '',
        depth = 0,
        node = $bindable() as Clue
    } = $props();
    let height = $derived(getHeight(node));
    let letters: string[] = $state([...node.solution].map(_ => ''))
    let solved = $derived.by((): boolean => {
        return depth === 0
            // if root, solved when every child clue is solved (excluding text nodes)
            ? (node.clues ?? []).filter(n => n.clues?.length).every(n => n.solved)
            // if not root, just return the node's solved value (default to false if undefined)
            : node.solved ?? false;
    });

    /**
     * Handle keydown events on inputs. Specifically, auto-tab when input a character and move left
     * when pressing backspace. 
     */
    function handleKeyDown(e: KeyboardEvent, i: number): void {
        // events we don't want to intercept/handle ourselves
        //  - anything with meta key (ctrl/cmd)
        //  - tab events (both directions)
        if (e.metaKey || e.key === 'Tab') return

        // get input + neighbours
        const input = e.target as HTMLInputElement
        const prev = input.previousElementSibling as HTMLInputElement|null
        const next = input.nextElementSibling as HTMLInputElement|null
        // handle special cases
        if (e.key === 'Backspace') {
            e.preventDefault()
            letters[i] = ''
            prev?.focus()
        } else if (/^[a-z]$/i.test(e.key)) {
            e.preventDefault()
            letters[i] = e.key
            next?.focus()
        }

        // check if the guess is correct
        if (letters.join('') === node.solution) {
            node.solved = true
        }
    }

    /**
     * Returns the 'height' (i.e. distance from the bottom/furthest leaf) of the current node.
     * If the current node is a leaf (i.e. has no children), return 0.
     * Treats solved nodes as non-existent.
     */
    function getHeight(node: Clue): number {
        // get non-text, non-solved children (i.e. clue nodes)
        const clues = (node.clues ?? []).filter(n => n.clues?.length && !n.solved)
        // default to 0 if the node has no children
        return Math.max(0, ...clues.map(n => getHeight(n) + 1))
    }
</script>

{#snippet children(children: Clue[])}
    {#each children as child, i}
        {#if ! child.clues?.length}
            <span class="text">{child.solution}</span>
        {:else}
            <BoardClue id={child.id} depth={depth + 1} bind:node={node.clues![i]} />
        {/if}
    {/each}
{/snippet}

{#if solved}
    <span class="solution text">{node.solution}</span>   
{:else}
    <span class={{'clue': depth, 'puzzle': !depth, 'leaf': !height}} data-id={id} style:--height={height}>
        {#if height === 0}
            <div class="wrapper">{@render children(node.clues ?? [])}</div>
            <div class="inputWrapper">
                {#each node.solution as _, i}
                    <input onkeydown={e => handleKeyDown(e, i)} maxlength="1" enterkeyhint="done" bind:value={letters[i]} />
                {/each}
            </div>
        {:else}
            {@render children(node.clues ?? [])}
        {/if}
    </span>
{/if}

<style>
    .puzzle {
            display: flex;
            max-width: 100vw;
            overflow-x: scroll;
            align-items: center;
            padding: 24px 24px 72px 24px;
            color: #084E74;
            font-size: 1.6rem;
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
        margin-top: calc((var(--height) + 1) * 5px);
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
            margin-top: calc((var(--height) + 1) * 5px + 28px);
        }
    }

    .solution {
        text-decoration: underline color(display-p3 0.34375 0.7265625 0.9375) 1px;
        text-underline-offset: 1px;
    }

    .inputWrapper {
        border: 1px solid #084E74;
        box-shadow: 1px 1px 0 0 #084E74;
        display: flex;
        gap: 1px;
        background-color: #084E74;

        &:focus-within input {
            background-color: white;
        }

        input {
            width: 24px;
            height: 24px;
            text-align: center;
            border-radius: 0;
            font-family: "IBM Plex Mono", monospace;
            font-weight: 600;
            color: #03304A;
            border: none;
            outline: none;
            display: flex;
            background-color: white;
            caret-color: transparent;
            padding: 0;

            &:focus {
                background-color: #E9F5FE;
            }
        }
    }
</style>