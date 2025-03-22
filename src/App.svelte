<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Editor from "./lib/Editor.svelte";

  let editing = true
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
    margin: 32px ;
    padding: 8px;
  }
</style>