namespace tableUtils {
    export function reverse<T extends unknown[]>(t: T): T {
        for (let i = 0; i < math.floor(t.size() / 2); i++) {
            let j = t.size() - i - 1;
            let jz = t[j];
            let iz = t[i];
            t[i] = jz;
            t[j] = iz;
        }
        return t
    }
}

export = tableUtils;