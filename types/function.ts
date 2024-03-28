import type { UnionToArray } from "./mapped";

export type ArgsType<T> = T extends (...args: infer U) => unknown ? U : never;

export type FillMaxArgs<T extends unknown[]> = MaxFill<UnionToArray<T> extends unknown[][] ? UnionToArray<T> : never>

/** test
    type Input = [[1, 2, 3], [4]]
    type Result = MaxFill<Input> // [unknown, unknown, unknown]
*/
type MaxFill<Ary extends unknown[][], Results extends never[] = [], S = 0, TDepth extends never[] = [], TDepth2 extends never[] = []> =
    TDepth['length'] extends Ary['length'] ? [...Results, never] :
    TDepth2['length'] extends Ary[TDepth['length']]['length'] ?
    MaxFill<Ary, Results, S, [...TDepth, never], []> :
    MaxFill<Ary, TDepth2['length'] extends S ? Results : [...Results, never], S | TDepth2['length'], TDepth, [...TDepth2, never]>