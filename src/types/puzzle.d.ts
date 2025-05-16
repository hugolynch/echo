interface SaveClue {
    id?: string,
    clues?: SaveClue[],
    solution: string,
}

interface GameClue extends SaveClue {
    parent: GameClue?,
    clues?: GameClue[],
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
