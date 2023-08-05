declare type UnPromisifiedObject<T> = { [k in keyof T]: UnPromisify<T[k]> };
declare type UnPromisify<T> = T extends Promise<infer U> ? U : T;
