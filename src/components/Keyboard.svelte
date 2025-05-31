<script lang="ts">
    import { game, leaf, render } from '../lib/state.svelte'

    let { key }: { key: (letter: string) => void } = $props()
    let letters = [
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        'zxcvbnm'.split('')
    ];
</script>

<div class="keyboard">
    <div class="row top">
        <button class="tab" onclick={() => key('ShiftTab')}>&lt;</button>
        <div class="clue">
            {#if leaf(game.focused.clue)}
                { render(game.focused.clue) }
            {:else}
                &ndash;
            {/if}
        </div>
        <button class="tab" onclick={() => key('Tab')}>&gt;</button>
    </div>
    <div class="row">
        <button class="" onclick={() => key('reveal')}>Reveal</button>
    </div>
    {#each letters as row}
        <div class="row">
            {#each row as letter}
                <button class="letter" onclick={() => key(letter.toUpperCase())}>
                    {letter.toUpperCase()}
                </button>
            {/each}
        </div>
    {/each}
</div>

<style>
    .keyboard {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
        width: fit-content;
        margin: 0 auto;
    }

    .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 3px;

        & .clue {
            flex: 1;
        }
    }
</style>