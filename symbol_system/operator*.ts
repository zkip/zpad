// https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols

/**
 * features:
 * - Commutativity	T
 * - Associativity	F
 */
// export type $PLUS<T> = { $plus<X extends T>(v: $PLUS<X>): $PLUS<T> }
// export type $MINUS<T> = { $minus<X extends T>(v: $MINUS<X> & $NEG<X> & $PLUS<X>): $MINUS<T> }
// export type $MUL<T> = { $mul<X extends T>(v: $MUL<X>): $MUL<T> }
// export type $DIV<T> = { $div<X extends T>(v: $DIV<X>): $DIV<T> }

// export type $NEG<T> = { $neg(): $NEG<T> }


// export type $BasicOpr<T> = $PLUS<T> & $MINUS<T> & $MUL<T> & $DIV<T> & $NEG<T>