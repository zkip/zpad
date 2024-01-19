// reference form https://stackoverflow.com/questions/55541275/typescript-check-for-the-any-type
type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
export type IsAny<T> = IfAny<T, true, never>;
// type A = IsAny<any> // any
// type B = IsAny<number> // never
// type C = IsAny<unknown> // never
// type D = IsAny<never> // never