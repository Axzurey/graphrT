export default class node<T> {
    public neighbours: node<T>[] = [];
    public weight: number = 1;

    /**
     * this is only used in the context of the nodeGraph methods
     */
    public lastNodeTaken: node<T> | undefined = undefined;

    constructor(public value: T) {}
}