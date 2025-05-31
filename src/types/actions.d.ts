import { actions } from '../lib/actions'

type Action = typeof actions

interface Key {
    action: Action[keyof Action],
    char?: string,
}

export { Key }