<script lang="ts">
    import type { Key } from '../types/actions'
    import { actions } from '../lib/actions'
    import { game, leaf, render } from '../lib/state.svelte'
    import prevIcon from '../assets/prev.svg'
    import nextIcon from '../assets/next.svg'
    import backIcon from '../assets/back.svg'

    let { key }: { key: (key: Key) => void } = $props()
    let letters = [
        '1234567890'.split(''),
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        'zxcvbnm'.split('')
    ];

    function addHapticFeedback() {
        if (typeof navigator.vibrate === 'function') {
            navigator.vibrate(1);
        }
    }

    function handleButtonClick(e: MouseEvent, action: () => void) {
        e.preventDefault();
        addHapticFeedback();
        action();
    }
</script>

<div class="keyboard">
    <div class="row top">
        <button class="tab" onclick={(e) => handleButtonClick(e, () => key({action: actions.PREV}))}><img src={prevIcon} alt="previous"></button>
        <div class="clue">
            {#if leaf(game.focused.clue)}
                { render(game.focused.clue) }
            {:else}
                &ndash;
            {/if}
        </div>
        <button class="tab" onclick={(e) => handleButtonClick(e, () => key({action: actions.NEXT}))}><img src={nextIcon} alt="next"></button>
    </div>
    <div class="row">
        <!-- <button class="action" disabled>?123</button> -->
        <button class="action" disabled>HINT</button>
        <button class="action" onclick={(e) => handleButtonClick(e, () => key({action: actions.REVEAL}))}>REVEAL LETTER</button>
    </div>
    {#each letters as row, i}
        <div class="row">
            {#if i === letters.length - 1}
                <button class="double action" disabled>?123</button>
            {/if}
            {#each row as letter}
                <button
                    class="letter"
                    onclick={(e) => handleButtonClick(e, () => key({action: actions.CHAR, char: letter.toUpperCase()}))}
                    data-key={letter.toUpperCase()}
                >
                {letter.toUpperCase()}
            </button>
            {/each}
            {#if i === letters.length - 1}
                <button class="double letter" onclick={(e) => handleButtonClick(e, () => key({action: actions.BACK}))}>
                    <img class="icon" src={backIcon} alt="backspace">
                </button>
            {/if}
        </div>
    {/each}
</div>

<style>
    .keyboard {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 4px;
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
        padding: 0 4px;

        & .clue {
            flex: 1;
            line-height: 2rem;
            font-size: 1.6rem;
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
        border: none;
        /* border-bottom: 1px solid #C9CAD6; */
        height: 32px;
        border-radius: 8px;
        flex: 1;
        padding: 0 4px;
        font-size: 2.4rem;
        user-select: none;

        &:active:not([disabled]) {
            background-color: #F2F3FB;
        }

        & .icon {
            margin: auto;
            display: flex;
        }

        &.action {
            font-size: 1.8rem;
            font-weight: bold;
        }
    }

    .double {
        padding: 0 20px;
        background-color: #C9CAD6;
    }

    .clue {
        background-color: #084E74;
        color: white;
        padding: 8px;
    }

    button.letter:active::before {
        content: attr(data-key);
        position: absolute;
        left: 50%;
        top: -80px;
        transform: translateX(-50%);
        background: white;
        border-radius: 8px;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10;
        pointer-events: none;
    }
    
    button.letter {
        position: relative;
    }

    @media (pointer: fine) {
        .keyboard {
            display: none;
        }
    }
</style>