interface SaveClue {
    id?: string,
    clues?: SaveClue[],
    solution: string,
}

/**
 * Note that the GameClue structure is cyclical, since a clue's parent by definition has a
 * reference to the clue itself, which references the parent, which etc.
 * This can cause issues in some cases (e.g. $state.snapshot will fail due to too much
 * recursion).
 */
interface GameClue extends SaveClue {
    parent: GameClue?,
    clues: GameClue[],
    solved: boolean,
}

interface Puzzle<Clue> {
    id: string,
    name: string,
    author: string,
    date: string,
    root: Clue,
}

export { SaveClue, GameClue, Puzzle }
