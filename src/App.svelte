<script lang="ts">
  import type { Puzzle, State } from './types/puzzle'
  import Board from "./components/Board.svelte";
  import puzzles from './assets/puzzles.json'

  let puzzle: Puzzle = puzzles[0]
</script>

<h1>Echo Chamber</h1>
<Board {puzzle} />

<style>
  h1 {
    margin: 5rem;
    text-align: center;
  }
</style>