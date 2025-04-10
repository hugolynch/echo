export interface Clue {
    id?: string,
    solution: string,
    clues?: Clue[],
    solved?: boolean,
}

export interface Puzzle extends Clue {
    id?: never,
    solved?: never,
    name: string,
    date: string,
}
