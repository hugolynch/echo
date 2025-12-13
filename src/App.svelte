<script lang="ts">
  import Board from "./components/Board.svelte"
</script>

<div class="banner">
  <p>New puzzle every weekday!</p>
</div>

<Board />
<style>
.banner {
  width: 100%;
  background-color: #FFDD00;
  padding: 14px;
  text-align: center;

  p {
    font-size: 1.6rem;
    text-transform: uppercase;
  }
}
</style>