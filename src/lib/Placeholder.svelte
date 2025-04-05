<script lang="ts">  
    let {
        clues = $bindable(),
        position,
    } = $props()
    let text = $state('')

    function insert(clues) {
        if (text.length > 0) {
            clues.splice(position, 0, {solution: text, clues: []})
        }
    }
</script>

<div contenteditable class="placeholder"
    bind:textContent={text}
    onblur={() => insert(clues)}
></div>

<style>
    .placeholder {
        border: 1px dashed #CBE8FD;
        line-height: 16px;
        padding: 4px;

        &:empty::before {
            content: ' ';
            background-color: #E9F5FE;
            white-space: pre;
        }
    }
</style>