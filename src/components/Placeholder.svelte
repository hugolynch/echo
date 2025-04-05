<script lang="ts">  
    let {
        clues = $bindable(),
        position,
    } = $props()
    let text = $state('')

    function insert(clues: object[], position: number, text: string) {
        if (text.length > 0) {
            clues.splice(position, 0, {solution: text, clues: []})
        }
    }
</script>

<div contenteditable class="placeholder"
    bind:textContent={text}
    onblur={() => insert(clues, position, text)}
></div>

<style>
    .placeholder {
        line-height: 16px;
        padding: 4px;
        border: 1px dashed #CBE8FD;
        white-space: pre;

        &:empty::before {
            content: ' ';
            background-color: #E9F5FE;
        }
    }
</style>