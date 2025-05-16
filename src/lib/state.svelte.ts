import type { Puzzle, Clue, State } from '../types/puzzle'

const game: { puzzle: Puzzle, state: State } = $state({
    puzzle: {
        id: "",
        name: "",
        author: "",
        date: "",
        clues: [],
    },
    state: [],
})

function getChildren(idx: number): Clue[] {
    const node = game.puzzle.clues[idx]
    return game.puzzle.clues.filter((_, i) => node.clues?.includes(i))
}

export { game, getChildren }