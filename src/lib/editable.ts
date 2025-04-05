/**
 * Stops Enter keystrokes from inserting newlines into our inputs.
 */
function preventNewline(e: KeyboardEvent): void {
    if (e.key === "Enter") {
        e.preventDefault()
    }
}

/**
 * Transformations applied when getting the value from the contenteditable.
 *
 * Currently just returns the value as-is.
 */
function get(val: string): string {
    return val
}

/**
 * Transformations applied when setting the value to the contenteditable.
 *
 * We parse the text value assuming it is valid html and extract the text contents from it. Using a <pre> tag allows us
 * to preserve relevant whitespace in the typed content. This handles various cases:
 *  1. pasting styled content (with e.g. <bold> tags) will extract just the text content and remove the HTML tags;
 *  2. when typing then erasing content, this removes the lone <br>, allowing us to use the :empty selector;
 */
function set(val: string): string {
    const el = document.createElement('pre')
    el.innerHTML = val

    return el.textContent ?? ''
}

export { preventNewline, get, set }
