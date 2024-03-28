
export type FindIndex<Ary extends T[], Item extends T, T = any, Results extends any[] = [], TDepth extends never[] = []> =
    TDepth['length'] extends Ary['length'] ? never :
    Item extends Ary[TDepth['length']] ? TDepth['length'] :
    FindIndex<Ary, Item, T, [...Results, Item], [...TDepth, never]>
