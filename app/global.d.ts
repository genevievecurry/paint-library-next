declare type UnPromisifiedObject<T> = { [k in keyof T]: UnPromisify<T[k]> };
declare type UnPromisify<T> = T extends Promise<infer U> ? U : T;

declare type LightfastRating = import(".prisma/client").LightfastRating;
declare type TransparencyRating = import(".prisma/client").TransparencyRating;
declare type GranulationRating = import(".prisma/client").GranulationRating;
declare type StainingRating = import(".prisma/client").StainingRating;

declare type Rating =
  | LightfastRating
  | TransparencyRating
  | GranulationRating
  | StainingRating;
