import { apply, mapSet, mapGet, mapHas, mapDelete, mapClear, freeze, mapSize } from "./internal/originals.ts";
import { isComposite } from "./composite.ts";
import { resolveKey, missing, clearCompMap, deleteKey } from "./internal/key-lookup.ts";
import { EMPTY } from "./internal/utils.ts";

function requireInternalSlot(that: unknown): void {
    apply(mapSize, that, EMPTY);
}

export const { mapPrototypeSet } = {
    mapPrototypeSet<K, V>(this: Map<K, V>, key: K, value: V): globalThis.Map<K, V> {
        requireInternalSlot(this);
        const keyToUse = resolveKey(this, key, /* create */ true);
        apply(mapSet, this, [keyToUse, value]);
        return this;
    }
}

export const { mapPrototypeDelete } = {
    mapPrototypeDelete<K, V>(this: Map<K, V>, key: K): boolean {
        requireInternalSlot(this);
        if (!isComposite(key)) {
            return apply(mapDelete, this, [key]);
        }
        const existingKey = deleteKey(this, key);
        if (!existingKey) {
            return false;
        }
        apply(mapDelete, this, [existingKey]);
        return true;
    }
}

export const { mapPrototypeHas } = {
    mapPrototypeHas<K, V>(this: Map<K, V>, key: K): boolean {
        requireInternalSlot(this);
        const keyToUse = resolveKey(this, key, /* create */ false);
        if (keyToUse === missing) return false;
        return apply(mapHas, this, [keyToUse]);
    }
}

export const { mapPrototypeGet } = {
    mapPrototypeGet<K, V>(this: Map<K, V>, key: K): any {
        requireInternalSlot(this);
        const keyToUse = resolveKey(this, key, /* create */ false);
        if (keyToUse === missing) return undefined;
        return apply(mapGet, this, [keyToUse]);
    }
}

export const { mapPrototypeClear } = {
    mapPrototypeClear(this: Map<any, any>): void {
        apply(mapClear, this, EMPTY);
        clearCompMap(this);
    }
}

export const mapPrototypeMethods = freeze({
    set: mapPrototypeSet,
    delete: mapPrototypeDelete,
    has: mapPrototypeHas,
    get: mapPrototypeGet,
    clear: mapPrototypeClear,
});
