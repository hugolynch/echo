<script lang="ts">
    let {
        solution = '' as string,
        solved = $bindable() as boolean
    } = $props()
    let letters = $state([...solution].filter(c => c !== ' ').map(_ => ''))

    /**
     * Handle keydown events on inputs. Specifically, auto-tab when input a character and move left
     * when pressing backspace. 
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

        // compare normalized guess + solution
        const guess = letters.join('').normalize('NFKD').replace(/[\p{Diacritic}\s]/gu, '').toLowerCase()
        const normalized = solution.normalize('NFKD').replace(/[\p{Diacritic}\s]/gu, '').toLowerCase()
        if (guess === normalized) {
            solved = true
        }
    }
</script>

<div class="inputWrapper">
    {#each solution as char, i}
        {#if char !== ' '}
            <input maxlength="1" enterkeyhint="done"
                onkeydown={e => handleKeyDown(e, i)} bind:value={letters[i]}
                class={{'space': solution[i + 1] === ' '}}
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
</style>