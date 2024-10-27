export abstract class GraphqlValue<T> {
    constructor(
        public readonly value: T,
    ) {
    }

    public abstract toGraphql(): string
}
