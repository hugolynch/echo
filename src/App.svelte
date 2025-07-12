<script lang="ts">
  import type { Puzzle, State } from './types/puzzle'
  import Board from "./components/Board.svelte";
  import puzzles from './assets/puzzles.json'

  let puzzle: Puzzle = puzzles[0]
</script>

<Board {puzzle} />
