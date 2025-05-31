// custom event types
declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        onkey?: (e: CustomEvent) => void;
    }
}