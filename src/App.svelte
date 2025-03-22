<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Editor from "./lib/Editor.svelte";

  let editing = false
</script>

{#if editing}
<Editor />
{:else}
<Board />
{/if}

<button onclick={() => editing = !editing}>
  {#if editing}
  Puzzles →
  {:else}
  Editor →
  {/if}
</button>

<style>
  button {
    margin: 0 auto;
    padding: 8px;
  }
</style>