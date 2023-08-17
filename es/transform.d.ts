export type TransformRaw = {
    a?: number;
    k?: number;
    x?: number;
    y?: number;
};
export default class Transform {
    a: number | undefined;
    k: number | undefined;
    x: number | undefined;
    y: number | undefined;
    constructor(t: TransformRaw);
    static identity(): Transform;
    toRaw(): TransformRaw;
    toString(): string;
}
