// script.js
document.addEventListener('DOMContentLoaded', () => {
    const puzzleSelect = document.getElementById('puzzle-select'); // Get the dropdown
    const puzzleDisplay = document.getElementById('puzzle-display');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const feedbackDisplay = document.getElementById('feedback');

    let selectedPuzzleData = null; // To store the currently selected puzzle data
    let solvedClues = {}; // Object to store IDs of solved clues

    /**
     * Displays a clue text, processing placeholders recursively to create nested clue elements.
     * Returns an HTML string instead of directly modifying the DOM.
     * Displays solved answers instead of placeholders if clues are solved.
     * @param {string} clueText - The text of the clue, possibly containing placeholders like {{clue_ID}}.
     * @returns {string} - HTML string representing the clue display.
     */
    function displayClue(clueText) {
        let outputHTML = ''; // Initialize an empty HTML string

        // Regular expression to find placeholders like {{clue_1}}
        const placeholderRegex = /\{\{([^}]+)\}\}/g;
        let match;
        let lastIndex = 0; // To keep track of the last processed index

        while ((match = placeholderRegex.exec(clueText)) !== null) {
            const placeholder = match[0]; // e.g., "{{clue_1}}"
            const clueId = match[1];      // e.g., "clue_1"
            const clueData = selectedPuzzleData.clues[clueId];

            if (clueData) {
                // Check if the clue is already solved
                if (solvedClues[clueId]) {
                    // If solved, display the answer directly as text
                    outputHTML += clueData.answer;
                    lastIndex = placeholderRegex.lastIndex;
                } else {
                    // If not solved, display the clue placeholder
                    // Add the text before the placeholder
                    if (match.index > lastIndex) {
                        outputHTML += clueText.substring(lastIndex, match.index);
                    }

                    // Create a span for the clue placeholder and recursively call displayClue for nested clues
                    const clueSpanHTML = `<span class="clue-placeholder" data-clue-id="${clueId}">${displayClue(clueData.clue)}</span>`; // RECURSIVE CALL HERE
                    outputHTML += clueSpanHTML;

                    lastIndex = placeholderRegex.lastIndex;
                }
            } else {
                // If clue ID not found, just display the placeholder as is (or handle error)
                outputHTML += placeholder;
                lastIndex = placeholderRegex.lastIndex;
            }
        }

        // Add any remaining text after the last placeholder
        if (lastIndex < clueText.length) {
            outputHTML += clueText.substring(lastIndex);
        }

        return outputHTML; // Return the generated HTML string
    }

    // Event listener for the submit button
    submitButton.addEventListener('click', () => {
        const userAnswer = answerInput.value;
        let clueSolved = false; // Flag to track if any clue was solved
        let solvedClueId = null; // To store the ID of the solved clue

        // Iterate through all clues to check if the answer matches any unsolved clue
        for (const clueId in selectedPuzzleData.clues) {
            if (!solvedClues[clueId]) { // Check only unsolved clues
                const clue = selectedPuzzleData.clues[clueId];
                if (userAnswer.toLowerCase() === clue.answer.toLowerCase()) {
                    solvedClues[clueId] = true; // Mark the clue as solved
                    clueSolved = true;
                    solvedClueId = clueId; // Store the solved clue ID
                    feedbackDisplay.textContent = "Correct!";
                    setTimeout(() => {
                        feedbackDisplay.textContent = "";
                    }, 1000);
                    break; // Stop checking after solving one clue (for now)
                }
            }
        }

        if (clueSolved) {
            // Update only the solved clue placeholder in the display
            const solvedClueSpan = puzzleDisplay.querySelector(`.clue-placeholder[data-clue-id="${solvedClueId}"]`);
            if (solvedClueSpan) {
                solvedClueSpan.replaceWith(document.createTextNode(selectedPuzzleData.clues[solvedClueId].answer));
            }
        } else {
            feedbackDisplay.textContent = "Incorrect, try again.";
            setTimeout(() => {
                feedbackDisplay.textContent = "";
            }, 1000);
        }
        answerInput.value = ''; // Clear input after submission
    });

    // Function to load and display a selected puzzle
    function loadPuzzle(puzzleData) {
        selectedPuzzleData = puzzleData.puzzleDataNested; // Set the selected puzzle data
        solvedClues = {}; // Reset solved clues for the new puzzle
        puzzleDisplay.innerHTML = displayClue(selectedPuzzleData.clue); // Display the new puzzle
    }

    // Populate the dropdown and add event listener
    puzzles.forEach((puzzle, index) => {
        const option = document.createElement('option');
        option.value = index; // Use index as value
        option.textContent = puzzle.name; // Display puzzle name
        puzzleSelect.appendChild(option);
    });

    puzzleSelect.addEventListener('change', (event) => {
        const selectedIndex = event.target.value; // Get selected index
        loadPuzzle(puzzles[selectedIndex]); // Load the selected puzzle
    });

    // Load the first puzzle by default
    loadPuzzle(puzzles[puzzles.length - 1]); // Load the last puzzle on page load
    puzzleSelect.value = puzzles.length - 1; // Set dropdown to last puzzle

    // Event listener for Enter key on answer input to submit answer
    answerInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submitButton.click(); // Trigger the submit button click event
            event.preventDefault(); // Prevent default form submission behavior if inside a form
        }
    });
});