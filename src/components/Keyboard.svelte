<script lang="ts">
    let { type }: { type: (letter: string) => void } = $props()
    let letters = [
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        'zxcvbnm'.split('')
    ];
</script>

<div class="keyboard">
    <div class="row top">
        <button class="tab" onclick={() => type('ShiftTab')}>&lt;</button>
        <div class="clue">...</div>
        <button class="tab" onclick={() => type('Tab')}>&gt;</button>
    </div>
    {#each letters as row}
        <div class="row">    
            {#each row as letter}
                <button class="letter" onclick={() => type(letter.toUpperCase())}>
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