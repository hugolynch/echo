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

    let floatingKey = $state<{ char: string, x: number, y: number } | null>(null);

    function handleLetterClick(e: MouseEvent, letter: string) {
        handleButtonClick(e, () => key({action: actions.CHAR, char: letter.toUpperCase()}));

        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        floatingKey = { char: letter.toUpperCase(), x: rect.left + rect.width / 2, y: rect.top - rect.height * 1 };

        setTimeout(() => {
            floatingKey = null;sadasd
        }, 100);
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
        <button class="action" disabled>?123</button>
        <button class="action" onclick={(e) => handleButtonClick(e, () => key({action: actions.REVEAL}))}>REVEAL LETTER</button>
    </div>
    {#each letters as row, i}
        <div class="row">
            {#each row as letter}
                <button class="letter" onclick={(e) => handleLetterClick(e, letter)}>
                    {letter.toUpperCase()}
                </button>
            {/each}
            {#if i === letters.length - 1}
                <button class="letter" onclick={(e) => handleButtonClick(e, () => key({action: actions.BACK}))}>
                    <img class="icon" src={backIcon} alt="backspace">
                </button>
            {/if}
        </div>
    {/each}
    {#if floatingKey}
    <div class="floating-key" style="left: {floatingKey.x}px; top: {floatingKey.y}px;">
        {floatingKey.char}
    </div>
{/if}
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
        border-bottom: 2px solid #C9CAD6;
        height: 48px;
        border-radius: 8px;
        flex: 1;
        padding: 0 8px;
        font-size: 2.4rem;
        user-select: none;

        &:active:not([disabled]) {
            background-color: #F2F3FB;
            border-bottom: 1px solid #C9CAD6;
            border-top: 1px solid #F2F3FB;
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

    .clue {
        background-color: #084E74;
        color: white;
        padding: 8px;
    }

    .floating-key {
        position: absolute;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.8rem;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.14), 0 2px 2px rgba(0, 0, 0, 0.12);
        z-index: 10;
        pointer-events: none;
    }

    @media (pointer: fine) {
        .keyboard {
            display: none;
        }
    }
</style>