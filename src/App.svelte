<script lang="ts">
  import Board from "./components/Board.svelte";
  import Editor from "./components/Editor.svelte";
  import Keyboard from "svelte-keyboard";

  let editing = JSON.parse(localStorage.getItem('editing') ?? "false")

  function toggle() {
    editing = !editing
    localStorage.setItem('editing', JSON.stringify(editing))
  }

  const keys = [
    { row: -1, value: "1"},
    { row: -1, value: "2"},
    { row: -1, value: "3"},
    { row: -1, value: "4"},
    { row: -1, value: "5"},
    { row: -1, value: "6"},
    { row: -1, value: "7"},
    { row: -1, value: "8"},
    { row: -1, value: "9"},
    { row: -1, value: "0"},
    { row: 0, value: "Q"},
    { row: 0, value: "W"},
    { row: 0, value: "E"},
    { row: 0, value: "R"},
    { row: 0, value: "T"},
    { row: 0, value: "Y"},
    { row: 0, value: "U"},
    { row: 0, value: "I"},
    { row: 0, value: "O"},
    { row: 0, value: "P"},
    { row: 1, value: "A"},
    { row: 1, value: "S"},
    { row: 1, value: "D"},
    { row: 1, value: "F"},
    { row: 1, value: "G"},
    { row: 1, value: "H"},
    { row: 1, value: "J"},
    { row: 1, value: "K"},
    { row: 1, value: "L"},
    { row: 2, value: "*"},
    { row: 2, value: "Z"},
    { row: 2, value: "X"},
    { row: 2, value: "C"},
    { row: 2, value: "V"},
    { row: 2, value: "B"},
    { row: 2, value: "N"},
    { row: 2, value: "M"},
    { row: 2, value: "Backspace"},

  ];
  const onKeydown = (event) => {
    console.log(event.detail);
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

<div id="keyboard-wrapper">
  <Keyboard on:keydown="{onKeydown}" 
    --text-transform="uppercase"
    --height="56px"
    --min-width="1rem"
    --background="white"
    --border-radius="6px"
    --active-background="#F2F3FB"
    --font-size="24px"
    custom="{keys}"
  />
</div>

<style>
  button {
    margin: 0 auto;
    padding: 8px;
  }

  #keyboard-wrapper {
    width: 100%;
    background-color:#E3E5EF;
    padding: 2px;
  }

  :global(.svelte-keyboard button.key) {
    margin: 4px 2px ;
    border-bottom: 2px solid #C9CAD6;
    padding: 2px;
  }
</style>