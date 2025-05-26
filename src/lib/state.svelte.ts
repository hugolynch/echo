import type { Puzzle, Clue, State } from '../types/puzzle'

const game: { puzzle: Puzzle, state: State, inputs: Array<HTMLInputElement|undefined> } = $state({
    puzzle: {
        id: "",
        name: "",
        author: "",
        date: "",
        clues: [],
    },
    state: [],
    inputs: [],
})

/*
┌──────────────────────────────────────────────────────────────────────────┐
│ NODE FUNCTIONS                                                           │
├──────────────────────────────────────────────────────────────────────────┤
│ These functions take an node index and return some data about that node. │
└──────────────────────────────────────────────────────────────────────────┘
*/

/**
 * Given a node index, returns that node, or null if there is none at that position.
 */
function node(idx: number): Clue|null {
    return game.puzzle.clues[idx]
}

/**
 * Given a node node index, returns the child clue indices.
 * If there are no children, returns an empty array.
 */
function children(idx: number): number[] {
    return node(idx)?.clues ?? []
}

/**
 * Given a node index, returns the parent index. If there is no parent clue, returns null.
 * Note that if there are multiple parents, this will return the first found index.
 */
function parent(idx: number): number|null {
    let pidx = null
    for (let i = 0; i < game.puzzle.clues.length; i++) {
        if (children(i).includes(idx)) {
            return i
        }
    }
    return pidx
}

/**
 * Given a node index, returns true iff that node is solved, false otherwise.
 * Text nodes are never solved.
 */
function solved(idx: number): boolean {
    return game.state.includes(idx)
}

/**
 * Given a node index, return true iff it is a text node (i.e. does not have any children),
 * false otherwise.
 */
function text(idx: number): boolean {
    return !node(idx)?.clues?.length
}

/**
 * Given a node index, return true iff it is a clue node (i.e. an unsolved non-text node),
 * false otherwise.
 */
function clue(idx: number): boolean {
    return !text(idx) && !solved(idx)
}

/**
 * Given a node index, return true iff it is a leaf node (i.e. a bottom-level clue node).
 * Takes solved children into account.
 */
function leaf(idx: number): boolean {
    const clues = node(idx)?.clues ?? []
    return clues.length === 0
        || clues.every(c => text(c) || solved(c))
}


/*
┌───────────────────────────────────────────────────────────────────────┐
│ TRAVERSAL FUNCTIONS                                                   │
├───────────────────────────────────────────────────────────────────────┤
│ These functions are useful for traversing the puzzle in various ways. │
└───────────────────────────────────────────────────────────────────────┘
*/

/**
 * Given a node index and a start sub-index (position within the children array, not index in puzzle),
 * return the node's right-most child clue, stopping at the given sub-index.
 */
function rmcc(idx: number, stop: number): number|null {
    for (const child of children(idx).slice(0, stop).reverse()) {
        if (clue(child)) return child
    }
    // if we're here it means we didn't find a clue node
    return null
}

/**
 * Given a node index and a start sub-index (position within the children array, not index in puzzle),
 * return the node's left-most child clue, starting at the given sub-index.
 */
function lmcc(idx: number, start: number): number|null {
    for (const child of children(idx).slice(start + 1)) {
        if (clue(child)) return child
    }
    // if we're here it means we didn't find a clue node
    return null
}

/**
 * Given a node index, returns the "previous" available (i.e. leaf) node in the puzzle.
 * When traversing backwards (up the tree), we additional get the previously visited node, which
 * allows us to visit the correct child.
 */
function prev(idx: number, from?: number): number|null {
    // base case: if we find a leaf node, that's the previous valid one, so return it
    if (leaf(idx)) {
        return idx
    }

    // get the node's right-most child clue, stopping at the prev index
    // if no previous index, stop at the end
    const child = rmcc(idx, from ? children(idx).indexOf(from) : children(idx).length)
    if (child !== null) {
        // if we found a child node, keep traversing down that branch
        return prev(child)
    }

    // otherwise, there is no valid child node so we need to move back up the tree
    const p = parent(idx)
    if (p !== null) {
        return prev(p, idx)
    }

    // at this point we've explored the whole tree, so we give up
    // (there is no valid previous node)
    // this can only happen once the whole puzzle is solved
    return null
}

/**
 * Given a node index, returns the "next" available (i.e. leaf) node in the puzzle.
 * When traversing backwards (up the tree), we additional get the previously visited node, which
 * allows us to visit the correct child.
 */
function next(idx: number, from?: number): number|null {
    // base case: if we find a leaf node, that's the next valid one, so return it
    if (leaf(idx)) {
        return idx
    }

    // get the node's left-most child clue, starting at the prev index
    // if no previous index, start at beginning
    const child = lmcc(idx, children(idx).findIndex(child => child === from))
    if (child !== null) {
        // if we found a child node, keep traversing down that branch
        return next(child)
    }

    // otherwise, there is no valid child node so we need to move back up the tree
    const p = parent(idx)
    if (p !== null) {
        return next(p, idx)
    }

    // at this point we've explored the whole tree, so we give up
    // (there is no valid next node)
    // this can only happen once the whole puzzle is solved
    return null
}

/**
 * Given a node index, return its first input element.
 * Returns null if there is no corresponding input.
 */
function input(idx: number|null): HTMLInputElement|null {
    if (idx && game.inputs[idx]) {
        return game.inputs[idx]
    }

    return null
}

export { game, node, parent, prev, next, input }
