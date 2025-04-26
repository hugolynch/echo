export interface Clue {
    id?: string,
    solution: string,
    clues?: Clue[],
    solved?: boolean,
}

export interface Puzzle {
    id: string,
    name: string,
    author: string,
    date: string,
    root: Clue,
}
