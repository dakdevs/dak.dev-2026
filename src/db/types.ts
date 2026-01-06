declare const brand: unique symbol

type Brand<T, TBrand extends string> = T & { [brand]: TBrand }

export type UserId = Brand<string, 'UserId'>
