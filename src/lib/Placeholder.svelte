<script lang="ts">  
    let {
        clues = $bindable(),
        position,
    } = $props()
    let text = $state('')

    function insert(clues) {
        console.log(position)
        clues.splice(position, 0, {solution: text, clues: []})
    }
</script>

<div contenteditable class="placeholder"
    bind:textContent={text}
    onblur={() => insert(clues)}
></div>

<style>
    .placeholder {
        border: 1px dashed pink;
        padding: 8px;

        &:empty::before {
            content: ' ';
            background-color: pink;
            white-space: pre;
        }
    }
</style>