// custom event types
declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        ontype?: (e: CustomEvent) => void;
    }
}