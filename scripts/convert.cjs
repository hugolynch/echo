const fs = require('fs')

function getArgs([_0, _1, fin, fout]) {
    if (!fin) {
        console.error('missing input file path')
        process.exit()
    }
    if (!fout) {
        console.error('missing output file path')
        process.exit()
    }

    return { in: fin, out: fout }
}

function read(fin) {
    try {
        const data = fs.readFileSync(fin, 'utf8')
        return parse(data)
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

function parse(data) {
    // TODO: check that puzzle is correctly formatted
    const parsed = JSON.parse(data)
    // if single puzzle, wrap in an array
    return Array.isArray(parsed) ? parsed : [parsed]
}

function write(fout, puzzle) {
    try {
        fs.writeFileSync(fout, JSON.stringify(puzzle, null, '  '), 'utf8')
    } catch (err) {
        console.error(err)
        process.exit()
    }
}

function convert(old, offset = 0) {    
    const node = {}
    const children = []

    // if there's a key, insert it
    if (old.id) node.key = old.id
    // insert the node's text
    node.text = old.solution
    // process the node's children (and their children... recursively)
    if (old.clues && old.clues.length) {
        node.clues = []
        for (let i = 0; i < old.clues.length; i++) {
            node.clues.push(offset + 1)
            const converted = convert(old.clues[i], offset + 1)
            children.push(...converted)
            offset += converted.length
        }
    }

    // flatten and return
    return [node, ...children]
}


/********
 * MAIN *
 ********/
const args = getArgs(process.argv)
const puzzles = read(args.in)
const converted = []
for (const puzzle of puzzles) {
    converted.push({
        id: puzzle.id,
        name: puzzle.name,
        author: puzzle.author,
        date: puzzle.date,
        clues: convert(puzzle.root)
    })
}
write(args.out, converted)
