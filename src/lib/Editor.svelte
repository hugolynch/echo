<script lang="ts">
    let inputs: Array<string|object> = $state([""])
    $inspect(inputs)
    function split(e: KeyboardEvent, i: number) {
        if(e.key !== "Enter") {
            return
        }

        const elem = e.target as HTMLInputElement
        const start = elem.selectionStart!
        const end = elem.selectionEnd!
        if(start === end) {
            console.log("no selection")
            return
        }

        const input = inputs[i]
        if (typeof input === "string") {
            inputs.splice(
                i, 1,
                input.slice(0, start),
                {solution: input.slice(start, end)},
                input.slice(end)
            )
            inputs = inputs.filter(s => s)
        } else {
            console.log("splitting an object")
        }
    }
</script>

<h1>Editor</h1>
{#each inputs as val, i}
    {#if typeof val === "string"}
        <input bind:value={inputs[i]} onkeydown={(e) => split(e, i)}>
    {:else}
        [obj]
    {/if}
{/each}
<!-- <button onclick={split}>Split</button> -->

<style>
    h1 {
        padding: 12px;
    }
    input {
        border-radius: 0;
        margin: 1px;
    }
</style>
