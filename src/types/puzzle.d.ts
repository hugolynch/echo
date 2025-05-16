interface Puzzle {
    id: string,
    name: string,
    author: string,
    date: string,
    clues: Clue[],
}

interface Clue {
    id?: string,
    text: string,
    clues?: number[],
}

type State = number[]

export { Puzzle, Clue, State }
