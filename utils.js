import { PROVINCE_KEYS } from "./constants";

/**
 * Return an object with the given `keys`, all set to the given `initalValue`.
 *
 * @param {string[]} keys
 * @param {any} [initialValue] default: undefined
 */
 export function objectFrom(keys, initialValue) {
    return keys.reduce((object, key) => {
        const value = Array.isArray(initialValue)
            ? [...initialValue] :
            (
                typeof initialValue === 'object'
                    ? {...initialValue}
                    : initialValue
            );
        object[key] = value;
        return object;
    }, {});
}
export function provinceKey(provinceString) {
    return PROVINCE_KEYS[provinceString];
}
