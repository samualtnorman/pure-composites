import { arrayPrototypeMethods, mapPrototypeMethods, setPrototypeMethods } from "./index.ts"

export class CompositeArray<T> extends Array<T> {}

Object.defineProperties(
	CompositeArray.prototype,
	Object.fromEntries(Reflect.ownKeys(arrayPrototypeMethods).map(key => [
		key,
		{
			configurable: true,
			enumerable: false,
			value: arrayPrototypeMethods[key as keyof typeof arrayPrototypeMethods],
			writable: true
		}
	]))
)

export class CompositeSet<T> extends Set<T> {}

Object.defineProperties(
	CompositeSet.prototype,
	Object.fromEntries(Reflect.ownKeys(setPrototypeMethods).map(key => [
		key,
		{
			configurable: true,
			enumerable: false,
			value: setPrototypeMethods[key as keyof typeof setPrototypeMethods],
			writable: true
		}
	]))
)

export class CompositeMap<K, V> extends Map<K, V> {}

Object.defineProperties(
	CompositeMap.prototype,
	Object.fromEntries(Reflect.ownKeys(mapPrototypeMethods).map(key => [
		key,
		{
			configurable: true,
			enumerable: false,
			value: mapPrototypeMethods[key as keyof typeof mapPrototypeMethods],
			writable: true
		}
	]))
)

export { Composite } from "./index.ts"
