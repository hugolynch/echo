export interface Clue {
    id?: string,
    solution: string,
    clues?: Clue[],
    solved?: boolean,
}

export interface Puzzle extends Clue {
    // clue parts that shouldn't apply to top-level
    id?: never,
    solved?: never,

    // unique puzzle parts
    name: string,
    author: string,
    date: string,
}
