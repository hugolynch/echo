<script lang="ts">
    import type { Clue } from '../types/puzzle'
    import { preventNewline, get, set } from '../lib/editable'

    let {
        clues = $bindable() as Clue[],
        position = 0
    } = $props()
    let text = $state('')

    function insert() {
        if (text.length > 0) {
            clues.splice(position, 0, {solution: text, clues: []})
        }
    }
</script>

<div contenteditable tabindex="0" role="textbox" class="placeholder"
    bind:innerHTML={() => get(text), (val) => text = set(val)}
    onkeypress={preventNewline}
    onblur={insert}></div>

<style>
    .placeholder {
        line-height: 16px;
        padding: 4px;
        border: 1px dashed #CBE8FD;
        white-space: pre;

        &:focus {
            outline: 1px transparent;
            border: 1px solid #1596D9;
        }

        &:empty::before {
            content: ' ';
            background-color: #E9F5FE;
        }
    }
</style>