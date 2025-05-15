<script lang="ts">
    let {
        solution = '' as string,
        solved = $bindable() as boolean
    } = $props()
    let focused: number|null = null;
    let inputs: HTMLInputElement[] = $state([]);
    let letters = $state([...solution].filter(c => c !== ' ').map(_ => ''))

    /**
     * Compare a given guess and solution and return whether they match.
     * Make sure to normalize the strings before comparing them.
     */
    function check(guess: string, solution: string): boolean {
        // compare normalized guess + solution
        const normGuess = guess.normalize('NFKD').replace(/[\p{Diacritic}\s]/gu, '').toLowerCase()
        const normSoln = solution.normalize('NFKD').replace(/[\p{Diacritic}\s]/gu, '').toLowerCase()
        return normGuess === normSoln
    }

    /**
     * Handle keydown events on inputs. Specifically:
     *  1. auto-tab when inputing a character;
     *  2. move left when pressing backspace;
     *  3. focus the previous/next input when pressing arrow keys.
     */
     function handleKeyDown(e: KeyboardEvent, i: number): void {
        // if there's a meta key (ctrl/cmd) active, don't override the default behaviour
        // (i.e. allow ctrl+* keybindings); same for tab keys
        if (e.metaKey || e.key === 'Tab') return

        // get input + neighbours
        const input = e.target as HTMLInputElement
        const prev = input.previousElementSibling as HTMLInputElement|null
        const next = input.nextElementSibling as HTMLInputElement|null
        // handle special cases...
        e.preventDefault()
        if (e.key === 'ArrowLeft') {
            prev?.focus()
        } else if (e.key === 'ArrowRight') {
            next?.focus()
        } else if (e.key === 'Backspace') {
            // on backspace, clear current and focus previous input
            letters[i] = ''
            prev?.focus()
        } else if (e.key.length === 1) {
            // when typing a single character, focus next input
            letters[i] = e.key
            next?.focus()
        }

        // check the solution so far
        solved = check(letters.join(''), solution)
    }

    /**
     * Fill the last focused input with the correct letter.
     */
    function reveal(): void {
        // if no previously focused input, start at the beginnning
        if (focused === null) {
            focused = 0
        }

        // reveal the appropriate letter and check if word is solved
        letters[focused] = solution[focused]
        solved = check(letters.join(''), solution)

        // focus the next input, wrapping around
        if (focused === inputs.length - 1) {
            inputs[0]?.focus()
        } else {
            inputs[focused + 1]?.focus()
        }
    }
</script>

<div class="inputWrapper">
    {#each solution as char, i}
        {#if char !== ' '}
            <input inputmode="none" maxlength="1" enterkeyhint="done"
                onkeydown={e => handleKeyDown(e, i)} onblur={() => focused = i}
                bind:value={letters[i]} bind:this={inputs[i]}
                class={{'space': solution[i + 1] === ' '}}
            />
        {/if}
    {/each}
</div>
<div class="buttonWrapper">
    <button onclick={reveal}>Reveal Letter</button>
    <button onclick={() => solved = true}>Reveal Word</button>
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

    .buttonWrapper {
        white-space: nowrap;
    }

    button {
        border: 1px solid #084E74;
        box-shadow: 1px 1px 0 0 #084E74;
        border-radius: 0;
        padding: 4px 6px;
        background-color: white;
        text-transform: uppercase;

        &:hover {
            background-color: #E9F5FE;
        }
    }
</style>