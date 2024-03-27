export type Falsy = false | null | undefined | '' | 0 | -0 | 0n;
export type NonZeroFalsy = false | null | undefined | '';

export type ThenFn<T> = { then: Promise<T>['then'] };
