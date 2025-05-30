<script lang="ts">
    let { type }: { type: (letter: string) => void } = $props()
    const letters = [
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        'zxcvbnm'.split('')
    ]
</script>

<div class="keyboard">
    {#each letters as row}
        <div class="row">    
            {#each row as letter}
                <button class="letter" onclick={() => type(letter.toUpperCase())}>
                    {letter}
                </button>
            {/each}
        </div>
    {/each}
</div>

<style>
</style>