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
        <button class="tab" onclick={() => key('ShiftTab')}><img src="/previous.svg" alt="previous"></button>
        <div class="clue">
            {#if leaf(game.focused.clue)}
                { render(game.focused.clue) }
            {:else}
                &ndash;
            {/if}
        </div>
        <button class="tab" onclick={() => key('Tab')}><img src="/next.svg" alt="next"></button>
    </div>
    <div class="row">
        <button class="" onclick={() => key('reveal')}>REAVEAL LETTER</button>
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
        width: 100%;
        gap: 8px;
        background-color: #E3E5EF;
        padding-bottom: 8px;
    }

    .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 0 2px;

        & .clue {
            flex: 1;
            line-height: 2rem;
            padding: 0;
        }

        &.top {
            background-color: #084E74;
            gap: 4px;
            padding: 4px 4px;

            & button {
                background-color: #084E74;
                color: #FFFFFF;
                border: none;
                border-radius: 0;
                flex-grow: revert;
                padding: 8px;
            }
        }
    }

    button {
        background-color: #FFFFFF;
        border-bottom: 2px solid #C9CAD6;
        height: 48px;
        border-radius: 5px;
        flex-grow: 1;
        padding: 0 8px;
        font-size: 2.4rem;

        &:active {
            background-color: #F2F3FB;
        }
    }

    .clue {
        background-color: #084E74;
        color: white;
        padding: 8px;
    }
</style>