export interface Clue {
    solution: string,
    clues?: Clue[],
    solved?: boolean,
}

export interface Puzzle extends Clue {
    name: string,
    date: string,
}
