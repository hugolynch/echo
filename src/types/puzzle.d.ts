interface SaveClue {
    id?: string,
    solution: string,
    clues?: Clue[],
}

interface GameClue extends SaveClue {
    parent: GameClue?,
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
