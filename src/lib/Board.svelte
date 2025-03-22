<script>
    import Clue from "./Clue.svelte";

    const puzzle1 = {
  "name": "Sat Mar 22 2025 13:09:47 GMT-0400 (Eastern Daylight Saving Time)",
  "solution": "may the force",
  "clues": [
    {
      "solution": "may",
      "clues": [
        {
          "solution": "awareness",
          "clues": []
        }
      ]
    },
    {
      "solution": " the force",
      "clues": []
    }
  ]
}

    const puzzle2 = {
        name: "March 20, 2025 (jean)",
        clues: [
            {clues: [
                {clues: ["blessing"], solution: "benediction"},
                " - ",
                {clues: ["charged particle"], solution: "ion"},
            ], solution: "Benedict"},
            " ",
            {clues: [
                {clues: ["unlucky number"], solution: "thirteen"},
                " in ",
                {clues: ["city near Mount Vesuvis"], solution: "Pompeii"},
            ], solution: "XIII"},
            " is ",
            {clues: ["choose"], solution: "elect"},
            {clues: [
                {clues: ["person fixing your typos, perhaps"], solution: "editor"},
                ", for short",
            ], solution: "ed"},
            " ",
            {clues: ["soda"], solution: "Pop"},
            {clues: ["___=mc²"], solution: "e"},
            " at the ",
            {clues: [
                {clues: ["Edge of ___"], solution: "seventeen"},
                " in ",
                {clues: ["you probably have twenty"], solution: "digits"}
            ], solution: "17"},
            {clues: ["film studio A___"], solution: "24"},
            " ",
            {clues: ["daddy"], solution: "papa"},
            {clues: ["opposite of a W"], solution: "l"},
            " ",
            {clues: ["best adapted screenplay at the 9th Academy Awards"], solution: "conclave"},
            ".",
        ],
        solution: "(on this day) Benedict XIII is elected Pope at the 1724 papal conclave.",
    };
</script>


<select id="puzzle-select" name="puzzles"></select>

<h1>{puzzle1.name}</h1>
<div class="puzzle">
    <Clue {...puzzle1} depth={0} />
</div>

<div>
    <input type="text" id="answer-input" />
    <button id="submit-button">Check Answer</button>
</div>
<p id="feedback"></p>

<style>
    .puzzle {
        margin: 1rem;
    }

    select {
        margin-bottom: 32px;
    }
</style>
