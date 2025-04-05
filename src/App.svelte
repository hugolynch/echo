<script lang="ts">
  import Board from "./components/Board.svelte";
  import Editor from "./components/Editor.svelte";

  let editing = JSON.parse(localStorage.getItem('editing') ?? "false")

  function toggle() {
    editing = !editing
    localStorage.setItem('editing', JSON.stringify(editing))
  }
</script>

{#if editing}
<Editor />
{:else}
<Board />
{/if}

<button onclick={toggle}>
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