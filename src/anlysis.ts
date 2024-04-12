let last: number;

export function record(info: string) {
    const now = performance.now()
    if (last) {
        const diff = now - last;
        console.log(`${info}: `, diff);
    }
    last = now;
}