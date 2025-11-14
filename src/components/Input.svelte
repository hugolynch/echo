<script lang="ts">
    import type { Key } from '../types/actions'
    import { actions } from '../lib/actions'
    import { onMount, onDestroy, tick } from 'svelte'
    import { game, node, parent, prev, next, input } from '../lib/state.svelte'

    let { idx = 0 } = $props()
    let curr = $derived(node(idx)!)
    let inputs: HTMLInputElement[] = $state([])
    let animate = $state(false)

    onMount(() => {game.inputs[idx] = inputs})
    onDestroy(() => { delete game.inputs[idx] })

    /**
     * Compare a given guess and solution and return whether they match.
     * Make sure to normalize the strings before comparing them.
     */
    function check(guess: string, solution: string) {
        // compare normalized guess + solution
        const normGuess = guess.normalize('NFKD').replace(/[\p{Diacritic}\s]/gu, '').toLowerCase()
        const normSoln = solution.normalize('NFKD').replace(/[\p{Diacritic}\s]/gu, '').toLowerCase()
        if (normGuess === normSoln) {
            // mark the clue as solved
            game.state.push(idx)

            // find the next clue node and focus it
            const p = parent(idx)
            if (p !== null) {
                const nidx = next(p, idx) ?? next(0)
                tick().then(() => input(nidx, 0)?.focus())
            }
        }
    }

    /**
     * Handle keydown events on inputs. Mostly just makes sure that we don't catch unwanted inputs
     * (e.g. meta keys like ctrl+q) and handle shift+tab as a special case.
     */
    function handleKeyDown(e: KeyboardEvent, i: number): void {
        // if there's a meta key (ctrl/cmd) active, don't override the default behaviour
        // (i.e. allow ctrl+* keybindings)
        if (e.metaKey) return
        
        // otherwise, prevent default event handling and run custom event handling
        e.preventDefault()
        // figure out the action happening
        const key: Key = {action: actions.NOOP}
        if (e.key === 'Tab') {
            key.action = e.shiftKey ? actions.PREV : actions.NEXT
        } else if (e.key === 'LeftArrow') {
            key.action = actions.LEFT
        } else if (e.key === 'RightArrow') {
            key.action = actions.RIGHT
        } else if (e.key === 'Backspace') {
            key.action = actions.BACK
        } else if (e.key.length === 1) {
            key.action = actions.CHAR
            key.char = e.key
        }
        // handle the action
        handleKey(key, i)
    }

    /**
     * Handle custom input events. Specifically:
     *  1. revealing letters (this is silly and should move);
     *  2. auto-tab when inputing a character;
     *  3. move left when pressing backspace;
     *  4. focus the previous/next input when pressing arrow keys.
     */
    function handleKey(key: Key, i: number): void {
        // get adjacent inputs (if any)
        const prevChar = inputs[game.focused.input - 1] as HTMLInputElement|undefined
        const nextChar = inputs[game.focused.input + 1] as HTMLInputElement|undefined

        // if action is 'reveal'
        if (key.action === actions.REVEAL) {
            inputs[game.focused.input].value = curr.text[game.focused.input]
            // focus next char, wrapping around
            if (nextChar) {
                nextChar.focus()
            } else {
                inputs[0].focus()
            }
        }

        // if action is tab or shift+tab, focus previous/next clue
        if (key.action === actions.PREV || key.action === actions.NEXT) {
            const p = parent(idx)
            if (p !== null) {
                // if shift is pressed, get the previous clue's input
                // otherwise get the next one's
                const tidx = (key.action === actions.PREV)
                    ? prev(p, idx) ?? prev(0)
                    : next(p, idx) ?? next(0)
                input(tidx, 0)?.focus()
            }
        }

        // handle other special cases...
        if (key.action === actions.LEFT) {
            prevChar?.focus()
        } else if (key.action === actions.RIGHT) {
            nextChar?.focus()
        } else if (key.action === actions.BACK) {
            // on backspace, clear current and focus previous input
            inputs[i].value = ''
            ;(prevChar ?? inputs[game.focused.input]).focus()
        } else if (key.action === actions.CHAR && key.char) {
            // when typing a single character, focus next input if exists;
            // otherwise focus back on the current input
            inputs[i].value = key.char
            ;(nextChar ?? inputs[game.focused.input]).focus()
        }

        // check the solution so far
        check(inputs.map(i => i.value).join(''), curr.text)
    }

    /**
     * Focus on the given character at position i of the given clue with index idx. If the new idx
     * is different than the old one (i.e. focusing a different clue's inputWrapper), animate the
     * new clue. 
     */
    function focus(idx: number, i: number) {
        if (game.focused.clue !== idx) {
            // make sure we don't animate the wrong input by waiting one tick first
            tick().then(() => {
                animate = true
                setTimeout(() => animate = false, 300)
                // scroll to the appropriate inputWrapper
                inputs[idx].parentElement?.scrollIntoView({ inline: 'center' })
            })
        }

        game.focused.clue = idx
        game.focused.input = i
        if (matchMedia('(pointer:coarse)').matches) {
            game.keyboardVisible = true
        }
    }
</script>

<div class="inputWrapper" class:animate={animate}>
    {#each curr.text as char, i}
        {#if char !== ' '}
            <input maxlength="1" enterkeyhint="done" inputmode="none"
                onkeydown={e => handleKeyDown(e, i)}
                onfocus={() => { focus(idx, i) }}
                onkey={e => handleKey(e.detail, i)}
                bind:this={inputs[i]}
                class={{'space': curr.text[i + 1] === ' '}}
            />
        {/if}
    {/each}
</div>

<style>
    .inputWrapper {
        border: 1px solid #084E74;
        box-shadow: 1px 1px 0 0 #084E74;
        display: flex;
        background-color: #084E74;

        &:focus-within input {
            background-color: white;
        }

        &.animate {
            animation: bounce .3s ease-out;
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
            text-transform: uppercase;
            font-size: 16px;

            &:not(:last-child) {
                border-right: 1px solid #084E74;
            }

            &.space {
                border-right: 2px solid #084E74;
            }

            &:focus {
                background-color: #E9F5FE;
            }
        }
    }

    @keyframes bounce {
        0% {
            transform: scale(0.90);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
</style>