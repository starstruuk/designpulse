
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * A registered user of the application.  Users can bookmark articles
 * and resources and optionally select discipline preferences during
 * onboarding.
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Discipline
 * A subject area used to categorize articles (e.g. "ux", "graphic"). 
 */
export type Discipline = $Result.DefaultSelection<Prisma.$DisciplinePayload>
/**
 * Model ArticleDiscipline
 * Join table between articles and disciplines.  An article may have
 * multiple disciplines and each discipline may appear on many articles.
 */
export type ArticleDiscipline = $Result.DefaultSelection<Prisma.$ArticleDisciplinePayload>
/**
 * Model Article
 * The articles aggregated from RSS feeds.  Discipline tags are
 * maintained via a join table.  Each article optionally belongs to a
 * Source record rather than storing a bare string.
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model Source
 * A source/origin for articles (e.g. an RSS feed).  Keeping it
 * normalized allows counting and managing feeds separately from the
 * Article rows.
 */
export type Source = $Result.DefaultSelection<Prisma.$SourcePayload>
/**
 * Model Resource
 * A content resource curated by the team, classified by category and
 * pricing tier.
 */
export type Resource = $Result.DefaultSelection<Prisma.$ResourcePayload>
/**
 * Model Category
 * Enumeration of resource categories (tools, templates, etc.).
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Bookmark
 * The bookmark table is polymorphic: a bookmark belongs to a user and
 * references either an article or a resource.  The combination of
 * user/article/resource is kept unique to prevent duplicate bookmarks.
 */
export type Bookmark = $Result.DefaultSelection<Prisma.$BookmarkPayload>
/**
 * Model UserDiscipline
 * Tracks which disciplines a user has selected as preferences during
 * onboarding or in settings.
 */
export type UserDiscipline = $Result.DefaultSelection<Prisma.$UserDisciplinePayload>
/**
 * Model Event
 * A model for events.
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Pricing: {
  FREE: 'FREE',
  FREEMIUM: 'FREEMIUM',
  PAID: 'PAID'
};

export type Pricing = (typeof Pricing)[keyof typeof Pricing]


export const EventType: {
  CONFERENCE: 'CONFERENCE',
  WORKSHOP: 'WORKSHOP',
  WEBINAR: 'WEBINAR',
  MEETUP: 'MEETUP',
  HACKATHON: 'HACKATHON',
  AWARD: 'AWARD'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const EventStatus: {
  UPCOMING: 'UPCOMING',
  LIVE: 'LIVE',
  ARCHIVED: 'ARCHIVED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]

}

export type Pricing = $Enums.Pricing

export const Pricing: typeof $Enums.Pricing

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type EventStatus = $Enums.EventStatus

export const EventStatus: typeof $Enums.EventStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.discipline`: Exposes CRUD operations for the **Discipline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disciplines
    * const disciplines = await prisma.discipline.findMany()
    * ```
    */
  get discipline(): Prisma.DisciplineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.articleDiscipline`: Exposes CRUD operations for the **ArticleDiscipline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleDisciplines
    * const articleDisciplines = await prisma.articleDiscipline.findMany()
    * ```
    */
  get articleDiscipline(): Prisma.ArticleDisciplineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.source`: Exposes CRUD operations for the **Source** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sources
    * const sources = await prisma.source.findMany()
    * ```
    */
  get source(): Prisma.SourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resource`: Exposes CRUD operations for the **Resource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resources
    * const resources = await prisma.resource.findMany()
    * ```
    */
  get resource(): Prisma.ResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmark`: Exposes CRUD operations for the **Bookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmark.findMany()
    * ```
    */
  get bookmark(): Prisma.BookmarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDiscipline`: Exposes CRUD operations for the **UserDiscipline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDisciplines
    * const userDisciplines = await prisma.userDiscipline.findMany()
    * ```
    */
  get userDiscipline(): Prisma.UserDisciplineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Discipline: 'Discipline',
    ArticleDiscipline: 'ArticleDiscipline',
    Article: 'Article',
    Source: 'Source',
    Resource: 'Resource',
    Category: 'Category',
    Bookmark: 'Bookmark',
    UserDiscipline: 'UserDiscipline',
    Event: 'Event'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "discipline" | "articleDiscipline" | "article" | "source" | "resource" | "category" | "bookmark" | "userDiscipline" | "event"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Discipline: {
        payload: Prisma.$DisciplinePayload<ExtArgs>
        fields: Prisma.DisciplineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisciplineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisciplineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>
          }
          findFirst: {
            args: Prisma.DisciplineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisciplineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>
          }
          findMany: {
            args: Prisma.DisciplineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>[]
          }
          create: {
            args: Prisma.DisciplineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>
          }
          createMany: {
            args: Prisma.DisciplineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisciplineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>[]
          }
          delete: {
            args: Prisma.DisciplineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>
          }
          update: {
            args: Prisma.DisciplineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>
          }
          deleteMany: {
            args: Prisma.DisciplineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisciplineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DisciplineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>[]
          }
          upsert: {
            args: Prisma.DisciplineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinePayload>
          }
          aggregate: {
            args: Prisma.DisciplineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscipline>
          }
          groupBy: {
            args: Prisma.DisciplineGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisciplineGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisciplineCountArgs<ExtArgs>
            result: $Utils.Optional<DisciplineCountAggregateOutputType> | number
          }
        }
      }
      ArticleDiscipline: {
        payload: Prisma.$ArticleDisciplinePayload<ExtArgs>
        fields: Prisma.ArticleDisciplineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleDisciplineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleDisciplineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>
          }
          findFirst: {
            args: Prisma.ArticleDisciplineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleDisciplineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>
          }
          findMany: {
            args: Prisma.ArticleDisciplineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>[]
          }
          create: {
            args: Prisma.ArticleDisciplineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>
          }
          createMany: {
            args: Prisma.ArticleDisciplineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleDisciplineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>[]
          }
          delete: {
            args: Prisma.ArticleDisciplineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>
          }
          update: {
            args: Prisma.ArticleDisciplineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDisciplineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleDisciplineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleDisciplineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>[]
          }
          upsert: {
            args: Prisma.ArticleDisciplineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleDisciplinePayload>
          }
          aggregate: {
            args: Prisma.ArticleDisciplineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleDiscipline>
          }
          groupBy: {
            args: Prisma.ArticleDisciplineGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleDisciplineGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleDisciplineCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleDisciplineCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      Source: {
        payload: Prisma.$SourcePayload<ExtArgs>
        fields: Prisma.SourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findFirst: {
            args: Prisma.SourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findMany: {
            args: Prisma.SourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          create: {
            args: Prisma.SourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          createMany: {
            args: Prisma.SourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          delete: {
            args: Prisma.SourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          update: {
            args: Prisma.SourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          deleteMany: {
            args: Prisma.SourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          upsert: {
            args: Prisma.SourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          aggregate: {
            args: Prisma.SourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSource>
          }
          groupBy: {
            args: Prisma.SourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceCountArgs<ExtArgs>
            result: $Utils.Optional<SourceCountAggregateOutputType> | number
          }
        }
      }
      Resource: {
        payload: Prisma.$ResourcePayload<ExtArgs>
        fields: Prisma.ResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findFirst: {
            args: Prisma.ResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findMany: {
            args: Prisma.ResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          create: {
            args: Prisma.ResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          createMany: {
            args: Prisma.ResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          delete: {
            args: Prisma.ResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          update: {
            args: Prisma.ResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          deleteMany: {
            args: Prisma.ResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          upsert: {
            args: Prisma.ResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          aggregate: {
            args: Prisma.ResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResource>
          }
          groupBy: {
            args: Prisma.ResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Bookmark: {
        payload: Prisma.$BookmarkPayload<ExtArgs>
        fields: Prisma.BookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findFirst: {
            args: Prisma.BookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findMany: {
            args: Prisma.BookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          create: {
            args: Prisma.BookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          createMany: {
            args: Prisma.BookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookmarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          delete: {
            args: Prisma.BookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          update: {
            args: Prisma.BookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          deleteMany: {
            args: Prisma.BookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookmarkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          upsert: {
            args: Prisma.BookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          aggregate: {
            args: Prisma.BookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmark>
          }
          groupBy: {
            args: Prisma.BookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarkCountAggregateOutputType> | number
          }
        }
      }
      UserDiscipline: {
        payload: Prisma.$UserDisciplinePayload<ExtArgs>
        fields: Prisma.UserDisciplineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDisciplineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDisciplineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>
          }
          findFirst: {
            args: Prisma.UserDisciplineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDisciplineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>
          }
          findMany: {
            args: Prisma.UserDisciplineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>[]
          }
          create: {
            args: Prisma.UserDisciplineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>
          }
          createMany: {
            args: Prisma.UserDisciplineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDisciplineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>[]
          }
          delete: {
            args: Prisma.UserDisciplineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>
          }
          update: {
            args: Prisma.UserDisciplineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>
          }
          deleteMany: {
            args: Prisma.UserDisciplineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDisciplineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDisciplineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>[]
          }
          upsert: {
            args: Prisma.UserDisciplineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDisciplinePayload>
          }
          aggregate: {
            args: Prisma.UserDisciplineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDiscipline>
          }
          groupBy: {
            args: Prisma.UserDisciplineGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDisciplineGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDisciplineCountArgs<ExtArgs>
            result: $Utils.Optional<UserDisciplineCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    discipline?: DisciplineOmit
    articleDiscipline?: ArticleDisciplineOmit
    article?: ArticleOmit
    source?: SourceOmit
    resource?: ResourceOmit
    category?: CategoryOmit
    bookmark?: BookmarkOmit
    userDiscipline?: UserDisciplineOmit
    event?: EventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookmarks: number
    preferences: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookmarks?: boolean | UserCountOutputTypeCountBookmarksArgs
    preferences?: boolean | UserCountOutputTypeCountPreferencesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDisciplineWhereInput
  }


  /**
   * Count Type DisciplineCountOutputType
   */

  export type DisciplineCountOutputType = {
    articles: number
    users: number
  }

  export type DisciplineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | DisciplineCountOutputTypeCountArticlesArgs
    users?: boolean | DisciplineCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * DisciplineCountOutputType without action
   */
  export type DisciplineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplineCountOutputType
     */
    select?: DisciplineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DisciplineCountOutputType without action
   */
  export type DisciplineCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleDisciplineWhereInput
  }

  /**
   * DisciplineCountOutputType without action
   */
  export type DisciplineCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDisciplineWhereInput
  }


  /**
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    disciplines: number
    bookmarks: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disciplines?: boolean | ArticleCountOutputTypeCountDisciplinesArgs
    bookmarks?: boolean | ArticleCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountDisciplinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleDisciplineWhereInput
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }


  /**
   * Count Type SourceCountOutputType
   */

  export type SourceCountOutputType = {
    articles: number
  }

  export type SourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | SourceCountOutputTypeCountArticlesArgs
  }

  // Custom InputTypes
  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCountOutputType
     */
    select?: SourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }


  /**
   * Count Type ResourceCountOutputType
   */

  export type ResourceCountOutputType = {
    bookmarks: number
  }

  export type ResourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookmarks?: boolean | ResourceCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCountOutputType
     */
    select?: ResourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    resources: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resources?: boolean | CategoryCountOutputTypeCountResourcesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountResourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookmarks?: boolean | User$bookmarksArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
      preferences: Prisma.$UserDisciplinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookmarks<T extends User$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, User$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preferences<T extends User$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.bookmarks
   */
  export type User$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * User.preferences
   */
  export type User$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    where?: UserDisciplineWhereInput
    orderBy?: UserDisciplineOrderByWithRelationInput | UserDisciplineOrderByWithRelationInput[]
    cursor?: UserDisciplineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDisciplineScalarFieldEnum | UserDisciplineScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Discipline
   */

  export type AggregateDiscipline = {
    _count: DisciplineCountAggregateOutputType | null
    _min: DisciplineMinAggregateOutputType | null
    _max: DisciplineMaxAggregateOutputType | null
  }

  export type DisciplineMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type DisciplineMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type DisciplineCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type DisciplineMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type DisciplineMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type DisciplineCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type DisciplineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Discipline to aggregate.
     */
    where?: DisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplines to fetch.
     */
    orderBy?: DisciplineOrderByWithRelationInput | DisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disciplines
    **/
    _count?: true | DisciplineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisciplineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisciplineMaxAggregateInputType
  }

  export type GetDisciplineAggregateType<T extends DisciplineAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscipline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscipline[P]>
      : GetScalarType<T[P], AggregateDiscipline[P]>
  }




  export type DisciplineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplineWhereInput
    orderBy?: DisciplineOrderByWithAggregationInput | DisciplineOrderByWithAggregationInput[]
    by: DisciplineScalarFieldEnum[] | DisciplineScalarFieldEnum
    having?: DisciplineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisciplineCountAggregateInputType | true
    _min?: DisciplineMinAggregateInputType
    _max?: DisciplineMaxAggregateInputType
  }

  export type DisciplineGroupByOutputType = {
    id: string
    name: string
    slug: string
    _count: DisciplineCountAggregateOutputType | null
    _min: DisciplineMinAggregateOutputType | null
    _max: DisciplineMaxAggregateOutputType | null
  }

  type GetDisciplineGroupByPayload<T extends DisciplineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisciplineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisciplineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisciplineGroupByOutputType[P]>
            : GetScalarType<T[P], DisciplineGroupByOutputType[P]>
        }
      >
    >


  export type DisciplineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    articles?: boolean | Discipline$articlesArgs<ExtArgs>
    users?: boolean | Discipline$usersArgs<ExtArgs>
    _count?: boolean | DisciplineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discipline"]>

  export type DisciplineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["discipline"]>

  export type DisciplineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["discipline"]>

  export type DisciplineSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type DisciplineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["discipline"]>
  export type DisciplineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | Discipline$articlesArgs<ExtArgs>
    users?: boolean | Discipline$usersArgs<ExtArgs>
    _count?: boolean | DisciplineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DisciplineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DisciplineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DisciplinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Discipline"
    objects: {
      articles: Prisma.$ArticleDisciplinePayload<ExtArgs>[]
      users: Prisma.$UserDisciplinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
    }, ExtArgs["result"]["discipline"]>
    composites: {}
  }

  type DisciplineGetPayload<S extends boolean | null | undefined | DisciplineDefaultArgs> = $Result.GetResult<Prisma.$DisciplinePayload, S>

  type DisciplineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DisciplineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DisciplineCountAggregateInputType | true
    }

  export interface DisciplineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Discipline'], meta: { name: 'Discipline' } }
    /**
     * Find zero or one Discipline that matches the filter.
     * @param {DisciplineFindUniqueArgs} args - Arguments to find a Discipline
     * @example
     * // Get one Discipline
     * const discipline = await prisma.discipline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisciplineFindUniqueArgs>(args: SelectSubset<T, DisciplineFindUniqueArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Discipline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DisciplineFindUniqueOrThrowArgs} args - Arguments to find a Discipline
     * @example
     * // Get one Discipline
     * const discipline = await prisma.discipline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisciplineFindUniqueOrThrowArgs>(args: SelectSubset<T, DisciplineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Discipline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineFindFirstArgs} args - Arguments to find a Discipline
     * @example
     * // Get one Discipline
     * const discipline = await prisma.discipline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisciplineFindFirstArgs>(args?: SelectSubset<T, DisciplineFindFirstArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Discipline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineFindFirstOrThrowArgs} args - Arguments to find a Discipline
     * @example
     * // Get one Discipline
     * const discipline = await prisma.discipline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisciplineFindFirstOrThrowArgs>(args?: SelectSubset<T, DisciplineFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Disciplines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disciplines
     * const disciplines = await prisma.discipline.findMany()
     * 
     * // Get first 10 Disciplines
     * const disciplines = await prisma.discipline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disciplineWithIdOnly = await prisma.discipline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisciplineFindManyArgs>(args?: SelectSubset<T, DisciplineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Discipline.
     * @param {DisciplineCreateArgs} args - Arguments to create a Discipline.
     * @example
     * // Create one Discipline
     * const Discipline = await prisma.discipline.create({
     *   data: {
     *     // ... data to create a Discipline
     *   }
     * })
     * 
     */
    create<T extends DisciplineCreateArgs>(args: SelectSubset<T, DisciplineCreateArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Disciplines.
     * @param {DisciplineCreateManyArgs} args - Arguments to create many Disciplines.
     * @example
     * // Create many Disciplines
     * const discipline = await prisma.discipline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisciplineCreateManyArgs>(args?: SelectSubset<T, DisciplineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disciplines and returns the data saved in the database.
     * @param {DisciplineCreateManyAndReturnArgs} args - Arguments to create many Disciplines.
     * @example
     * // Create many Disciplines
     * const discipline = await prisma.discipline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disciplines and only return the `id`
     * const disciplineWithIdOnly = await prisma.discipline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisciplineCreateManyAndReturnArgs>(args?: SelectSubset<T, DisciplineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Discipline.
     * @param {DisciplineDeleteArgs} args - Arguments to delete one Discipline.
     * @example
     * // Delete one Discipline
     * const Discipline = await prisma.discipline.delete({
     *   where: {
     *     // ... filter to delete one Discipline
     *   }
     * })
     * 
     */
    delete<T extends DisciplineDeleteArgs>(args: SelectSubset<T, DisciplineDeleteArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Discipline.
     * @param {DisciplineUpdateArgs} args - Arguments to update one Discipline.
     * @example
     * // Update one Discipline
     * const discipline = await prisma.discipline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisciplineUpdateArgs>(args: SelectSubset<T, DisciplineUpdateArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Disciplines.
     * @param {DisciplineDeleteManyArgs} args - Arguments to filter Disciplines to delete.
     * @example
     * // Delete a few Disciplines
     * const { count } = await prisma.discipline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisciplineDeleteManyArgs>(args?: SelectSubset<T, DisciplineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disciplines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disciplines
     * const discipline = await prisma.discipline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisciplineUpdateManyArgs>(args: SelectSubset<T, DisciplineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disciplines and returns the data updated in the database.
     * @param {DisciplineUpdateManyAndReturnArgs} args - Arguments to update many Disciplines.
     * @example
     * // Update many Disciplines
     * const discipline = await prisma.discipline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Disciplines and only return the `id`
     * const disciplineWithIdOnly = await prisma.discipline.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DisciplineUpdateManyAndReturnArgs>(args: SelectSubset<T, DisciplineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Discipline.
     * @param {DisciplineUpsertArgs} args - Arguments to update or create a Discipline.
     * @example
     * // Update or create a Discipline
     * const discipline = await prisma.discipline.upsert({
     *   create: {
     *     // ... data to create a Discipline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Discipline we want to update
     *   }
     * })
     */
    upsert<T extends DisciplineUpsertArgs>(args: SelectSubset<T, DisciplineUpsertArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Disciplines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineCountArgs} args - Arguments to filter Disciplines to count.
     * @example
     * // Count the number of Disciplines
     * const count = await prisma.discipline.count({
     *   where: {
     *     // ... the filter for the Disciplines we want to count
     *   }
     * })
    **/
    count<T extends DisciplineCountArgs>(
      args?: Subset<T, DisciplineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisciplineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Discipline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisciplineAggregateArgs>(args: Subset<T, DisciplineAggregateArgs>): Prisma.PrismaPromise<GetDisciplineAggregateType<T>>

    /**
     * Group by Discipline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisciplineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisciplineGroupByArgs['orderBy'] }
        : { orderBy?: DisciplineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisciplineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Discipline model
   */
  readonly fields: DisciplineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Discipline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisciplineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    articles<T extends Discipline$articlesArgs<ExtArgs> = {}>(args?: Subset<T, Discipline$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Discipline$usersArgs<ExtArgs> = {}>(args?: Subset<T, Discipline$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Discipline model
   */
  interface DisciplineFieldRefs {
    readonly id: FieldRef<"Discipline", 'String'>
    readonly name: FieldRef<"Discipline", 'String'>
    readonly slug: FieldRef<"Discipline", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Discipline findUnique
   */
  export type DisciplineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * Filter, which Discipline to fetch.
     */
    where: DisciplineWhereUniqueInput
  }

  /**
   * Discipline findUniqueOrThrow
   */
  export type DisciplineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * Filter, which Discipline to fetch.
     */
    where: DisciplineWhereUniqueInput
  }

  /**
   * Discipline findFirst
   */
  export type DisciplineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * Filter, which Discipline to fetch.
     */
    where?: DisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplines to fetch.
     */
    orderBy?: DisciplineOrderByWithRelationInput | DisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disciplines.
     */
    cursor?: DisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disciplines.
     */
    distinct?: DisciplineScalarFieldEnum | DisciplineScalarFieldEnum[]
  }

  /**
   * Discipline findFirstOrThrow
   */
  export type DisciplineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * Filter, which Discipline to fetch.
     */
    where?: DisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplines to fetch.
     */
    orderBy?: DisciplineOrderByWithRelationInput | DisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disciplines.
     */
    cursor?: DisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disciplines.
     */
    distinct?: DisciplineScalarFieldEnum | DisciplineScalarFieldEnum[]
  }

  /**
   * Discipline findMany
   */
  export type DisciplineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * Filter, which Disciplines to fetch.
     */
    where?: DisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplines to fetch.
     */
    orderBy?: DisciplineOrderByWithRelationInput | DisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disciplines.
     */
    cursor?: DisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplines.
     */
    skip?: number
    distinct?: DisciplineScalarFieldEnum | DisciplineScalarFieldEnum[]
  }

  /**
   * Discipline create
   */
  export type DisciplineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * The data needed to create a Discipline.
     */
    data: XOR<DisciplineCreateInput, DisciplineUncheckedCreateInput>
  }

  /**
   * Discipline createMany
   */
  export type DisciplineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disciplines.
     */
    data: DisciplineCreateManyInput | DisciplineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Discipline createManyAndReturn
   */
  export type DisciplineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * The data used to create many Disciplines.
     */
    data: DisciplineCreateManyInput | DisciplineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Discipline update
   */
  export type DisciplineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * The data needed to update a Discipline.
     */
    data: XOR<DisciplineUpdateInput, DisciplineUncheckedUpdateInput>
    /**
     * Choose, which Discipline to update.
     */
    where: DisciplineWhereUniqueInput
  }

  /**
   * Discipline updateMany
   */
  export type DisciplineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disciplines.
     */
    data: XOR<DisciplineUpdateManyMutationInput, DisciplineUncheckedUpdateManyInput>
    /**
     * Filter which Disciplines to update
     */
    where?: DisciplineWhereInput
    /**
     * Limit how many Disciplines to update.
     */
    limit?: number
  }

  /**
   * Discipline updateManyAndReturn
   */
  export type DisciplineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * The data used to update Disciplines.
     */
    data: XOR<DisciplineUpdateManyMutationInput, DisciplineUncheckedUpdateManyInput>
    /**
     * Filter which Disciplines to update
     */
    where?: DisciplineWhereInput
    /**
     * Limit how many Disciplines to update.
     */
    limit?: number
  }

  /**
   * Discipline upsert
   */
  export type DisciplineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * The filter to search for the Discipline to update in case it exists.
     */
    where: DisciplineWhereUniqueInput
    /**
     * In case the Discipline found by the `where` argument doesn't exist, create a new Discipline with this data.
     */
    create: XOR<DisciplineCreateInput, DisciplineUncheckedCreateInput>
    /**
     * In case the Discipline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisciplineUpdateInput, DisciplineUncheckedUpdateInput>
  }

  /**
   * Discipline delete
   */
  export type DisciplineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
    /**
     * Filter which Discipline to delete.
     */
    where: DisciplineWhereUniqueInput
  }

  /**
   * Discipline deleteMany
   */
  export type DisciplineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disciplines to delete
     */
    where?: DisciplineWhereInput
    /**
     * Limit how many Disciplines to delete.
     */
    limit?: number
  }

  /**
   * Discipline.articles
   */
  export type Discipline$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    where?: ArticleDisciplineWhereInput
    orderBy?: ArticleDisciplineOrderByWithRelationInput | ArticleDisciplineOrderByWithRelationInput[]
    cursor?: ArticleDisciplineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleDisciplineScalarFieldEnum | ArticleDisciplineScalarFieldEnum[]
  }

  /**
   * Discipline.users
   */
  export type Discipline$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    where?: UserDisciplineWhereInput
    orderBy?: UserDisciplineOrderByWithRelationInput | UserDisciplineOrderByWithRelationInput[]
    cursor?: UserDisciplineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDisciplineScalarFieldEnum | UserDisciplineScalarFieldEnum[]
  }

  /**
   * Discipline without action
   */
  export type DisciplineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discipline
     */
    select?: DisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Discipline
     */
    omit?: DisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplineInclude<ExtArgs> | null
  }


  /**
   * Model ArticleDiscipline
   */

  export type AggregateArticleDiscipline = {
    _count: ArticleDisciplineCountAggregateOutputType | null
    _min: ArticleDisciplineMinAggregateOutputType | null
    _max: ArticleDisciplineMaxAggregateOutputType | null
  }

  export type ArticleDisciplineMinAggregateOutputType = {
    id: string | null
    articleId: string | null
    disciplineId: string | null
  }

  export type ArticleDisciplineMaxAggregateOutputType = {
    id: string | null
    articleId: string | null
    disciplineId: string | null
  }

  export type ArticleDisciplineCountAggregateOutputType = {
    id: number
    articleId: number
    disciplineId: number
    _all: number
  }


  export type ArticleDisciplineMinAggregateInputType = {
    id?: true
    articleId?: true
    disciplineId?: true
  }

  export type ArticleDisciplineMaxAggregateInputType = {
    id?: true
    articleId?: true
    disciplineId?: true
  }

  export type ArticleDisciplineCountAggregateInputType = {
    id?: true
    articleId?: true
    disciplineId?: true
    _all?: true
  }

  export type ArticleDisciplineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleDiscipline to aggregate.
     */
    where?: ArticleDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleDisciplines to fetch.
     */
    orderBy?: ArticleDisciplineOrderByWithRelationInput | ArticleDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleDisciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleDisciplines
    **/
    _count?: true | ArticleDisciplineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleDisciplineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleDisciplineMaxAggregateInputType
  }

  export type GetArticleDisciplineAggregateType<T extends ArticleDisciplineAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleDiscipline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleDiscipline[P]>
      : GetScalarType<T[P], AggregateArticleDiscipline[P]>
  }




  export type ArticleDisciplineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleDisciplineWhereInput
    orderBy?: ArticleDisciplineOrderByWithAggregationInput | ArticleDisciplineOrderByWithAggregationInput[]
    by: ArticleDisciplineScalarFieldEnum[] | ArticleDisciplineScalarFieldEnum
    having?: ArticleDisciplineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleDisciplineCountAggregateInputType | true
    _min?: ArticleDisciplineMinAggregateInputType
    _max?: ArticleDisciplineMaxAggregateInputType
  }

  export type ArticleDisciplineGroupByOutputType = {
    id: string
    articleId: string
    disciplineId: string
    _count: ArticleDisciplineCountAggregateOutputType | null
    _min: ArticleDisciplineMinAggregateOutputType | null
    _max: ArticleDisciplineMaxAggregateOutputType | null
  }

  type GetArticleDisciplineGroupByPayload<T extends ArticleDisciplineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleDisciplineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleDisciplineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleDisciplineGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleDisciplineGroupByOutputType[P]>
        }
      >
    >


  export type ArticleDisciplineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    disciplineId?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleDiscipline"]>

  export type ArticleDisciplineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    disciplineId?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleDiscipline"]>

  export type ArticleDisciplineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    disciplineId?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleDiscipline"]>

  export type ArticleDisciplineSelectScalar = {
    id?: boolean
    articleId?: boolean
    disciplineId?: boolean
  }

  export type ArticleDisciplineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "articleId" | "disciplineId", ExtArgs["result"]["articleDiscipline"]>
  export type ArticleDisciplineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }
  export type ArticleDisciplineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }
  export type ArticleDisciplineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }

  export type $ArticleDisciplinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleDiscipline"
    objects: {
      article: Prisma.$ArticlePayload<ExtArgs>
      discipline: Prisma.$DisciplinePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      articleId: string
      disciplineId: string
    }, ExtArgs["result"]["articleDiscipline"]>
    composites: {}
  }

  type ArticleDisciplineGetPayload<S extends boolean | null | undefined | ArticleDisciplineDefaultArgs> = $Result.GetResult<Prisma.$ArticleDisciplinePayload, S>

  type ArticleDisciplineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleDisciplineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleDisciplineCountAggregateInputType | true
    }

  export interface ArticleDisciplineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleDiscipline'], meta: { name: 'ArticleDiscipline' } }
    /**
     * Find zero or one ArticleDiscipline that matches the filter.
     * @param {ArticleDisciplineFindUniqueArgs} args - Arguments to find a ArticleDiscipline
     * @example
     * // Get one ArticleDiscipline
     * const articleDiscipline = await prisma.articleDiscipline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleDisciplineFindUniqueArgs>(args: SelectSubset<T, ArticleDisciplineFindUniqueArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleDiscipline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleDisciplineFindUniqueOrThrowArgs} args - Arguments to find a ArticleDiscipline
     * @example
     * // Get one ArticleDiscipline
     * const articleDiscipline = await prisma.articleDiscipline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleDisciplineFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleDisciplineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleDiscipline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineFindFirstArgs} args - Arguments to find a ArticleDiscipline
     * @example
     * // Get one ArticleDiscipline
     * const articleDiscipline = await prisma.articleDiscipline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleDisciplineFindFirstArgs>(args?: SelectSubset<T, ArticleDisciplineFindFirstArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleDiscipline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineFindFirstOrThrowArgs} args - Arguments to find a ArticleDiscipline
     * @example
     * // Get one ArticleDiscipline
     * const articleDiscipline = await prisma.articleDiscipline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleDisciplineFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleDisciplineFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleDisciplines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleDisciplines
     * const articleDisciplines = await prisma.articleDiscipline.findMany()
     * 
     * // Get first 10 ArticleDisciplines
     * const articleDisciplines = await prisma.articleDiscipline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleDisciplineWithIdOnly = await prisma.articleDiscipline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleDisciplineFindManyArgs>(args?: SelectSubset<T, ArticleDisciplineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleDiscipline.
     * @param {ArticleDisciplineCreateArgs} args - Arguments to create a ArticleDiscipline.
     * @example
     * // Create one ArticleDiscipline
     * const ArticleDiscipline = await prisma.articleDiscipline.create({
     *   data: {
     *     // ... data to create a ArticleDiscipline
     *   }
     * })
     * 
     */
    create<T extends ArticleDisciplineCreateArgs>(args: SelectSubset<T, ArticleDisciplineCreateArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleDisciplines.
     * @param {ArticleDisciplineCreateManyArgs} args - Arguments to create many ArticleDisciplines.
     * @example
     * // Create many ArticleDisciplines
     * const articleDiscipline = await prisma.articleDiscipline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleDisciplineCreateManyArgs>(args?: SelectSubset<T, ArticleDisciplineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleDisciplines and returns the data saved in the database.
     * @param {ArticleDisciplineCreateManyAndReturnArgs} args - Arguments to create many ArticleDisciplines.
     * @example
     * // Create many ArticleDisciplines
     * const articleDiscipline = await prisma.articleDiscipline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleDisciplines and only return the `id`
     * const articleDisciplineWithIdOnly = await prisma.articleDiscipline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleDisciplineCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleDisciplineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArticleDiscipline.
     * @param {ArticleDisciplineDeleteArgs} args - Arguments to delete one ArticleDiscipline.
     * @example
     * // Delete one ArticleDiscipline
     * const ArticleDiscipline = await prisma.articleDiscipline.delete({
     *   where: {
     *     // ... filter to delete one ArticleDiscipline
     *   }
     * })
     * 
     */
    delete<T extends ArticleDisciplineDeleteArgs>(args: SelectSubset<T, ArticleDisciplineDeleteArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleDiscipline.
     * @param {ArticleDisciplineUpdateArgs} args - Arguments to update one ArticleDiscipline.
     * @example
     * // Update one ArticleDiscipline
     * const articleDiscipline = await prisma.articleDiscipline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleDisciplineUpdateArgs>(args: SelectSubset<T, ArticleDisciplineUpdateArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleDisciplines.
     * @param {ArticleDisciplineDeleteManyArgs} args - Arguments to filter ArticleDisciplines to delete.
     * @example
     * // Delete a few ArticleDisciplines
     * const { count } = await prisma.articleDiscipline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDisciplineDeleteManyArgs>(args?: SelectSubset<T, ArticleDisciplineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleDisciplines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleDisciplines
     * const articleDiscipline = await prisma.articleDiscipline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleDisciplineUpdateManyArgs>(args: SelectSubset<T, ArticleDisciplineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleDisciplines and returns the data updated in the database.
     * @param {ArticleDisciplineUpdateManyAndReturnArgs} args - Arguments to update many ArticleDisciplines.
     * @example
     * // Update many ArticleDisciplines
     * const articleDiscipline = await prisma.articleDiscipline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArticleDisciplines and only return the `id`
     * const articleDisciplineWithIdOnly = await prisma.articleDiscipline.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleDisciplineUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleDisciplineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArticleDiscipline.
     * @param {ArticleDisciplineUpsertArgs} args - Arguments to update or create a ArticleDiscipline.
     * @example
     * // Update or create a ArticleDiscipline
     * const articleDiscipline = await prisma.articleDiscipline.upsert({
     *   create: {
     *     // ... data to create a ArticleDiscipline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleDiscipline we want to update
     *   }
     * })
     */
    upsert<T extends ArticleDisciplineUpsertArgs>(args: SelectSubset<T, ArticleDisciplineUpsertArgs<ExtArgs>>): Prisma__ArticleDisciplineClient<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleDisciplines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineCountArgs} args - Arguments to filter ArticleDisciplines to count.
     * @example
     * // Count the number of ArticleDisciplines
     * const count = await prisma.articleDiscipline.count({
     *   where: {
     *     // ... the filter for the ArticleDisciplines we want to count
     *   }
     * })
    **/
    count<T extends ArticleDisciplineCountArgs>(
      args?: Subset<T, ArticleDisciplineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleDisciplineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleDiscipline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleDisciplineAggregateArgs>(args: Subset<T, ArticleDisciplineAggregateArgs>): Prisma.PrismaPromise<GetArticleDisciplineAggregateType<T>>

    /**
     * Group by ArticleDiscipline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleDisciplineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleDisciplineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleDisciplineGroupByArgs['orderBy'] }
        : { orderBy?: ArticleDisciplineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleDisciplineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleDisciplineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleDiscipline model
   */
  readonly fields: ArticleDisciplineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleDiscipline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleDisciplineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    discipline<T extends DisciplineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DisciplineDefaultArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArticleDiscipline model
   */
  interface ArticleDisciplineFieldRefs {
    readonly id: FieldRef<"ArticleDiscipline", 'String'>
    readonly articleId: FieldRef<"ArticleDiscipline", 'String'>
    readonly disciplineId: FieldRef<"ArticleDiscipline", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ArticleDiscipline findUnique
   */
  export type ArticleDisciplineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which ArticleDiscipline to fetch.
     */
    where: ArticleDisciplineWhereUniqueInput
  }

  /**
   * ArticleDiscipline findUniqueOrThrow
   */
  export type ArticleDisciplineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which ArticleDiscipline to fetch.
     */
    where: ArticleDisciplineWhereUniqueInput
  }

  /**
   * ArticleDiscipline findFirst
   */
  export type ArticleDisciplineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which ArticleDiscipline to fetch.
     */
    where?: ArticleDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleDisciplines to fetch.
     */
    orderBy?: ArticleDisciplineOrderByWithRelationInput | ArticleDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleDisciplines.
     */
    cursor?: ArticleDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleDisciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleDisciplines.
     */
    distinct?: ArticleDisciplineScalarFieldEnum | ArticleDisciplineScalarFieldEnum[]
  }

  /**
   * ArticleDiscipline findFirstOrThrow
   */
  export type ArticleDisciplineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which ArticleDiscipline to fetch.
     */
    where?: ArticleDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleDisciplines to fetch.
     */
    orderBy?: ArticleDisciplineOrderByWithRelationInput | ArticleDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleDisciplines.
     */
    cursor?: ArticleDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleDisciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleDisciplines.
     */
    distinct?: ArticleDisciplineScalarFieldEnum | ArticleDisciplineScalarFieldEnum[]
  }

  /**
   * ArticleDiscipline findMany
   */
  export type ArticleDisciplineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which ArticleDisciplines to fetch.
     */
    where?: ArticleDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleDisciplines to fetch.
     */
    orderBy?: ArticleDisciplineOrderByWithRelationInput | ArticleDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleDisciplines.
     */
    cursor?: ArticleDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleDisciplines.
     */
    skip?: number
    distinct?: ArticleDisciplineScalarFieldEnum | ArticleDisciplineScalarFieldEnum[]
  }

  /**
   * ArticleDiscipline create
   */
  export type ArticleDisciplineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleDiscipline.
     */
    data: XOR<ArticleDisciplineCreateInput, ArticleDisciplineUncheckedCreateInput>
  }

  /**
   * ArticleDiscipline createMany
   */
  export type ArticleDisciplineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleDisciplines.
     */
    data: ArticleDisciplineCreateManyInput | ArticleDisciplineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleDiscipline createManyAndReturn
   */
  export type ArticleDisciplineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * The data used to create many ArticleDisciplines.
     */
    data: ArticleDisciplineCreateManyInput | ArticleDisciplineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleDiscipline update
   */
  export type ArticleDisciplineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleDiscipline.
     */
    data: XOR<ArticleDisciplineUpdateInput, ArticleDisciplineUncheckedUpdateInput>
    /**
     * Choose, which ArticleDiscipline to update.
     */
    where: ArticleDisciplineWhereUniqueInput
  }

  /**
   * ArticleDiscipline updateMany
   */
  export type ArticleDisciplineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleDisciplines.
     */
    data: XOR<ArticleDisciplineUpdateManyMutationInput, ArticleDisciplineUncheckedUpdateManyInput>
    /**
     * Filter which ArticleDisciplines to update
     */
    where?: ArticleDisciplineWhereInput
    /**
     * Limit how many ArticleDisciplines to update.
     */
    limit?: number
  }

  /**
   * ArticleDiscipline updateManyAndReturn
   */
  export type ArticleDisciplineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * The data used to update ArticleDisciplines.
     */
    data: XOR<ArticleDisciplineUpdateManyMutationInput, ArticleDisciplineUncheckedUpdateManyInput>
    /**
     * Filter which ArticleDisciplines to update
     */
    where?: ArticleDisciplineWhereInput
    /**
     * Limit how many ArticleDisciplines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleDiscipline upsert
   */
  export type ArticleDisciplineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleDiscipline to update in case it exists.
     */
    where: ArticleDisciplineWhereUniqueInput
    /**
     * In case the ArticleDiscipline found by the `where` argument doesn't exist, create a new ArticleDiscipline with this data.
     */
    create: XOR<ArticleDisciplineCreateInput, ArticleDisciplineUncheckedCreateInput>
    /**
     * In case the ArticleDiscipline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleDisciplineUpdateInput, ArticleDisciplineUncheckedUpdateInput>
  }

  /**
   * ArticleDiscipline delete
   */
  export type ArticleDisciplineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    /**
     * Filter which ArticleDiscipline to delete.
     */
    where: ArticleDisciplineWhereUniqueInput
  }

  /**
   * ArticleDiscipline deleteMany
   */
  export type ArticleDisciplineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleDisciplines to delete
     */
    where?: ArticleDisciplineWhereInput
    /**
     * Limit how many ArticleDisciplines to delete.
     */
    limit?: number
  }

  /**
   * ArticleDiscipline without action
   */
  export type ArticleDisciplineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    excerpt: string | null
    publishedAt: Date | null
    sourceId: string | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    excerpt: string | null
    publishedAt: Date | null
    sourceId: string | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    url: number
    excerpt: number
    publishedAt: number
    sourceId: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    excerpt?: true
    publishedAt?: true
    sourceId?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    excerpt?: true
    publishedAt?: true
    sourceId?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    excerpt?: true
    publishedAt?: true
    sourceId?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    url: string
    excerpt: string | null
    publishedAt: Date | null
    sourceId: string | null
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    excerpt?: boolean
    publishedAt?: boolean
    sourceId?: boolean
    source?: boolean | Article$sourceArgs<ExtArgs>
    disciplines?: boolean | Article$disciplinesArgs<ExtArgs>
    bookmarks?: boolean | Article$bookmarksArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    excerpt?: boolean
    publishedAt?: boolean
    sourceId?: boolean
    source?: boolean | Article$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    excerpt?: boolean
    publishedAt?: boolean
    sourceId?: boolean
    source?: boolean | Article$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    url?: boolean
    excerpt?: boolean
    publishedAt?: boolean
    sourceId?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "url" | "excerpt" | "publishedAt" | "sourceId", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | Article$sourceArgs<ExtArgs>
    disciplines?: boolean | Article$disciplinesArgs<ExtArgs>
    bookmarks?: boolean | Article$bookmarksArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | Article$sourceArgs<ExtArgs>
  }
  export type ArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | Article$sourceArgs<ExtArgs>
  }

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      source: Prisma.$SourcePayload<ExtArgs> | null
      disciplines: Prisma.$ArticleDisciplinePayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      url: string
      excerpt: string | null
      publishedAt: Date | null
      sourceId: string | null
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends Article$sourceArgs<ExtArgs> = {}>(args?: Subset<T, Article$sourceArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    disciplines<T extends Article$disciplinesArgs<ExtArgs> = {}>(args?: Subset<T, Article$disciplinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleDisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends Article$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, Article$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly url: FieldRef<"Article", 'String'>
    readonly excerpt: FieldRef<"Article", 'String'>
    readonly publishedAt: FieldRef<"Article", 'DateTime'>
    readonly sourceId: FieldRef<"Article", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article.source
   */
  export type Article$sourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    where?: SourceWhereInput
  }

  /**
   * Article.disciplines
   */
  export type Article$disciplinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleDiscipline
     */
    select?: ArticleDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleDiscipline
     */
    omit?: ArticleDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleDisciplineInclude<ExtArgs> | null
    where?: ArticleDisciplineWhereInput
    orderBy?: ArticleDisciplineOrderByWithRelationInput | ArticleDisciplineOrderByWithRelationInput[]
    cursor?: ArticleDisciplineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleDisciplineScalarFieldEnum | ArticleDisciplineScalarFieldEnum[]
  }

  /**
   * Article.bookmarks
   */
  export type Article$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model Source
   */

  export type AggregateSource = {
    _count: SourceCountAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  export type SourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    createdAt: Date | null
  }

  export type SourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    createdAt: Date | null
  }

  export type SourceCountAggregateOutputType = {
    id: number
    name: number
    url: number
    createdAt: number
    _all: number
  }


  export type SourceMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    createdAt?: true
  }

  export type SourceMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    createdAt?: true
  }

  export type SourceCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    createdAt?: true
    _all?: true
  }

  export type SourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Source to aggregate.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sources
    **/
    _count?: true | SourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceMaxAggregateInputType
  }

  export type GetSourceAggregateType<T extends SourceAggregateArgs> = {
        [P in keyof T & keyof AggregateSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSource[P]>
      : GetScalarType<T[P], AggregateSource[P]>
  }




  export type SourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceWhereInput
    orderBy?: SourceOrderByWithAggregationInput | SourceOrderByWithAggregationInput[]
    by: SourceScalarFieldEnum[] | SourceScalarFieldEnum
    having?: SourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceCountAggregateInputType | true
    _min?: SourceMinAggregateInputType
    _max?: SourceMaxAggregateInputType
  }

  export type SourceGroupByOutputType = {
    id: string
    name: string
    url: string | null
    createdAt: Date
    _count: SourceCountAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  type GetSourceGroupByPayload<T extends SourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceGroupByOutputType[P]>
            : GetScalarType<T[P], SourceGroupByOutputType[P]>
        }
      >
    >


  export type SourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    createdAt?: boolean
    articles?: boolean | Source$articlesArgs<ExtArgs>
    _count?: boolean | SourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["source"]>

  export type SourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    createdAt?: boolean
  }

  export type SourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "createdAt", ExtArgs["result"]["source"]>
  export type SourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | Source$articlesArgs<ExtArgs>
    _count?: boolean | SourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Source"
    objects: {
      articles: Prisma.$ArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string | null
      createdAt: Date
    }, ExtArgs["result"]["source"]>
    composites: {}
  }

  type SourceGetPayload<S extends boolean | null | undefined | SourceDefaultArgs> = $Result.GetResult<Prisma.$SourcePayload, S>

  type SourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SourceCountAggregateInputType | true
    }

  export interface SourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Source'], meta: { name: 'Source' } }
    /**
     * Find zero or one Source that matches the filter.
     * @param {SourceFindUniqueArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceFindUniqueArgs>(args: SelectSubset<T, SourceFindUniqueArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Source that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SourceFindUniqueOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceFindFirstArgs>(args?: SelectSubset<T, SourceFindFirstArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sources
     * const sources = await prisma.source.findMany()
     * 
     * // Get first 10 Sources
     * const sources = await prisma.source.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceWithIdOnly = await prisma.source.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceFindManyArgs>(args?: SelectSubset<T, SourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Source.
     * @param {SourceCreateArgs} args - Arguments to create a Source.
     * @example
     * // Create one Source
     * const Source = await prisma.source.create({
     *   data: {
     *     // ... data to create a Source
     *   }
     * })
     * 
     */
    create<T extends SourceCreateArgs>(args: SelectSubset<T, SourceCreateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sources.
     * @param {SourceCreateManyArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceCreateManyArgs>(args?: SelectSubset<T, SourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sources and returns the data saved in the database.
     * @param {SourceCreateManyAndReturnArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SourceCreateManyAndReturnArgs>(args?: SelectSubset<T, SourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Source.
     * @param {SourceDeleteArgs} args - Arguments to delete one Source.
     * @example
     * // Delete one Source
     * const Source = await prisma.source.delete({
     *   where: {
     *     // ... filter to delete one Source
     *   }
     * })
     * 
     */
    delete<T extends SourceDeleteArgs>(args: SelectSubset<T, SourceDeleteArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Source.
     * @param {SourceUpdateArgs} args - Arguments to update one Source.
     * @example
     * // Update one Source
     * const source = await prisma.source.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceUpdateArgs>(args: SelectSubset<T, SourceUpdateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sources.
     * @param {SourceDeleteManyArgs} args - Arguments to filter Sources to delete.
     * @example
     * // Delete a few Sources
     * const { count } = await prisma.source.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceDeleteManyArgs>(args?: SelectSubset<T, SourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceUpdateManyArgs>(args: SelectSubset<T, SourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources and returns the data updated in the database.
     * @param {SourceUpdateManyAndReturnArgs} args - Arguments to update many Sources.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SourceUpdateManyAndReturnArgs>(args: SelectSubset<T, SourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Source.
     * @param {SourceUpsertArgs} args - Arguments to update or create a Source.
     * @example
     * // Update or create a Source
     * const source = await prisma.source.upsert({
     *   create: {
     *     // ... data to create a Source
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Source we want to update
     *   }
     * })
     */
    upsert<T extends SourceUpsertArgs>(args: SelectSubset<T, SourceUpsertArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCountArgs} args - Arguments to filter Sources to count.
     * @example
     * // Count the number of Sources
     * const count = await prisma.source.count({
     *   where: {
     *     // ... the filter for the Sources we want to count
     *   }
     * })
    **/
    count<T extends SourceCountArgs>(
      args?: Subset<T, SourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SourceAggregateArgs>(args: Subset<T, SourceAggregateArgs>): Prisma.PrismaPromise<GetSourceAggregateType<T>>

    /**
     * Group by Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceGroupByArgs['orderBy'] }
        : { orderBy?: SourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Source model
   */
  readonly fields: SourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Source.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    articles<T extends Source$articlesArgs<ExtArgs> = {}>(args?: Subset<T, Source$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Source model
   */
  interface SourceFieldRefs {
    readonly id: FieldRef<"Source", 'String'>
    readonly name: FieldRef<"Source", 'String'>
    readonly url: FieldRef<"Source", 'String'>
    readonly createdAt: FieldRef<"Source", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Source findUnique
   */
  export type SourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findUniqueOrThrow
   */
  export type SourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findFirst
   */
  export type SourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findFirstOrThrow
   */
  export type SourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findMany
   */
  export type SourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Sources to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source create
   */
  export type SourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Source.
     */
    data: XOR<SourceCreateInput, SourceUncheckedCreateInput>
  }

  /**
   * Source createMany
   */
  export type SourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source createManyAndReturn
   */
  export type SourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source update
   */
  export type SourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Source.
     */
    data: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
    /**
     * Choose, which Source to update.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source updateMany
   */
  export type SourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source updateManyAndReturn
   */
  export type SourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source upsert
   */
  export type SourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Source to update in case it exists.
     */
    where: SourceWhereUniqueInput
    /**
     * In case the Source found by the `where` argument doesn't exist, create a new Source with this data.
     */
    create: XOR<SourceCreateInput, SourceUncheckedCreateInput>
    /**
     * In case the Source was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
  }

  /**
   * Source delete
   */
  export type SourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter which Source to delete.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source deleteMany
   */
  export type SourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sources to delete
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to delete.
     */
    limit?: number
  }

  /**
   * Source.articles
   */
  export type Source$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Source without action
   */
  export type SourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
  }


  /**
   * Model Resource
   */

  export type AggregateResource = {
    _count: ResourceCountAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  export type ResourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    description: string | null
    pricing: $Enums.Pricing | null
    createdAt: Date | null
    logoLetter: string | null
    logoColor: string | null
    categoryId: string | null
  }

  export type ResourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    description: string | null
    pricing: $Enums.Pricing | null
    createdAt: Date | null
    logoLetter: string | null
    logoColor: string | null
    categoryId: string | null
  }

  export type ResourceCountAggregateOutputType = {
    id: number
    name: number
    url: number
    description: number
    pricing: number
    createdAt: number
    logoLetter: number
    logoColor: number
    categoryId: number
    _all: number
  }


  export type ResourceMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    description?: true
    pricing?: true
    createdAt?: true
    logoLetter?: true
    logoColor?: true
    categoryId?: true
  }

  export type ResourceMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    description?: true
    pricing?: true
    createdAt?: true
    logoLetter?: true
    logoColor?: true
    categoryId?: true
  }

  export type ResourceCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    description?: true
    pricing?: true
    createdAt?: true
    logoLetter?: true
    logoColor?: true
    categoryId?: true
    _all?: true
  }

  export type ResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resource to aggregate.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resources
    **/
    _count?: true | ResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceMaxAggregateInputType
  }

  export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResource[P]>
      : GetScalarType<T[P], AggregateResource[P]>
  }




  export type ResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithAggregationInput | ResourceOrderByWithAggregationInput[]
    by: ResourceScalarFieldEnum[] | ResourceScalarFieldEnum
    having?: ResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceCountAggregateInputType | true
    _min?: ResourceMinAggregateInputType
    _max?: ResourceMaxAggregateInputType
  }

  export type ResourceGroupByOutputType = {
    id: string
    name: string
    url: string
    description: string | null
    pricing: $Enums.Pricing
    createdAt: Date
    logoLetter: string | null
    logoColor: string | null
    categoryId: string
    _count: ResourceCountAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceGroupByOutputType[P]>
        }
      >
    >


  export type ResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    pricing?: boolean
    createdAt?: boolean
    logoLetter?: boolean
    logoColor?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    bookmarks?: boolean | Resource$bookmarksArgs<ExtArgs>
    _count?: boolean | ResourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    pricing?: boolean
    createdAt?: boolean
    logoLetter?: boolean
    logoColor?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    pricing?: boolean
    createdAt?: boolean
    logoLetter?: boolean
    logoColor?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    description?: boolean
    pricing?: boolean
    createdAt?: boolean
    logoLetter?: boolean
    logoColor?: boolean
    categoryId?: boolean
  }

  export type ResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "description" | "pricing" | "createdAt" | "logoLetter" | "logoColor" | "categoryId", ExtArgs["result"]["resource"]>
  export type ResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    bookmarks?: boolean | Resource$bookmarksArgs<ExtArgs>
    _count?: boolean | ResourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resource"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      description: string | null
      pricing: $Enums.Pricing
      createdAt: Date
      logoLetter: string | null
      logoColor: string | null
      categoryId: string
    }, ExtArgs["result"]["resource"]>
    composites: {}
  }

  type ResourceGetPayload<S extends boolean | null | undefined | ResourceDefaultArgs> = $Result.GetResult<Prisma.$ResourcePayload, S>

  type ResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceCountAggregateInputType | true
    }

  export interface ResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resource'], meta: { name: 'Resource' } }
    /**
     * Find zero or one Resource that matches the filter.
     * @param {ResourceFindUniqueArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceFindUniqueArgs>(args: SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceFindUniqueOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceFindFirstArgs>(args?: SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resources
     * const resources = await prisma.resource.findMany()
     * 
     * // Get first 10 Resources
     * const resources = await prisma.resource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceWithIdOnly = await prisma.resource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceFindManyArgs>(args?: SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resource.
     * @param {ResourceCreateArgs} args - Arguments to create a Resource.
     * @example
     * // Create one Resource
     * const Resource = await prisma.resource.create({
     *   data: {
     *     // ... data to create a Resource
     *   }
     * })
     * 
     */
    create<T extends ResourceCreateArgs>(args: SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resources.
     * @param {ResourceCreateManyArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceCreateManyArgs>(args?: SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resources and returns the data saved in the database.
     * @param {ResourceCreateManyAndReturnArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resource.
     * @param {ResourceDeleteArgs} args - Arguments to delete one Resource.
     * @example
     * // Delete one Resource
     * const Resource = await prisma.resource.delete({
     *   where: {
     *     // ... filter to delete one Resource
     *   }
     * })
     * 
     */
    delete<T extends ResourceDeleteArgs>(args: SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resource.
     * @param {ResourceUpdateArgs} args - Arguments to update one Resource.
     * @example
     * // Update one Resource
     * const resource = await prisma.resource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceUpdateArgs>(args: SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resources.
     * @param {ResourceDeleteManyArgs} args - Arguments to filter Resources to delete.
     * @example
     * // Delete a few Resources
     * const { count } = await prisma.resource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceDeleteManyArgs>(args?: SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceUpdateManyArgs>(args: SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources and returns the data updated in the database.
     * @param {ResourceUpdateManyAndReturnArgs} args - Arguments to update many Resources.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resource.
     * @param {ResourceUpsertArgs} args - Arguments to update or create a Resource.
     * @example
     * // Update or create a Resource
     * const resource = await prisma.resource.upsert({
     *   create: {
     *     // ... data to create a Resource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resource we want to update
     *   }
     * })
     */
    upsert<T extends ResourceUpsertArgs>(args: SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCountArgs} args - Arguments to filter Resources to count.
     * @example
     * // Count the number of Resources
     * const count = await prisma.resource.count({
     *   where: {
     *     // ... the filter for the Resources we want to count
     *   }
     * })
    **/
    count<T extends ResourceCountArgs>(
      args?: Subset<T, ResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceAggregateArgs>(args: Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>

    /**
     * Group by Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceGroupByArgs['orderBy'] }
        : { orderBy?: ResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resource model
   */
  readonly fields: ResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bookmarks<T extends Resource$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, Resource$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resource model
   */
  interface ResourceFieldRefs {
    readonly id: FieldRef<"Resource", 'String'>
    readonly name: FieldRef<"Resource", 'String'>
    readonly url: FieldRef<"Resource", 'String'>
    readonly description: FieldRef<"Resource", 'String'>
    readonly pricing: FieldRef<"Resource", 'Pricing'>
    readonly createdAt: FieldRef<"Resource", 'DateTime'>
    readonly logoLetter: FieldRef<"Resource", 'String'>
    readonly logoColor: FieldRef<"Resource", 'String'>
    readonly categoryId: FieldRef<"Resource", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Resource findUnique
   */
  export type ResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findUniqueOrThrow
   */
  export type ResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findFirst
   */
  export type ResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findFirstOrThrow
   */
  export type ResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findMany
   */
  export type ResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resources to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource create
   */
  export type ResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Resource.
     */
    data: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
  }

  /**
   * Resource createMany
   */
  export type ResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resource createManyAndReturn
   */
  export type ResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource update
   */
  export type ResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Resource.
     */
    data: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
    /**
     * Choose, which Resource to update.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource updateMany
   */
  export type ResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
  }

  /**
   * Resource updateManyAndReturn
   */
  export type ResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource upsert
   */
  export type ResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Resource to update in case it exists.
     */
    where: ResourceWhereUniqueInput
    /**
     * In case the Resource found by the `where` argument doesn't exist, create a new Resource with this data.
     */
    create: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
    /**
     * In case the Resource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
  }

  /**
   * Resource delete
   */
  export type ResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter which Resource to delete.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource deleteMany
   */
  export type ResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resources to delete
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to delete.
     */
    limit?: number
  }

  /**
   * Resource.bookmarks
   */
  export type Resource$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Resource without action
   */
  export type ResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    icon: string | null
    color: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    icon: string | null
    color: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    icon: number
    color: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    color?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    color?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    color?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    icon: string | null
    color: string | null
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    color?: boolean
    resources?: boolean | Category$resourcesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    color?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    color?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    color?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "icon" | "color", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resources?: boolean | Category$resourcesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      resources: Prisma.$ResourcePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      icon: string | null
      color: string | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resources<T extends Category$resourcesArgs<ExtArgs> = {}>(args?: Subset<T, Category$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly icon: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.resources
   */
  export type Category$resourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    cursor?: ResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Bookmark
   */

  export type AggregateBookmark = {
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  export type BookmarkMinAggregateOutputType = {
    id: string | null
    userId: string | null
    articleId: string | null
    resourceId: string | null
    createdAt: Date | null
  }

  export type BookmarkMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    articleId: string | null
    resourceId: string | null
    createdAt: Date | null
  }

  export type BookmarkCountAggregateOutputType = {
    id: number
    userId: number
    articleId: number
    resourceId: number
    createdAt: number
    _all: number
  }


  export type BookmarkMinAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    resourceId?: true
    createdAt?: true
  }

  export type BookmarkMaxAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    resourceId?: true
    createdAt?: true
  }

  export type BookmarkCountAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    resourceId?: true
    createdAt?: true
    _all?: true
  }

  export type BookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmark to aggregate.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookmarks
    **/
    _count?: true | BookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarkMaxAggregateInputType
  }

  export type GetBookmarkAggregateType<T extends BookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmark[P]>
      : GetScalarType<T[P], AggregateBookmark[P]>
  }




  export type BookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithAggregationInput | BookmarkOrderByWithAggregationInput[]
    by: BookmarkScalarFieldEnum[] | BookmarkScalarFieldEnum
    having?: BookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarkCountAggregateInputType | true
    _min?: BookmarkMinAggregateInputType
    _max?: BookmarkMaxAggregateInputType
  }

  export type BookmarkGroupByOutputType = {
    id: string
    userId: string
    articleId: string | null
    resourceId: string | null
    createdAt: Date
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  type GetBookmarkGroupByPayload<T extends BookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
        }
      >
    >


  export type BookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    resourceId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | Bookmark$articleArgs<ExtArgs>
    resource?: boolean | Bookmark$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    resourceId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | Bookmark$articleArgs<ExtArgs>
    resource?: boolean | Bookmark$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    resourceId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | Bookmark$articleArgs<ExtArgs>
    resource?: boolean | Bookmark$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectScalar = {
    id?: boolean
    userId?: boolean
    articleId?: boolean
    resourceId?: boolean
    createdAt?: boolean
  }

  export type BookmarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "articleId" | "resourceId" | "createdAt", ExtArgs["result"]["bookmark"]>
  export type BookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | Bookmark$articleArgs<ExtArgs>
    resource?: boolean | Bookmark$resourceArgs<ExtArgs>
  }
  export type BookmarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | Bookmark$articleArgs<ExtArgs>
    resource?: boolean | Bookmark$resourceArgs<ExtArgs>
  }
  export type BookmarkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | Bookmark$articleArgs<ExtArgs>
    resource?: boolean | Bookmark$resourceArgs<ExtArgs>
  }

  export type $BookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bookmark"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      article: Prisma.$ArticlePayload<ExtArgs> | null
      resource: Prisma.$ResourcePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      articleId: string | null
      resourceId: string | null
      createdAt: Date
    }, ExtArgs["result"]["bookmark"]>
    composites: {}
  }

  type BookmarkGetPayload<S extends boolean | null | undefined | BookmarkDefaultArgs> = $Result.GetResult<Prisma.$BookmarkPayload, S>

  type BookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookmarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarkCountAggregateInputType | true
    }

  export interface BookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bookmark'], meta: { name: 'Bookmark' } }
    /**
     * Find zero or one Bookmark that matches the filter.
     * @param {BookmarkFindUniqueArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookmarkFindUniqueArgs>(args: SelectSubset<T, BookmarkFindUniqueArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookmarkFindUniqueOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, BookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookmarkFindFirstArgs>(args?: SelectSubset<T, BookmarkFindFirstArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, BookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmark.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookmarkFindManyArgs>(args?: SelectSubset<T, BookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmark.
     * @param {BookmarkCreateArgs} args - Arguments to create a Bookmark.
     * @example
     * // Create one Bookmark
     * const Bookmark = await prisma.bookmark.create({
     *   data: {
     *     // ... data to create a Bookmark
     *   }
     * })
     * 
     */
    create<T extends BookmarkCreateArgs>(args: SelectSubset<T, BookmarkCreateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {BookmarkCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookmarkCreateManyArgs>(args?: SelectSubset<T, BookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookmarks and returns the data saved in the database.
     * @param {BookmarkCreateManyAndReturnArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookmarks and only return the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookmarkCreateManyAndReturnArgs>(args?: SelectSubset<T, BookmarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookmark.
     * @param {BookmarkDeleteArgs} args - Arguments to delete one Bookmark.
     * @example
     * // Delete one Bookmark
     * const Bookmark = await prisma.bookmark.delete({
     *   where: {
     *     // ... filter to delete one Bookmark
     *   }
     * })
     * 
     */
    delete<T extends BookmarkDeleteArgs>(args: SelectSubset<T, BookmarkDeleteArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmark.
     * @param {BookmarkUpdateArgs} args - Arguments to update one Bookmark.
     * @example
     * // Update one Bookmark
     * const bookmark = await prisma.bookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookmarkUpdateArgs>(args: SelectSubset<T, BookmarkUpdateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {BookmarkDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookmarkDeleteManyArgs>(args?: SelectSubset<T, BookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookmarkUpdateManyArgs>(args: SelectSubset<T, BookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks and returns the data updated in the database.
     * @param {BookmarkUpdateManyAndReturnArgs} args - Arguments to update many Bookmarks.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookmarks and only return the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookmarkUpdateManyAndReturnArgs>(args: SelectSubset<T, BookmarkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookmark.
     * @param {BookmarkUpsertArgs} args - Arguments to update or create a Bookmark.
     * @example
     * // Update or create a Bookmark
     * const bookmark = await prisma.bookmark.upsert({
     *   create: {
     *     // ... data to create a Bookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmark we want to update
     *   }
     * })
     */
    upsert<T extends BookmarkUpsertArgs>(args: SelectSubset<T, BookmarkUpsertArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmark.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends BookmarkCountArgs>(
      args?: Subset<T, BookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookmarkAggregateArgs>(args: Subset<T, BookmarkAggregateArgs>): Prisma.PrismaPromise<GetBookmarkAggregateType<T>>

    /**
     * Group by Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookmarkGroupByArgs['orderBy'] }
        : { orderBy?: BookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bookmark model
   */
  readonly fields: BookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    article<T extends Bookmark$articleArgs<ExtArgs> = {}>(args?: Subset<T, Bookmark$articleArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    resource<T extends Bookmark$resourceArgs<ExtArgs> = {}>(args?: Subset<T, Bookmark$resourceArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bookmark model
   */
  interface BookmarkFieldRefs {
    readonly id: FieldRef<"Bookmark", 'String'>
    readonly userId: FieldRef<"Bookmark", 'String'>
    readonly articleId: FieldRef<"Bookmark", 'String'>
    readonly resourceId: FieldRef<"Bookmark", 'String'>
    readonly createdAt: FieldRef<"Bookmark", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bookmark findUnique
   */
  export type BookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findUniqueOrThrow
   */
  export type BookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findFirst
   */
  export type BookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findFirstOrThrow
   */
  export type BookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findMany
   */
  export type BookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmarks to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark create
   */
  export type BookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Bookmark.
     */
    data: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
  }

  /**
   * Bookmark createMany
   */
  export type BookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookmark createManyAndReturn
   */
  export type BookmarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark update
   */
  export type BookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Bookmark.
     */
    data: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
    /**
     * Choose, which Bookmark to update.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark updateMany
   */
  export type BookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
  }

  /**
   * Bookmark updateManyAndReturn
   */
  export type BookmarkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark upsert
   */
  export type BookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Bookmark to update in case it exists.
     */
    where: BookmarkWhereUniqueInput
    /**
     * In case the Bookmark found by the `where` argument doesn't exist, create a new Bookmark with this data.
     */
    create: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
    /**
     * In case the Bookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
  }

  /**
   * Bookmark delete
   */
  export type BookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter which Bookmark to delete.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark deleteMany
   */
  export type BookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmarks to delete
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to delete.
     */
    limit?: number
  }

  /**
   * Bookmark.article
   */
  export type Bookmark$articleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
  }

  /**
   * Bookmark.resource
   */
  export type Bookmark$resourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
  }

  /**
   * Bookmark without action
   */
  export type BookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
  }


  /**
   * Model UserDiscipline
   */

  export type AggregateUserDiscipline = {
    _count: UserDisciplineCountAggregateOutputType | null
    _min: UserDisciplineMinAggregateOutputType | null
    _max: UserDisciplineMaxAggregateOutputType | null
  }

  export type UserDisciplineMinAggregateOutputType = {
    id: string | null
    userId: string | null
    disciplineId: string | null
  }

  export type UserDisciplineMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    disciplineId: string | null
  }

  export type UserDisciplineCountAggregateOutputType = {
    id: number
    userId: number
    disciplineId: number
    _all: number
  }


  export type UserDisciplineMinAggregateInputType = {
    id?: true
    userId?: true
    disciplineId?: true
  }

  export type UserDisciplineMaxAggregateInputType = {
    id?: true
    userId?: true
    disciplineId?: true
  }

  export type UserDisciplineCountAggregateInputType = {
    id?: true
    userId?: true
    disciplineId?: true
    _all?: true
  }

  export type UserDisciplineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDiscipline to aggregate.
     */
    where?: UserDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDisciplines to fetch.
     */
    orderBy?: UserDisciplineOrderByWithRelationInput | UserDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDisciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDisciplines
    **/
    _count?: true | UserDisciplineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDisciplineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDisciplineMaxAggregateInputType
  }

  export type GetUserDisciplineAggregateType<T extends UserDisciplineAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDiscipline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDiscipline[P]>
      : GetScalarType<T[P], AggregateUserDiscipline[P]>
  }




  export type UserDisciplineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDisciplineWhereInput
    orderBy?: UserDisciplineOrderByWithAggregationInput | UserDisciplineOrderByWithAggregationInput[]
    by: UserDisciplineScalarFieldEnum[] | UserDisciplineScalarFieldEnum
    having?: UserDisciplineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDisciplineCountAggregateInputType | true
    _min?: UserDisciplineMinAggregateInputType
    _max?: UserDisciplineMaxAggregateInputType
  }

  export type UserDisciplineGroupByOutputType = {
    id: string
    userId: string
    disciplineId: string
    _count: UserDisciplineCountAggregateOutputType | null
    _min: UserDisciplineMinAggregateOutputType | null
    _max: UserDisciplineMaxAggregateOutputType | null
  }

  type GetUserDisciplineGroupByPayload<T extends UserDisciplineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDisciplineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDisciplineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDisciplineGroupByOutputType[P]>
            : GetScalarType<T[P], UserDisciplineGroupByOutputType[P]>
        }
      >
    >


  export type UserDisciplineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    disciplineId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDiscipline"]>

  export type UserDisciplineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    disciplineId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDiscipline"]>

  export type UserDisciplineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    disciplineId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDiscipline"]>

  export type UserDisciplineSelectScalar = {
    id?: boolean
    userId?: boolean
    disciplineId?: boolean
  }

  export type UserDisciplineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "disciplineId", ExtArgs["result"]["userDiscipline"]>
  export type UserDisciplineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }
  export type UserDisciplineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }
  export type UserDisciplineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    discipline?: boolean | DisciplineDefaultArgs<ExtArgs>
  }

  export type $UserDisciplinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDiscipline"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      discipline: Prisma.$DisciplinePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      disciplineId: string
    }, ExtArgs["result"]["userDiscipline"]>
    composites: {}
  }

  type UserDisciplineGetPayload<S extends boolean | null | undefined | UserDisciplineDefaultArgs> = $Result.GetResult<Prisma.$UserDisciplinePayload, S>

  type UserDisciplineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDisciplineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDisciplineCountAggregateInputType | true
    }

  export interface UserDisciplineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDiscipline'], meta: { name: 'UserDiscipline' } }
    /**
     * Find zero or one UserDiscipline that matches the filter.
     * @param {UserDisciplineFindUniqueArgs} args - Arguments to find a UserDiscipline
     * @example
     * // Get one UserDiscipline
     * const userDiscipline = await prisma.userDiscipline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDisciplineFindUniqueArgs>(args: SelectSubset<T, UserDisciplineFindUniqueArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDiscipline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDisciplineFindUniqueOrThrowArgs} args - Arguments to find a UserDiscipline
     * @example
     * // Get one UserDiscipline
     * const userDiscipline = await prisma.userDiscipline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDisciplineFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDisciplineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDiscipline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineFindFirstArgs} args - Arguments to find a UserDiscipline
     * @example
     * // Get one UserDiscipline
     * const userDiscipline = await prisma.userDiscipline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDisciplineFindFirstArgs>(args?: SelectSubset<T, UserDisciplineFindFirstArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDiscipline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineFindFirstOrThrowArgs} args - Arguments to find a UserDiscipline
     * @example
     * // Get one UserDiscipline
     * const userDiscipline = await prisma.userDiscipline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDisciplineFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDisciplineFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDisciplines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDisciplines
     * const userDisciplines = await prisma.userDiscipline.findMany()
     * 
     * // Get first 10 UserDisciplines
     * const userDisciplines = await prisma.userDiscipline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDisciplineWithIdOnly = await prisma.userDiscipline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDisciplineFindManyArgs>(args?: SelectSubset<T, UserDisciplineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDiscipline.
     * @param {UserDisciplineCreateArgs} args - Arguments to create a UserDiscipline.
     * @example
     * // Create one UserDiscipline
     * const UserDiscipline = await prisma.userDiscipline.create({
     *   data: {
     *     // ... data to create a UserDiscipline
     *   }
     * })
     * 
     */
    create<T extends UserDisciplineCreateArgs>(args: SelectSubset<T, UserDisciplineCreateArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDisciplines.
     * @param {UserDisciplineCreateManyArgs} args - Arguments to create many UserDisciplines.
     * @example
     * // Create many UserDisciplines
     * const userDiscipline = await prisma.userDiscipline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDisciplineCreateManyArgs>(args?: SelectSubset<T, UserDisciplineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDisciplines and returns the data saved in the database.
     * @param {UserDisciplineCreateManyAndReturnArgs} args - Arguments to create many UserDisciplines.
     * @example
     * // Create many UserDisciplines
     * const userDiscipline = await prisma.userDiscipline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDisciplines and only return the `id`
     * const userDisciplineWithIdOnly = await prisma.userDiscipline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDisciplineCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDisciplineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDiscipline.
     * @param {UserDisciplineDeleteArgs} args - Arguments to delete one UserDiscipline.
     * @example
     * // Delete one UserDiscipline
     * const UserDiscipline = await prisma.userDiscipline.delete({
     *   where: {
     *     // ... filter to delete one UserDiscipline
     *   }
     * })
     * 
     */
    delete<T extends UserDisciplineDeleteArgs>(args: SelectSubset<T, UserDisciplineDeleteArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDiscipline.
     * @param {UserDisciplineUpdateArgs} args - Arguments to update one UserDiscipline.
     * @example
     * // Update one UserDiscipline
     * const userDiscipline = await prisma.userDiscipline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDisciplineUpdateArgs>(args: SelectSubset<T, UserDisciplineUpdateArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDisciplines.
     * @param {UserDisciplineDeleteManyArgs} args - Arguments to filter UserDisciplines to delete.
     * @example
     * // Delete a few UserDisciplines
     * const { count } = await prisma.userDiscipline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDisciplineDeleteManyArgs>(args?: SelectSubset<T, UserDisciplineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDisciplines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDisciplines
     * const userDiscipline = await prisma.userDiscipline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDisciplineUpdateManyArgs>(args: SelectSubset<T, UserDisciplineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDisciplines and returns the data updated in the database.
     * @param {UserDisciplineUpdateManyAndReturnArgs} args - Arguments to update many UserDisciplines.
     * @example
     * // Update many UserDisciplines
     * const userDiscipline = await prisma.userDiscipline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDisciplines and only return the `id`
     * const userDisciplineWithIdOnly = await prisma.userDiscipline.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDisciplineUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDisciplineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDiscipline.
     * @param {UserDisciplineUpsertArgs} args - Arguments to update or create a UserDiscipline.
     * @example
     * // Update or create a UserDiscipline
     * const userDiscipline = await prisma.userDiscipline.upsert({
     *   create: {
     *     // ... data to create a UserDiscipline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDiscipline we want to update
     *   }
     * })
     */
    upsert<T extends UserDisciplineUpsertArgs>(args: SelectSubset<T, UserDisciplineUpsertArgs<ExtArgs>>): Prisma__UserDisciplineClient<$Result.GetResult<Prisma.$UserDisciplinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDisciplines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineCountArgs} args - Arguments to filter UserDisciplines to count.
     * @example
     * // Count the number of UserDisciplines
     * const count = await prisma.userDiscipline.count({
     *   where: {
     *     // ... the filter for the UserDisciplines we want to count
     *   }
     * })
    **/
    count<T extends UserDisciplineCountArgs>(
      args?: Subset<T, UserDisciplineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDisciplineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDiscipline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDisciplineAggregateArgs>(args: Subset<T, UserDisciplineAggregateArgs>): Prisma.PrismaPromise<GetUserDisciplineAggregateType<T>>

    /**
     * Group by UserDiscipline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDisciplineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDisciplineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDisciplineGroupByArgs['orderBy'] }
        : { orderBy?: UserDisciplineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDisciplineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDisciplineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDiscipline model
   */
  readonly fields: UserDisciplineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDiscipline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDisciplineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    discipline<T extends DisciplineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DisciplineDefaultArgs<ExtArgs>>): Prisma__DisciplineClient<$Result.GetResult<Prisma.$DisciplinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDiscipline model
   */
  interface UserDisciplineFieldRefs {
    readonly id: FieldRef<"UserDiscipline", 'String'>
    readonly userId: FieldRef<"UserDiscipline", 'String'>
    readonly disciplineId: FieldRef<"UserDiscipline", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserDiscipline findUnique
   */
  export type UserDisciplineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which UserDiscipline to fetch.
     */
    where: UserDisciplineWhereUniqueInput
  }

  /**
   * UserDiscipline findUniqueOrThrow
   */
  export type UserDisciplineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which UserDiscipline to fetch.
     */
    where: UserDisciplineWhereUniqueInput
  }

  /**
   * UserDiscipline findFirst
   */
  export type UserDisciplineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which UserDiscipline to fetch.
     */
    where?: UserDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDisciplines to fetch.
     */
    orderBy?: UserDisciplineOrderByWithRelationInput | UserDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDisciplines.
     */
    cursor?: UserDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDisciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDisciplines.
     */
    distinct?: UserDisciplineScalarFieldEnum | UserDisciplineScalarFieldEnum[]
  }

  /**
   * UserDiscipline findFirstOrThrow
   */
  export type UserDisciplineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which UserDiscipline to fetch.
     */
    where?: UserDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDisciplines to fetch.
     */
    orderBy?: UserDisciplineOrderByWithRelationInput | UserDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDisciplines.
     */
    cursor?: UserDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDisciplines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDisciplines.
     */
    distinct?: UserDisciplineScalarFieldEnum | UserDisciplineScalarFieldEnum[]
  }

  /**
   * UserDiscipline findMany
   */
  export type UserDisciplineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * Filter, which UserDisciplines to fetch.
     */
    where?: UserDisciplineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDisciplines to fetch.
     */
    orderBy?: UserDisciplineOrderByWithRelationInput | UserDisciplineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDisciplines.
     */
    cursor?: UserDisciplineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDisciplines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDisciplines.
     */
    skip?: number
    distinct?: UserDisciplineScalarFieldEnum | UserDisciplineScalarFieldEnum[]
  }

  /**
   * UserDiscipline create
   */
  export type UserDisciplineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDiscipline.
     */
    data: XOR<UserDisciplineCreateInput, UserDisciplineUncheckedCreateInput>
  }

  /**
   * UserDiscipline createMany
   */
  export type UserDisciplineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDisciplines.
     */
    data: UserDisciplineCreateManyInput | UserDisciplineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDiscipline createManyAndReturn
   */
  export type UserDisciplineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * The data used to create many UserDisciplines.
     */
    data: UserDisciplineCreateManyInput | UserDisciplineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDiscipline update
   */
  export type UserDisciplineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDiscipline.
     */
    data: XOR<UserDisciplineUpdateInput, UserDisciplineUncheckedUpdateInput>
    /**
     * Choose, which UserDiscipline to update.
     */
    where: UserDisciplineWhereUniqueInput
  }

  /**
   * UserDiscipline updateMany
   */
  export type UserDisciplineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDisciplines.
     */
    data: XOR<UserDisciplineUpdateManyMutationInput, UserDisciplineUncheckedUpdateManyInput>
    /**
     * Filter which UserDisciplines to update
     */
    where?: UserDisciplineWhereInput
    /**
     * Limit how many UserDisciplines to update.
     */
    limit?: number
  }

  /**
   * UserDiscipline updateManyAndReturn
   */
  export type UserDisciplineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * The data used to update UserDisciplines.
     */
    data: XOR<UserDisciplineUpdateManyMutationInput, UserDisciplineUncheckedUpdateManyInput>
    /**
     * Filter which UserDisciplines to update
     */
    where?: UserDisciplineWhereInput
    /**
     * Limit how many UserDisciplines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDiscipline upsert
   */
  export type UserDisciplineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDiscipline to update in case it exists.
     */
    where: UserDisciplineWhereUniqueInput
    /**
     * In case the UserDiscipline found by the `where` argument doesn't exist, create a new UserDiscipline with this data.
     */
    create: XOR<UserDisciplineCreateInput, UserDisciplineUncheckedCreateInput>
    /**
     * In case the UserDiscipline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDisciplineUpdateInput, UserDisciplineUncheckedUpdateInput>
  }

  /**
   * UserDiscipline delete
   */
  export type UserDisciplineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
    /**
     * Filter which UserDiscipline to delete.
     */
    where: UserDisciplineWhereUniqueInput
  }

  /**
   * UserDiscipline deleteMany
   */
  export type UserDisciplineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDisciplines to delete
     */
    where?: UserDisciplineWhereInput
    /**
     * Limit how many UserDisciplines to delete.
     */
    limit?: number
  }

  /**
   * UserDiscipline without action
   */
  export type UserDisciplineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDiscipline
     */
    select?: UserDisciplineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDiscipline
     */
    omit?: UserDisciplineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDisciplineInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    attendees: number | null
    maxAttendees: number | null
  }

  export type EventSumAggregateOutputType = {
    attendees: number | null
    maxAttendees: number | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: $Enums.EventType | null
    status: $Enums.EventStatus | null
    date: string | null
    time: string | null
    duration: string | null
    image: string | null
    isFree: boolean | null
    price: string | null
    attendees: number | null
    maxAttendees: number | null
    url: string | null
    hostName: string | null
    hostRole: string | null
    hostAvatar: string | null
    createdAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    type: $Enums.EventType | null
    status: $Enums.EventStatus | null
    date: string | null
    time: string | null
    duration: string | null
    image: string | null
    isFree: boolean | null
    price: string | null
    attendees: number | null
    maxAttendees: number | null
    url: string | null
    hostName: string | null
    hostRole: string | null
    hostAvatar: string | null
    createdAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    type: number
    status: number
    date: number
    time: number
    duration: number
    image: number
    isFree: number
    price: number
    attendees: number
    maxAttendees: number
    tags: number
    url: number
    hostName: number
    hostRole: number
    hostAvatar: number
    createdAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    attendees?: true
    maxAttendees?: true
  }

  export type EventSumAggregateInputType = {
    attendees?: true
    maxAttendees?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    status?: true
    date?: true
    time?: true
    duration?: true
    image?: true
    isFree?: true
    price?: true
    attendees?: true
    maxAttendees?: true
    url?: true
    hostName?: true
    hostRole?: true
    hostAvatar?: true
    createdAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    status?: true
    date?: true
    time?: true
    duration?: true
    image?: true
    isFree?: true
    price?: true
    attendees?: true
    maxAttendees?: true
    url?: true
    hostName?: true
    hostRole?: true
    hostAvatar?: true
    createdAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    type?: true
    status?: true
    date?: true
    time?: true
    duration?: true
    image?: true
    isFree?: true
    price?: true
    attendees?: true
    maxAttendees?: true
    tags?: true
    url?: true
    hostName?: true
    hostRole?: true
    hostAvatar?: true
    createdAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    title: string
    description: string
    type: $Enums.EventType
    status: $Enums.EventStatus
    date: string
    time: string
    duration: string
    image: string | null
    isFree: boolean
    price: string | null
    attendees: number
    maxAttendees: number | null
    tags: string[]
    url: string | null
    hostName: string
    hostRole: string
    hostAvatar: string | null
    createdAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    image?: boolean
    isFree?: boolean
    price?: boolean
    attendees?: boolean
    maxAttendees?: boolean
    tags?: boolean
    url?: boolean
    hostName?: boolean
    hostRole?: boolean
    hostAvatar?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    image?: boolean
    isFree?: boolean
    price?: boolean
    attendees?: boolean
    maxAttendees?: boolean
    tags?: boolean
    url?: boolean
    hostName?: boolean
    hostRole?: boolean
    hostAvatar?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    image?: boolean
    isFree?: boolean
    price?: boolean
    attendees?: boolean
    maxAttendees?: boolean
    tags?: boolean
    url?: boolean
    hostName?: boolean
    hostRole?: boolean
    hostAvatar?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    type?: boolean
    status?: boolean
    date?: boolean
    time?: boolean
    duration?: boolean
    image?: boolean
    isFree?: boolean
    price?: boolean
    attendees?: boolean
    maxAttendees?: boolean
    tags?: boolean
    url?: boolean
    hostName?: boolean
    hostRole?: boolean
    hostAvatar?: boolean
    createdAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "type" | "status" | "date" | "time" | "duration" | "image" | "isFree" | "price" | "attendees" | "maxAttendees" | "tags" | "url" | "hostName" | "hostRole" | "hostAvatar" | "createdAt", ExtArgs["result"]["event"]>

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      type: $Enums.EventType
      status: $Enums.EventStatus
      date: string
      time: string
      duration: string
      image: string | null
      isFree: boolean
      price: string | null
      attendees: number
      maxAttendees: number | null
      tags: string[]
      url: string | null
      hostName: string
      hostRole: string
      hostAvatar: string | null
      createdAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly type: FieldRef<"Event", 'EventType'>
    readonly status: FieldRef<"Event", 'EventStatus'>
    readonly date: FieldRef<"Event", 'String'>
    readonly time: FieldRef<"Event", 'String'>
    readonly duration: FieldRef<"Event", 'String'>
    readonly image: FieldRef<"Event", 'String'>
    readonly isFree: FieldRef<"Event", 'Boolean'>
    readonly price: FieldRef<"Event", 'String'>
    readonly attendees: FieldRef<"Event", 'Int'>
    readonly maxAttendees: FieldRef<"Event", 'Int'>
    readonly tags: FieldRef<"Event", 'String[]'>
    readonly url: FieldRef<"Event", 'String'>
    readonly hostName: FieldRef<"Event", 'String'>
    readonly hostRole: FieldRef<"Event", 'String'>
    readonly hostAvatar: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DisciplineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type DisciplineScalarFieldEnum = (typeof DisciplineScalarFieldEnum)[keyof typeof DisciplineScalarFieldEnum]


  export const ArticleDisciplineScalarFieldEnum: {
    id: 'id',
    articleId: 'articleId',
    disciplineId: 'disciplineId'
  };

  export type ArticleDisciplineScalarFieldEnum = (typeof ArticleDisciplineScalarFieldEnum)[keyof typeof ArticleDisciplineScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    excerpt: 'excerpt',
    publishedAt: 'publishedAt',
    sourceId: 'sourceId'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const SourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    createdAt: 'createdAt'
  };

  export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum]


  export const ResourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    description: 'description',
    pricing: 'pricing',
    createdAt: 'createdAt',
    logoLetter: 'logoLetter',
    logoColor: 'logoColor',
    categoryId: 'categoryId'
  };

  export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    icon: 'icon',
    color: 'color'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const BookmarkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    articleId: 'articleId',
    resourceId: 'resourceId',
    createdAt: 'createdAt'
  };

  export type BookmarkScalarFieldEnum = (typeof BookmarkScalarFieldEnum)[keyof typeof BookmarkScalarFieldEnum]


  export const UserDisciplineScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    disciplineId: 'disciplineId'
  };

  export type UserDisciplineScalarFieldEnum = (typeof UserDisciplineScalarFieldEnum)[keyof typeof UserDisciplineScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    status: 'status',
    date: 'date',
    time: 'time',
    duration: 'duration',
    image: 'image',
    isFree: 'isFree',
    price: 'price',
    attendees: 'attendees',
    maxAttendees: 'maxAttendees',
    tags: 'tags',
    url: 'url',
    hostName: 'hostName',
    hostRole: 'hostRole',
    hostAvatar: 'hostAvatar',
    createdAt: 'createdAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Pricing'
   */
  export type EnumPricingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Pricing'>
    


  /**
   * Reference to a field of type 'Pricing[]'
   */
  export type ListEnumPricingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Pricing[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'EventStatus[]'
   */
  export type ListEnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    bookmarks?: BookmarkListRelationFilter
    preferences?: UserDisciplineListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    bookmarks?: BookmarkOrderByRelationAggregateInput
    preferences?: UserDisciplineOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    bookmarks?: BookmarkListRelationFilter
    preferences?: UserDisciplineListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DisciplineWhereInput = {
    AND?: DisciplineWhereInput | DisciplineWhereInput[]
    OR?: DisciplineWhereInput[]
    NOT?: DisciplineWhereInput | DisciplineWhereInput[]
    id?: StringFilter<"Discipline"> | string
    name?: StringFilter<"Discipline"> | string
    slug?: StringFilter<"Discipline"> | string
    articles?: ArticleDisciplineListRelationFilter
    users?: UserDisciplineListRelationFilter
  }

  export type DisciplineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articles?: ArticleDisciplineOrderByRelationAggregateInput
    users?: UserDisciplineOrderByRelationAggregateInput
  }

  export type DisciplineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: DisciplineWhereInput | DisciplineWhereInput[]
    OR?: DisciplineWhereInput[]
    NOT?: DisciplineWhereInput | DisciplineWhereInput[]
    articles?: ArticleDisciplineListRelationFilter
    users?: UserDisciplineListRelationFilter
  }, "id" | "name" | "slug">

  export type DisciplineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: DisciplineCountOrderByAggregateInput
    _max?: DisciplineMaxOrderByAggregateInput
    _min?: DisciplineMinOrderByAggregateInput
  }

  export type DisciplineScalarWhereWithAggregatesInput = {
    AND?: DisciplineScalarWhereWithAggregatesInput | DisciplineScalarWhereWithAggregatesInput[]
    OR?: DisciplineScalarWhereWithAggregatesInput[]
    NOT?: DisciplineScalarWhereWithAggregatesInput | DisciplineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Discipline"> | string
    name?: StringWithAggregatesFilter<"Discipline"> | string
    slug?: StringWithAggregatesFilter<"Discipline"> | string
  }

  export type ArticleDisciplineWhereInput = {
    AND?: ArticleDisciplineWhereInput | ArticleDisciplineWhereInput[]
    OR?: ArticleDisciplineWhereInput[]
    NOT?: ArticleDisciplineWhereInput | ArticleDisciplineWhereInput[]
    id?: StringFilter<"ArticleDiscipline"> | string
    articleId?: StringFilter<"ArticleDiscipline"> | string
    disciplineId?: StringFilter<"ArticleDiscipline"> | string
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    discipline?: XOR<DisciplineScalarRelationFilter, DisciplineWhereInput>
  }

  export type ArticleDisciplineOrderByWithRelationInput = {
    id?: SortOrder
    articleId?: SortOrder
    disciplineId?: SortOrder
    article?: ArticleOrderByWithRelationInput
    discipline?: DisciplineOrderByWithRelationInput
  }

  export type ArticleDisciplineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    articleId_disciplineId?: ArticleDisciplineArticleIdDisciplineIdCompoundUniqueInput
    AND?: ArticleDisciplineWhereInput | ArticleDisciplineWhereInput[]
    OR?: ArticleDisciplineWhereInput[]
    NOT?: ArticleDisciplineWhereInput | ArticleDisciplineWhereInput[]
    articleId?: StringFilter<"ArticleDiscipline"> | string
    disciplineId?: StringFilter<"ArticleDiscipline"> | string
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    discipline?: XOR<DisciplineScalarRelationFilter, DisciplineWhereInput>
  }, "id" | "articleId_disciplineId">

  export type ArticleDisciplineOrderByWithAggregationInput = {
    id?: SortOrder
    articleId?: SortOrder
    disciplineId?: SortOrder
    _count?: ArticleDisciplineCountOrderByAggregateInput
    _max?: ArticleDisciplineMaxOrderByAggregateInput
    _min?: ArticleDisciplineMinOrderByAggregateInput
  }

  export type ArticleDisciplineScalarWhereWithAggregatesInput = {
    AND?: ArticleDisciplineScalarWhereWithAggregatesInput | ArticleDisciplineScalarWhereWithAggregatesInput[]
    OR?: ArticleDisciplineScalarWhereWithAggregatesInput[]
    NOT?: ArticleDisciplineScalarWhereWithAggregatesInput | ArticleDisciplineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArticleDiscipline"> | string
    articleId?: StringWithAggregatesFilter<"ArticleDiscipline"> | string
    disciplineId?: StringWithAggregatesFilter<"ArticleDiscipline"> | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    url?: StringFilter<"Article"> | string
    excerpt?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    sourceId?: StringNullableFilter<"Article"> | string | null
    source?: XOR<SourceNullableScalarRelationFilter, SourceWhereInput> | null
    disciplines?: ArticleDisciplineListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    source?: SourceOrderByWithRelationInput
    disciplines?: ArticleDisciplineOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    excerpt?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    sourceId?: StringNullableFilter<"Article"> | string | null
    source?: XOR<SourceNullableScalarRelationFilter, SourceWhereInput> | null
    disciplines?: ArticleDisciplineListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }, "id" | "url">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    sourceId?: SortOrderInput | SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    url?: StringWithAggregatesFilter<"Article"> | string
    excerpt?: StringNullableWithAggregatesFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Article"> | Date | string | null
    sourceId?: StringNullableWithAggregatesFilter<"Article"> | string | null
  }

  export type SourceWhereInput = {
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    id?: StringFilter<"Source"> | string
    name?: StringFilter<"Source"> | string
    url?: StringNullableFilter<"Source"> | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
    articles?: ArticleListRelationFilter
  }

  export type SourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    articles?: ArticleOrderByRelationAggregateInput
  }

  export type SourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    url?: StringNullableFilter<"Source"> | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
    articles?: ArticleListRelationFilter
  }, "id" | "name">

  export type SourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SourceCountOrderByAggregateInput
    _max?: SourceMaxOrderByAggregateInput
    _min?: SourceMinOrderByAggregateInput
  }

  export type SourceScalarWhereWithAggregatesInput = {
    AND?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    OR?: SourceScalarWhereWithAggregatesInput[]
    NOT?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Source"> | string
    name?: StringWithAggregatesFilter<"Source"> | string
    url?: StringNullableWithAggregatesFilter<"Source"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Source"> | Date | string
  }

  export type ResourceWhereInput = {
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    id?: StringFilter<"Resource"> | string
    name?: StringFilter<"Resource"> | string
    url?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    pricing?: EnumPricingFilter<"Resource"> | $Enums.Pricing
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    logoLetter?: StringNullableFilter<"Resource"> | string | null
    logoColor?: StringNullableFilter<"Resource"> | string | null
    categoryId?: StringFilter<"Resource"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    bookmarks?: BookmarkListRelationFilter
  }

  export type ResourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    pricing?: SortOrder
    createdAt?: SortOrder
    logoLetter?: SortOrderInput | SortOrder
    logoColor?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    category?: CategoryOrderByWithRelationInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
  }

  export type ResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    name?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    pricing?: EnumPricingFilter<"Resource"> | $Enums.Pricing
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    logoLetter?: StringNullableFilter<"Resource"> | string | null
    logoColor?: StringNullableFilter<"Resource"> | string | null
    categoryId?: StringFilter<"Resource"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    bookmarks?: BookmarkListRelationFilter
  }, "id" | "url">

  export type ResourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    pricing?: SortOrder
    createdAt?: SortOrder
    logoLetter?: SortOrderInput | SortOrder
    logoColor?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    _count?: ResourceCountOrderByAggregateInput
    _max?: ResourceMaxOrderByAggregateInput
    _min?: ResourceMinOrderByAggregateInput
  }

  export type ResourceScalarWhereWithAggregatesInput = {
    AND?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    OR?: ResourceScalarWhereWithAggregatesInput[]
    NOT?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resource"> | string
    name?: StringWithAggregatesFilter<"Resource"> | string
    url?: StringWithAggregatesFilter<"Resource"> | string
    description?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    pricing?: EnumPricingWithAggregatesFilter<"Resource"> | $Enums.Pricing
    createdAt?: DateTimeWithAggregatesFilter<"Resource"> | Date | string
    logoLetter?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    logoColor?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    categoryId?: StringWithAggregatesFilter<"Resource"> | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    icon?: StringNullableFilter<"Category"> | string | null
    color?: StringNullableFilter<"Category"> | string | null
    resources?: ResourceListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    resources?: ResourceOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    icon?: StringNullableFilter<"Category"> | string | null
    color?: StringNullableFilter<"Category"> | string | null
    resources?: ResourceListRelationFilter
  }, "id" | "name" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    icon?: StringNullableWithAggregatesFilter<"Category"> | string | null
    color?: StringNullableWithAggregatesFilter<"Category"> | string | null
  }

  export type BookmarkWhereInput = {
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    userId?: StringFilter<"Bookmark"> | string
    articleId?: StringNullableFilter<"Bookmark"> | string | null
    resourceId?: StringNullableFilter<"Bookmark"> | string | null
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    article?: XOR<ArticleNullableScalarRelationFilter, ArticleWhereInput> | null
    resource?: XOR<ResourceNullableScalarRelationFilter, ResourceWhereInput> | null
  }

  export type BookmarkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrderInput | SortOrder
    resourceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    article?: ArticleOrderByWithRelationInput
    resource?: ResourceOrderByWithRelationInput
  }

  export type BookmarkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_articleId_resourceId?: BookmarkUserIdArticleIdResourceIdCompoundUniqueInput
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    userId?: StringFilter<"Bookmark"> | string
    articleId?: StringNullableFilter<"Bookmark"> | string | null
    resourceId?: StringNullableFilter<"Bookmark"> | string | null
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    article?: XOR<ArticleNullableScalarRelationFilter, ArticleWhereInput> | null
    resource?: XOR<ResourceNullableScalarRelationFilter, ResourceWhereInput> | null
  }, "id" | "userId_articleId_resourceId">

  export type BookmarkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrderInput | SortOrder
    resourceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: BookmarkCountOrderByAggregateInput
    _max?: BookmarkMaxOrderByAggregateInput
    _min?: BookmarkMinOrderByAggregateInput
  }

  export type BookmarkScalarWhereWithAggregatesInput = {
    AND?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    OR?: BookmarkScalarWhereWithAggregatesInput[]
    NOT?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bookmark"> | string
    userId?: StringWithAggregatesFilter<"Bookmark"> | string
    articleId?: StringNullableWithAggregatesFilter<"Bookmark"> | string | null
    resourceId?: StringNullableWithAggregatesFilter<"Bookmark"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Bookmark"> | Date | string
  }

  export type UserDisciplineWhereInput = {
    AND?: UserDisciplineWhereInput | UserDisciplineWhereInput[]
    OR?: UserDisciplineWhereInput[]
    NOT?: UserDisciplineWhereInput | UserDisciplineWhereInput[]
    id?: StringFilter<"UserDiscipline"> | string
    userId?: StringFilter<"UserDiscipline"> | string
    disciplineId?: StringFilter<"UserDiscipline"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    discipline?: XOR<DisciplineScalarRelationFilter, DisciplineWhereInput>
  }

  export type UserDisciplineOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    disciplineId?: SortOrder
    user?: UserOrderByWithRelationInput
    discipline?: DisciplineOrderByWithRelationInput
  }

  export type UserDisciplineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_disciplineId?: UserDisciplineUserIdDisciplineIdCompoundUniqueInput
    AND?: UserDisciplineWhereInput | UserDisciplineWhereInput[]
    OR?: UserDisciplineWhereInput[]
    NOT?: UserDisciplineWhereInput | UserDisciplineWhereInput[]
    userId?: StringFilter<"UserDiscipline"> | string
    disciplineId?: StringFilter<"UserDiscipline"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    discipline?: XOR<DisciplineScalarRelationFilter, DisciplineWhereInput>
  }, "id" | "userId_disciplineId">

  export type UserDisciplineOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    disciplineId?: SortOrder
    _count?: UserDisciplineCountOrderByAggregateInput
    _max?: UserDisciplineMaxOrderByAggregateInput
    _min?: UserDisciplineMinOrderByAggregateInput
  }

  export type UserDisciplineScalarWhereWithAggregatesInput = {
    AND?: UserDisciplineScalarWhereWithAggregatesInput | UserDisciplineScalarWhereWithAggregatesInput[]
    OR?: UserDisciplineScalarWhereWithAggregatesInput[]
    NOT?: UserDisciplineScalarWhereWithAggregatesInput | UserDisciplineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserDiscipline"> | string
    userId?: StringWithAggregatesFilter<"UserDiscipline"> | string
    disciplineId?: StringWithAggregatesFilter<"UserDiscipline"> | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    date?: StringFilter<"Event"> | string
    time?: StringFilter<"Event"> | string
    duration?: StringFilter<"Event"> | string
    image?: StringNullableFilter<"Event"> | string | null
    isFree?: BoolFilter<"Event"> | boolean
    price?: StringNullableFilter<"Event"> | string | null
    attendees?: IntFilter<"Event"> | number
    maxAttendees?: IntNullableFilter<"Event"> | number | null
    tags?: StringNullableListFilter<"Event">
    url?: StringNullableFilter<"Event"> | string | null
    hostName?: StringFilter<"Event"> | string
    hostRole?: StringFilter<"Event"> | string
    hostAvatar?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    image?: SortOrderInput | SortOrder
    isFree?: SortOrder
    price?: SortOrderInput | SortOrder
    attendees?: SortOrder
    maxAttendees?: SortOrderInput | SortOrder
    tags?: SortOrder
    url?: SortOrderInput | SortOrder
    hostName?: SortOrder
    hostRole?: SortOrder
    hostAvatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    description?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    status?: EnumEventStatusFilter<"Event"> | $Enums.EventStatus
    date?: StringFilter<"Event"> | string
    time?: StringFilter<"Event"> | string
    duration?: StringFilter<"Event"> | string
    image?: StringNullableFilter<"Event"> | string | null
    isFree?: BoolFilter<"Event"> | boolean
    price?: StringNullableFilter<"Event"> | string | null
    attendees?: IntFilter<"Event"> | number
    maxAttendees?: IntNullableFilter<"Event"> | number | null
    tags?: StringNullableListFilter<"Event">
    url?: StringNullableFilter<"Event"> | string | null
    hostName?: StringFilter<"Event"> | string
    hostRole?: StringFilter<"Event"> | string
    hostAvatar?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
  }, "id" | "title">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    image?: SortOrderInput | SortOrder
    isFree?: SortOrder
    price?: SortOrderInput | SortOrder
    attendees?: SortOrder
    maxAttendees?: SortOrderInput | SortOrder
    tags?: SortOrder
    url?: SortOrderInput | SortOrder
    hostName?: SortOrder
    hostRole?: SortOrder
    hostAvatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    description?: StringWithAggregatesFilter<"Event"> | string
    type?: EnumEventTypeWithAggregatesFilter<"Event"> | $Enums.EventType
    status?: EnumEventStatusWithAggregatesFilter<"Event"> | $Enums.EventStatus
    date?: StringWithAggregatesFilter<"Event"> | string
    time?: StringWithAggregatesFilter<"Event"> | string
    duration?: StringWithAggregatesFilter<"Event"> | string
    image?: StringNullableWithAggregatesFilter<"Event"> | string | null
    isFree?: BoolWithAggregatesFilter<"Event"> | boolean
    price?: StringNullableWithAggregatesFilter<"Event"> | string | null
    attendees?: IntWithAggregatesFilter<"Event"> | number
    maxAttendees?: IntNullableWithAggregatesFilter<"Event"> | number | null
    tags?: StringNullableListFilter<"Event">
    url?: StringNullableWithAggregatesFilter<"Event"> | string | null
    hostName?: StringWithAggregatesFilter<"Event"> | string
    hostRole?: StringWithAggregatesFilter<"Event"> | string
    hostAvatar?: StringNullableWithAggregatesFilter<"Event"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
    preferences?: UserDisciplineCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
    preferences?: UserDisciplineUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
    preferences?: UserDisciplineUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
    preferences?: UserDisciplineUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplineCreateInput = {
    id?: string
    name: string
    slug: string
    articles?: ArticleDisciplineCreateNestedManyWithoutDisciplineInput
    users?: UserDisciplineCreateNestedManyWithoutDisciplineInput
  }

  export type DisciplineUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    articles?: ArticleDisciplineUncheckedCreateNestedManyWithoutDisciplineInput
    users?: UserDisciplineUncheckedCreateNestedManyWithoutDisciplineInput
  }

  export type DisciplineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articles?: ArticleDisciplineUpdateManyWithoutDisciplineNestedInput
    users?: UserDisciplineUpdateManyWithoutDisciplineNestedInput
  }

  export type DisciplineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articles?: ArticleDisciplineUncheckedUpdateManyWithoutDisciplineNestedInput
    users?: UserDisciplineUncheckedUpdateManyWithoutDisciplineNestedInput
  }

  export type DisciplineCreateManyInput = {
    id?: string
    name: string
    slug: string
  }

  export type DisciplineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type DisciplineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineCreateInput = {
    id?: string
    article: ArticleCreateNestedOneWithoutDisciplinesInput
    discipline: DisciplineCreateNestedOneWithoutArticlesInput
  }

  export type ArticleDisciplineUncheckedCreateInput = {
    id?: string
    articleId: string
    disciplineId: string
  }

  export type ArticleDisciplineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    article?: ArticleUpdateOneRequiredWithoutDisciplinesNestedInput
    discipline?: DisciplineUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleDisciplineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineCreateManyInput = {
    id?: string
    articleId: string
    disciplineId: string
  }

  export type ArticleDisciplineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    source?: SourceCreateNestedOneWithoutArticlesInput
    disciplines?: ArticleDisciplineCreateNestedManyWithoutArticleInput
    bookmarks?: BookmarkCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    sourceId?: string | null
    disciplines?: ArticleDisciplineUncheckedCreateNestedManyWithoutArticleInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: SourceUpdateOneWithoutArticlesNestedInput
    disciplines?: ArticleDisciplineUpdateManyWithoutArticleNestedInput
    bookmarks?: BookmarkUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    disciplines?: ArticleDisciplineUncheckedUpdateManyWithoutArticleNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    sourceId?: string | null
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SourceCreateInput = {
    id?: string
    name: string
    url?: string | null
    createdAt?: Date | string
    articles?: ArticleCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateInput = {
    id?: string
    name: string
    url?: string | null
    createdAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type SourceCreateManyInput = {
    id?: string
    name: string
    url?: string | null
    createdAt?: Date | string
  }

  export type SourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceCreateInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    category: CategoryCreateNestedOneWithoutResourcesInput
    bookmarks?: BookmarkCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    categoryId: string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutResourcesNestedInput
    bookmarks?: BookmarkUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type ResourceCreateManyInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    categoryId: string
  }

  export type ResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    color?: string | null
    resources?: ResourceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    color?: string | null
    resources?: ResourceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    resources?: ResourceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    resources?: ResourceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    color?: string | null
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookmarkCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
    article?: ArticleCreateNestedOneWithoutBookmarksInput
    resource?: ResourceCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateInput = {
    id?: string
    userId: string
    articleId?: string | null
    resourceId?: string | null
    createdAt?: Date | string
  }

  export type BookmarkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
    article?: ArticleUpdateOneWithoutBookmarksNestedInput
    resource?: ResourceUpdateOneWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateManyInput = {
    id?: string
    userId: string
    articleId?: string | null
    resourceId?: string | null
    createdAt?: Date | string
  }

  export type BookmarkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDisciplineCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutPreferencesInput
    discipline: DisciplineCreateNestedOneWithoutUsersInput
  }

  export type UserDisciplineUncheckedCreateInput = {
    id?: string
    userId: string
    disciplineId: string
  }

  export type UserDisciplineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPreferencesNestedInput
    discipline?: DisciplineUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserDisciplineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDisciplineCreateManyInput = {
    id?: string
    userId: string
    disciplineId: string
  }

  export type UserDisciplineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type UserDisciplineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type EventCreateInput = {
    id?: string
    title: string
    description: string
    type: $Enums.EventType
    status?: $Enums.EventStatus
    date: string
    time: string
    duration: string
    image?: string | null
    isFree?: boolean
    price?: string | null
    attendees?: number
    maxAttendees?: number | null
    tags?: EventCreatetagsInput | string[]
    url?: string | null
    hostName: string
    hostRole: string
    hostAvatar?: string | null
    createdAt?: Date | string
  }

  export type EventUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    type: $Enums.EventType
    status?: $Enums.EventStatus
    date: string
    time: string
    duration: string
    image?: string | null
    isFree?: boolean
    price?: string | null
    attendees?: number
    maxAttendees?: number | null
    tags?: EventCreatetagsInput | string[]
    url?: string | null
    hostName: string
    hostRole: string
    hostAvatar?: string | null
    createdAt?: Date | string
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isFree?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: IntFieldUpdateOperationsInput | number
    maxAttendees?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: EventUpdatetagsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    hostName?: StringFieldUpdateOperationsInput | string
    hostRole?: StringFieldUpdateOperationsInput | string
    hostAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isFree?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: IntFieldUpdateOperationsInput | number
    maxAttendees?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: EventUpdatetagsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    hostName?: StringFieldUpdateOperationsInput | string
    hostRole?: StringFieldUpdateOperationsInput | string
    hostAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateManyInput = {
    id?: string
    title: string
    description: string
    type: $Enums.EventType
    status?: $Enums.EventStatus
    date: string
    time: string
    duration: string
    image?: string | null
    isFree?: boolean
    price?: string | null
    attendees?: number
    maxAttendees?: number | null
    tags?: EventCreatetagsInput | string[]
    url?: string | null
    hostName: string
    hostRole: string
    hostAvatar?: string | null
    createdAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isFree?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: IntFieldUpdateOperationsInput | number
    maxAttendees?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: EventUpdatetagsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    hostName?: StringFieldUpdateOperationsInput | string
    hostRole?: StringFieldUpdateOperationsInput | string
    hostAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    status?: EnumEventStatusFieldUpdateOperationsInput | $Enums.EventStatus
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isFree?: BoolFieldUpdateOperationsInput | boolean
    price?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: IntFieldUpdateOperationsInput | number
    maxAttendees?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: EventUpdatetagsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    hostName?: StringFieldUpdateOperationsInput | string
    hostRole?: StringFieldUpdateOperationsInput | string
    hostAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BookmarkListRelationFilter = {
    every?: BookmarkWhereInput
    some?: BookmarkWhereInput
    none?: BookmarkWhereInput
  }

  export type UserDisciplineListRelationFilter = {
    every?: UserDisciplineWhereInput
    some?: UserDisciplineWhereInput
    none?: UserDisciplineWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserDisciplineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ArticleDisciplineListRelationFilter = {
    every?: ArticleDisciplineWhereInput
    some?: ArticleDisciplineWhereInput
    none?: ArticleDisciplineWhereInput
  }

  export type ArticleDisciplineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DisciplineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type DisciplineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type DisciplineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type ArticleScalarRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type DisciplineScalarRelationFilter = {
    is?: DisciplineWhereInput
    isNot?: DisciplineWhereInput
  }

  export type ArticleDisciplineArticleIdDisciplineIdCompoundUniqueInput = {
    articleId: string
    disciplineId: string
  }

  export type ArticleDisciplineCountOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    disciplineId?: SortOrder
  }

  export type ArticleDisciplineMaxOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    disciplineId?: SortOrder
  }

  export type ArticleDisciplineMinOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    disciplineId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SourceNullableScalarRelationFilter = {
    is?: SourceWhereInput | null
    isNot?: SourceWhereInput | null
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    excerpt?: SortOrder
    publishedAt?: SortOrder
    sourceId?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    excerpt?: SortOrder
    publishedAt?: SortOrder
    sourceId?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    excerpt?: SortOrder
    publishedAt?: SortOrder
    sourceId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ArticleListRelationFilter = {
    every?: ArticleWhereInput
    some?: ArticleWhereInput
    none?: ArticleWhereInput
  }

  export type ArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPricingFilter<$PrismaModel = never> = {
    equals?: $Enums.Pricing | EnumPricingFieldRefInput<$PrismaModel>
    in?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingFilter<$PrismaModel> | $Enums.Pricing
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ResourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrder
    pricing?: SortOrder
    createdAt?: SortOrder
    logoLetter?: SortOrder
    logoColor?: SortOrder
    categoryId?: SortOrder
  }

  export type ResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrder
    pricing?: SortOrder
    createdAt?: SortOrder
    logoLetter?: SortOrder
    logoColor?: SortOrder
    categoryId?: SortOrder
  }

  export type ResourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    description?: SortOrder
    pricing?: SortOrder
    createdAt?: SortOrder
    logoLetter?: SortOrder
    logoColor?: SortOrder
    categoryId?: SortOrder
  }

  export type EnumPricingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Pricing | EnumPricingFieldRefInput<$PrismaModel>
    in?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingWithAggregatesFilter<$PrismaModel> | $Enums.Pricing
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingFilter<$PrismaModel>
    _max?: NestedEnumPricingFilter<$PrismaModel>
  }

  export type ResourceListRelationFilter = {
    every?: ResourceWhereInput
    some?: ResourceWhereInput
    none?: ResourceWhereInput
  }

  export type ResourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    color?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    color?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    color?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ArticleNullableScalarRelationFilter = {
    is?: ArticleWhereInput | null
    isNot?: ArticleWhereInput | null
  }

  export type ResourceNullableScalarRelationFilter = {
    is?: ResourceWhereInput | null
    isNot?: ResourceWhereInput | null
  }

  export type BookmarkUserIdArticleIdResourceIdCompoundUniqueInput = {
    userId: string
    articleId: string
    resourceId: string
  }

  export type BookmarkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    resourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    resourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    resourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserDisciplineUserIdDisciplineIdCompoundUniqueInput = {
    userId: string
    disciplineId: string
  }

  export type UserDisciplineCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    disciplineId?: SortOrder
  }

  export type UserDisciplineMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    disciplineId?: SortOrder
  }

  export type UserDisciplineMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    disciplineId?: SortOrder
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    image?: SortOrder
    isFree?: SortOrder
    price?: SortOrder
    attendees?: SortOrder
    maxAttendees?: SortOrder
    tags?: SortOrder
    url?: SortOrder
    hostName?: SortOrder
    hostRole?: SortOrder
    hostAvatar?: SortOrder
    createdAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    attendees?: SortOrder
    maxAttendees?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    image?: SortOrder
    isFree?: SortOrder
    price?: SortOrder
    attendees?: SortOrder
    maxAttendees?: SortOrder
    url?: SortOrder
    hostName?: SortOrder
    hostRole?: SortOrder
    hostAvatar?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    date?: SortOrder
    time?: SortOrder
    duration?: SortOrder
    image?: SortOrder
    isFree?: SortOrder
    price?: SortOrder
    attendees?: SortOrder
    maxAttendees?: SortOrder
    url?: SortOrder
    hostName?: SortOrder
    hostRole?: SortOrder
    hostAvatar?: SortOrder
    createdAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    attendees?: SortOrder
    maxAttendees?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BookmarkCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type UserDisciplineCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDisciplineCreateWithoutUserInput, UserDisciplineUncheckedCreateWithoutUserInput> | UserDisciplineCreateWithoutUserInput[] | UserDisciplineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutUserInput | UserDisciplineCreateOrConnectWithoutUserInput[]
    createMany?: UserDisciplineCreateManyUserInputEnvelope
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type UserDisciplineUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDisciplineCreateWithoutUserInput, UserDisciplineUncheckedCreateWithoutUserInput> | UserDisciplineCreateWithoutUserInput[] | UserDisciplineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutUserInput | UserDisciplineCreateOrConnectWithoutUserInput[]
    createMany?: UserDisciplineCreateManyUserInputEnvelope
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookmarkUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type UserDisciplineUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDisciplineCreateWithoutUserInput, UserDisciplineUncheckedCreateWithoutUserInput> | UserDisciplineCreateWithoutUserInput[] | UserDisciplineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutUserInput | UserDisciplineCreateOrConnectWithoutUserInput[]
    upsert?: UserDisciplineUpsertWithWhereUniqueWithoutUserInput | UserDisciplineUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDisciplineCreateManyUserInputEnvelope
    set?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    disconnect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    delete?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    update?: UserDisciplineUpdateWithWhereUniqueWithoutUserInput | UserDisciplineUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDisciplineUpdateManyWithWhereWithoutUserInput | UserDisciplineUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDisciplineScalarWhereInput | UserDisciplineScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type UserDisciplineUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDisciplineCreateWithoutUserInput, UserDisciplineUncheckedCreateWithoutUserInput> | UserDisciplineCreateWithoutUserInput[] | UserDisciplineUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutUserInput | UserDisciplineCreateOrConnectWithoutUserInput[]
    upsert?: UserDisciplineUpsertWithWhereUniqueWithoutUserInput | UserDisciplineUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDisciplineCreateManyUserInputEnvelope
    set?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    disconnect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    delete?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    update?: UserDisciplineUpdateWithWhereUniqueWithoutUserInput | UserDisciplineUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDisciplineUpdateManyWithWhereWithoutUserInput | UserDisciplineUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDisciplineScalarWhereInput | UserDisciplineScalarWhereInput[]
  }

  export type ArticleDisciplineCreateNestedManyWithoutDisciplineInput = {
    create?: XOR<ArticleDisciplineCreateWithoutDisciplineInput, ArticleDisciplineUncheckedCreateWithoutDisciplineInput> | ArticleDisciplineCreateWithoutDisciplineInput[] | ArticleDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutDisciplineInput | ArticleDisciplineCreateOrConnectWithoutDisciplineInput[]
    createMany?: ArticleDisciplineCreateManyDisciplineInputEnvelope
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
  }

  export type UserDisciplineCreateNestedManyWithoutDisciplineInput = {
    create?: XOR<UserDisciplineCreateWithoutDisciplineInput, UserDisciplineUncheckedCreateWithoutDisciplineInput> | UserDisciplineCreateWithoutDisciplineInput[] | UserDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutDisciplineInput | UserDisciplineCreateOrConnectWithoutDisciplineInput[]
    createMany?: UserDisciplineCreateManyDisciplineInputEnvelope
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
  }

  export type ArticleDisciplineUncheckedCreateNestedManyWithoutDisciplineInput = {
    create?: XOR<ArticleDisciplineCreateWithoutDisciplineInput, ArticleDisciplineUncheckedCreateWithoutDisciplineInput> | ArticleDisciplineCreateWithoutDisciplineInput[] | ArticleDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutDisciplineInput | ArticleDisciplineCreateOrConnectWithoutDisciplineInput[]
    createMany?: ArticleDisciplineCreateManyDisciplineInputEnvelope
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
  }

  export type UserDisciplineUncheckedCreateNestedManyWithoutDisciplineInput = {
    create?: XOR<UserDisciplineCreateWithoutDisciplineInput, UserDisciplineUncheckedCreateWithoutDisciplineInput> | UserDisciplineCreateWithoutDisciplineInput[] | UserDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutDisciplineInput | UserDisciplineCreateOrConnectWithoutDisciplineInput[]
    createMany?: UserDisciplineCreateManyDisciplineInputEnvelope
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
  }

  export type ArticleDisciplineUpdateManyWithoutDisciplineNestedInput = {
    create?: XOR<ArticleDisciplineCreateWithoutDisciplineInput, ArticleDisciplineUncheckedCreateWithoutDisciplineInput> | ArticleDisciplineCreateWithoutDisciplineInput[] | ArticleDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutDisciplineInput | ArticleDisciplineCreateOrConnectWithoutDisciplineInput[]
    upsert?: ArticleDisciplineUpsertWithWhereUniqueWithoutDisciplineInput | ArticleDisciplineUpsertWithWhereUniqueWithoutDisciplineInput[]
    createMany?: ArticleDisciplineCreateManyDisciplineInputEnvelope
    set?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    disconnect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    delete?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    update?: ArticleDisciplineUpdateWithWhereUniqueWithoutDisciplineInput | ArticleDisciplineUpdateWithWhereUniqueWithoutDisciplineInput[]
    updateMany?: ArticleDisciplineUpdateManyWithWhereWithoutDisciplineInput | ArticleDisciplineUpdateManyWithWhereWithoutDisciplineInput[]
    deleteMany?: ArticleDisciplineScalarWhereInput | ArticleDisciplineScalarWhereInput[]
  }

  export type UserDisciplineUpdateManyWithoutDisciplineNestedInput = {
    create?: XOR<UserDisciplineCreateWithoutDisciplineInput, UserDisciplineUncheckedCreateWithoutDisciplineInput> | UserDisciplineCreateWithoutDisciplineInput[] | UserDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutDisciplineInput | UserDisciplineCreateOrConnectWithoutDisciplineInput[]
    upsert?: UserDisciplineUpsertWithWhereUniqueWithoutDisciplineInput | UserDisciplineUpsertWithWhereUniqueWithoutDisciplineInput[]
    createMany?: UserDisciplineCreateManyDisciplineInputEnvelope
    set?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    disconnect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    delete?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    update?: UserDisciplineUpdateWithWhereUniqueWithoutDisciplineInput | UserDisciplineUpdateWithWhereUniqueWithoutDisciplineInput[]
    updateMany?: UserDisciplineUpdateManyWithWhereWithoutDisciplineInput | UserDisciplineUpdateManyWithWhereWithoutDisciplineInput[]
    deleteMany?: UserDisciplineScalarWhereInput | UserDisciplineScalarWhereInput[]
  }

  export type ArticleDisciplineUncheckedUpdateManyWithoutDisciplineNestedInput = {
    create?: XOR<ArticleDisciplineCreateWithoutDisciplineInput, ArticleDisciplineUncheckedCreateWithoutDisciplineInput> | ArticleDisciplineCreateWithoutDisciplineInput[] | ArticleDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutDisciplineInput | ArticleDisciplineCreateOrConnectWithoutDisciplineInput[]
    upsert?: ArticleDisciplineUpsertWithWhereUniqueWithoutDisciplineInput | ArticleDisciplineUpsertWithWhereUniqueWithoutDisciplineInput[]
    createMany?: ArticleDisciplineCreateManyDisciplineInputEnvelope
    set?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    disconnect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    delete?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    update?: ArticleDisciplineUpdateWithWhereUniqueWithoutDisciplineInput | ArticleDisciplineUpdateWithWhereUniqueWithoutDisciplineInput[]
    updateMany?: ArticleDisciplineUpdateManyWithWhereWithoutDisciplineInput | ArticleDisciplineUpdateManyWithWhereWithoutDisciplineInput[]
    deleteMany?: ArticleDisciplineScalarWhereInput | ArticleDisciplineScalarWhereInput[]
  }

  export type UserDisciplineUncheckedUpdateManyWithoutDisciplineNestedInput = {
    create?: XOR<UserDisciplineCreateWithoutDisciplineInput, UserDisciplineUncheckedCreateWithoutDisciplineInput> | UserDisciplineCreateWithoutDisciplineInput[] | UserDisciplineUncheckedCreateWithoutDisciplineInput[]
    connectOrCreate?: UserDisciplineCreateOrConnectWithoutDisciplineInput | UserDisciplineCreateOrConnectWithoutDisciplineInput[]
    upsert?: UserDisciplineUpsertWithWhereUniqueWithoutDisciplineInput | UserDisciplineUpsertWithWhereUniqueWithoutDisciplineInput[]
    createMany?: UserDisciplineCreateManyDisciplineInputEnvelope
    set?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    disconnect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    delete?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    connect?: UserDisciplineWhereUniqueInput | UserDisciplineWhereUniqueInput[]
    update?: UserDisciplineUpdateWithWhereUniqueWithoutDisciplineInput | UserDisciplineUpdateWithWhereUniqueWithoutDisciplineInput[]
    updateMany?: UserDisciplineUpdateManyWithWhereWithoutDisciplineInput | UserDisciplineUpdateManyWithWhereWithoutDisciplineInput[]
    deleteMany?: UserDisciplineScalarWhereInput | UserDisciplineScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutDisciplinesInput = {
    create?: XOR<ArticleCreateWithoutDisciplinesInput, ArticleUncheckedCreateWithoutDisciplinesInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutDisciplinesInput
    connect?: ArticleWhereUniqueInput
  }

  export type DisciplineCreateNestedOneWithoutArticlesInput = {
    create?: XOR<DisciplineCreateWithoutArticlesInput, DisciplineUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: DisciplineCreateOrConnectWithoutArticlesInput
    connect?: DisciplineWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutDisciplinesNestedInput = {
    create?: XOR<ArticleCreateWithoutDisciplinesInput, ArticleUncheckedCreateWithoutDisciplinesInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutDisciplinesInput
    upsert?: ArticleUpsertWithoutDisciplinesInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutDisciplinesInput, ArticleUpdateWithoutDisciplinesInput>, ArticleUncheckedUpdateWithoutDisciplinesInput>
  }

  export type DisciplineUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<DisciplineCreateWithoutArticlesInput, DisciplineUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: DisciplineCreateOrConnectWithoutArticlesInput
    upsert?: DisciplineUpsertWithoutArticlesInput
    connect?: DisciplineWhereUniqueInput
    update?: XOR<XOR<DisciplineUpdateToOneWithWhereWithoutArticlesInput, DisciplineUpdateWithoutArticlesInput>, DisciplineUncheckedUpdateWithoutArticlesInput>
  }

  export type SourceCreateNestedOneWithoutArticlesInput = {
    create?: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: SourceCreateOrConnectWithoutArticlesInput
    connect?: SourceWhereUniqueInput
  }

  export type ArticleDisciplineCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleDisciplineCreateWithoutArticleInput, ArticleDisciplineUncheckedCreateWithoutArticleInput> | ArticleDisciplineCreateWithoutArticleInput[] | ArticleDisciplineUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutArticleInput | ArticleDisciplineCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleDisciplineCreateManyArticleInputEnvelope
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutArticleInput = {
    create?: XOR<BookmarkCreateWithoutArticleInput, BookmarkUncheckedCreateWithoutArticleInput> | BookmarkCreateWithoutArticleInput[] | BookmarkUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutArticleInput | BookmarkCreateOrConnectWithoutArticleInput[]
    createMany?: BookmarkCreateManyArticleInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type ArticleDisciplineUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleDisciplineCreateWithoutArticleInput, ArticleDisciplineUncheckedCreateWithoutArticleInput> | ArticleDisciplineCreateWithoutArticleInput[] | ArticleDisciplineUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutArticleInput | ArticleDisciplineCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleDisciplineCreateManyArticleInputEnvelope
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<BookmarkCreateWithoutArticleInput, BookmarkUncheckedCreateWithoutArticleInput> | BookmarkCreateWithoutArticleInput[] | BookmarkUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutArticleInput | BookmarkCreateOrConnectWithoutArticleInput[]
    createMany?: BookmarkCreateManyArticleInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SourceUpdateOneWithoutArticlesNestedInput = {
    create?: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: SourceCreateOrConnectWithoutArticlesInput
    upsert?: SourceUpsertWithoutArticlesInput
    disconnect?: SourceWhereInput | boolean
    delete?: SourceWhereInput | boolean
    connect?: SourceWhereUniqueInput
    update?: XOR<XOR<SourceUpdateToOneWithWhereWithoutArticlesInput, SourceUpdateWithoutArticlesInput>, SourceUncheckedUpdateWithoutArticlesInput>
  }

  export type ArticleDisciplineUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleDisciplineCreateWithoutArticleInput, ArticleDisciplineUncheckedCreateWithoutArticleInput> | ArticleDisciplineCreateWithoutArticleInput[] | ArticleDisciplineUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutArticleInput | ArticleDisciplineCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleDisciplineUpsertWithWhereUniqueWithoutArticleInput | ArticleDisciplineUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleDisciplineCreateManyArticleInputEnvelope
    set?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    disconnect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    delete?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    update?: ArticleDisciplineUpdateWithWhereUniqueWithoutArticleInput | ArticleDisciplineUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleDisciplineUpdateManyWithWhereWithoutArticleInput | ArticleDisciplineUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleDisciplineScalarWhereInput | ArticleDisciplineScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutArticleNestedInput = {
    create?: XOR<BookmarkCreateWithoutArticleInput, BookmarkUncheckedCreateWithoutArticleInput> | BookmarkCreateWithoutArticleInput[] | BookmarkUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutArticleInput | BookmarkCreateOrConnectWithoutArticleInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutArticleInput | BookmarkUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: BookmarkCreateManyArticleInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutArticleInput | BookmarkUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutArticleInput | BookmarkUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type ArticleDisciplineUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleDisciplineCreateWithoutArticleInput, ArticleDisciplineUncheckedCreateWithoutArticleInput> | ArticleDisciplineCreateWithoutArticleInput[] | ArticleDisciplineUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleDisciplineCreateOrConnectWithoutArticleInput | ArticleDisciplineCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleDisciplineUpsertWithWhereUniqueWithoutArticleInput | ArticleDisciplineUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleDisciplineCreateManyArticleInputEnvelope
    set?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    disconnect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    delete?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    connect?: ArticleDisciplineWhereUniqueInput | ArticleDisciplineWhereUniqueInput[]
    update?: ArticleDisciplineUpdateWithWhereUniqueWithoutArticleInput | ArticleDisciplineUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleDisciplineUpdateManyWithWhereWithoutArticleInput | ArticleDisciplineUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleDisciplineScalarWhereInput | ArticleDisciplineScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<BookmarkCreateWithoutArticleInput, BookmarkUncheckedCreateWithoutArticleInput> | BookmarkCreateWithoutArticleInput[] | BookmarkUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutArticleInput | BookmarkCreateOrConnectWithoutArticleInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutArticleInput | BookmarkUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: BookmarkCreateManyArticleInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutArticleInput | BookmarkUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutArticleInput | BookmarkUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type ArticleCreateNestedManyWithoutSourceInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ArticleUpdateManyWithoutSourceNestedInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutSourceInput | ArticleUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutSourceInput | ArticleUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutSourceInput | ArticleUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutSourceInput | ArticleUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutSourceInput | ArticleUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutSourceInput | ArticleUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutResourcesInput = {
    create?: XOR<CategoryCreateWithoutResourcesInput, CategoryUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutResourcesInput
    connect?: CategoryWhereUniqueInput
  }

  export type BookmarkCreateNestedManyWithoutResourceInput = {
    create?: XOR<BookmarkCreateWithoutResourceInput, BookmarkUncheckedCreateWithoutResourceInput> | BookmarkCreateWithoutResourceInput[] | BookmarkUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutResourceInput | BookmarkCreateOrConnectWithoutResourceInput[]
    createMany?: BookmarkCreateManyResourceInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<BookmarkCreateWithoutResourceInput, BookmarkUncheckedCreateWithoutResourceInput> | BookmarkCreateWithoutResourceInput[] | BookmarkUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutResourceInput | BookmarkCreateOrConnectWithoutResourceInput[]
    createMany?: BookmarkCreateManyResourceInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type EnumPricingFieldUpdateOperationsInput = {
    set?: $Enums.Pricing
  }

  export type CategoryUpdateOneRequiredWithoutResourcesNestedInput = {
    create?: XOR<CategoryCreateWithoutResourcesInput, CategoryUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutResourcesInput
    upsert?: CategoryUpsertWithoutResourcesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutResourcesInput, CategoryUpdateWithoutResourcesInput>, CategoryUncheckedUpdateWithoutResourcesInput>
  }

  export type BookmarkUpdateManyWithoutResourceNestedInput = {
    create?: XOR<BookmarkCreateWithoutResourceInput, BookmarkUncheckedCreateWithoutResourceInput> | BookmarkCreateWithoutResourceInput[] | BookmarkUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutResourceInput | BookmarkCreateOrConnectWithoutResourceInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutResourceInput | BookmarkUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: BookmarkCreateManyResourceInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutResourceInput | BookmarkUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutResourceInput | BookmarkUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<BookmarkCreateWithoutResourceInput, BookmarkUncheckedCreateWithoutResourceInput> | BookmarkCreateWithoutResourceInput[] | BookmarkUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutResourceInput | BookmarkCreateOrConnectWithoutResourceInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutResourceInput | BookmarkUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: BookmarkCreateManyResourceInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutResourceInput | BookmarkUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutResourceInput | BookmarkUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type ResourceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ResourceCreateWithoutCategoryInput, ResourceUncheckedCreateWithoutCategoryInput> | ResourceCreateWithoutCategoryInput[] | ResourceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutCategoryInput | ResourceCreateOrConnectWithoutCategoryInput[]
    createMany?: ResourceCreateManyCategoryInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ResourceCreateWithoutCategoryInput, ResourceUncheckedCreateWithoutCategoryInput> | ResourceCreateWithoutCategoryInput[] | ResourceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutCategoryInput | ResourceCreateOrConnectWithoutCategoryInput[]
    createMany?: ResourceCreateManyCategoryInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ResourceCreateWithoutCategoryInput, ResourceUncheckedCreateWithoutCategoryInput> | ResourceCreateWithoutCategoryInput[] | ResourceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutCategoryInput | ResourceCreateOrConnectWithoutCategoryInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutCategoryInput | ResourceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ResourceCreateManyCategoryInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutCategoryInput | ResourceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutCategoryInput | ResourceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ResourceCreateWithoutCategoryInput, ResourceUncheckedCreateWithoutCategoryInput> | ResourceCreateWithoutCategoryInput[] | ResourceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutCategoryInput | ResourceCreateOrConnectWithoutCategoryInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutCategoryInput | ResourceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ResourceCreateManyCategoryInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutCategoryInput | ResourceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutCategoryInput | ResourceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    connect?: UserWhereUniqueInput
  }

  export type ArticleCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<ArticleCreateWithoutBookmarksInput, ArticleUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutBookmarksInput
    connect?: ArticleWhereUniqueInput
  }

  export type ResourceCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<ResourceCreateWithoutBookmarksInput, ResourceUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutBookmarksInput
    connect?: ResourceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarksInput
    upsert?: UserUpsertWithoutBookmarksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookmarksInput, UserUpdateWithoutBookmarksInput>, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type ArticleUpdateOneWithoutBookmarksNestedInput = {
    create?: XOR<ArticleCreateWithoutBookmarksInput, ArticleUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutBookmarksInput
    upsert?: ArticleUpsertWithoutBookmarksInput
    disconnect?: ArticleWhereInput | boolean
    delete?: ArticleWhereInput | boolean
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutBookmarksInput, ArticleUpdateWithoutBookmarksInput>, ArticleUncheckedUpdateWithoutBookmarksInput>
  }

  export type ResourceUpdateOneWithoutBookmarksNestedInput = {
    create?: XOR<ResourceCreateWithoutBookmarksInput, ResourceUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutBookmarksInput
    upsert?: ResourceUpsertWithoutBookmarksInput
    disconnect?: ResourceWhereInput | boolean
    delete?: ResourceWhereInput | boolean
    connect?: ResourceWhereUniqueInput
    update?: XOR<XOR<ResourceUpdateToOneWithWhereWithoutBookmarksInput, ResourceUpdateWithoutBookmarksInput>, ResourceUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type DisciplineCreateNestedOneWithoutUsersInput = {
    create?: XOR<DisciplineCreateWithoutUsersInput, DisciplineUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DisciplineCreateOrConnectWithoutUsersInput
    connect?: DisciplineWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    upsert?: UserUpsertWithoutPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPreferencesInput, UserUpdateWithoutPreferencesInput>, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type DisciplineUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<DisciplineCreateWithoutUsersInput, DisciplineUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DisciplineCreateOrConnectWithoutUsersInput
    upsert?: DisciplineUpsertWithoutUsersInput
    connect?: DisciplineWhereUniqueInput
    update?: XOR<XOR<DisciplineUpdateToOneWithWhereWithoutUsersInput, DisciplineUpdateWithoutUsersInput>, DisciplineUncheckedUpdateWithoutUsersInput>
  }

  export type EventCreatetagsInput = {
    set: string[]
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: $Enums.EventStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPricingFilter<$PrismaModel = never> = {
    equals?: $Enums.Pricing | EnumPricingFieldRefInput<$PrismaModel>
    in?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingFilter<$PrismaModel> | $Enums.Pricing
  }

  export type NestedEnumPricingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Pricing | EnumPricingFieldRefInput<$PrismaModel>
    in?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Pricing[] | ListEnumPricingFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingWithAggregatesFilter<$PrismaModel> | $Enums.Pricing
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingFilter<$PrismaModel>
    _max?: NestedEnumPricingFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusFilter<$PrismaModel> | $Enums.EventStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventStatus[] | ListEnumEventStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | $Enums.EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BookmarkCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    article?: ArticleCreateNestedOneWithoutBookmarksInput
    resource?: ResourceCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutUserInput = {
    id?: string
    articleId?: string | null
    resourceId?: string | null
    createdAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkCreateManyUserInputEnvelope = {
    data: BookmarkCreateManyUserInput | BookmarkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserDisciplineCreateWithoutUserInput = {
    id?: string
    discipline: DisciplineCreateNestedOneWithoutUsersInput
  }

  export type UserDisciplineUncheckedCreateWithoutUserInput = {
    id?: string
    disciplineId: string
  }

  export type UserDisciplineCreateOrConnectWithoutUserInput = {
    where: UserDisciplineWhereUniqueInput
    create: XOR<UserDisciplineCreateWithoutUserInput, UserDisciplineUncheckedCreateWithoutUserInput>
  }

  export type UserDisciplineCreateManyUserInputEnvelope = {
    data: UserDisciplineCreateManyUserInput | UserDisciplineCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkUpsertWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutUserInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutUserInput>
  }

  export type BookmarkScalarWhereInput = {
    AND?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    OR?: BookmarkScalarWhereInput[]
    NOT?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    userId?: StringFilter<"Bookmark"> | string
    articleId?: StringNullableFilter<"Bookmark"> | string | null
    resourceId?: StringNullableFilter<"Bookmark"> | string | null
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
  }

  export type UserDisciplineUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDisciplineWhereUniqueInput
    update: XOR<UserDisciplineUpdateWithoutUserInput, UserDisciplineUncheckedUpdateWithoutUserInput>
    create: XOR<UserDisciplineCreateWithoutUserInput, UserDisciplineUncheckedCreateWithoutUserInput>
  }

  export type UserDisciplineUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDisciplineWhereUniqueInput
    data: XOR<UserDisciplineUpdateWithoutUserInput, UserDisciplineUncheckedUpdateWithoutUserInput>
  }

  export type UserDisciplineUpdateManyWithWhereWithoutUserInput = {
    where: UserDisciplineScalarWhereInput
    data: XOR<UserDisciplineUpdateManyMutationInput, UserDisciplineUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDisciplineScalarWhereInput = {
    AND?: UserDisciplineScalarWhereInput | UserDisciplineScalarWhereInput[]
    OR?: UserDisciplineScalarWhereInput[]
    NOT?: UserDisciplineScalarWhereInput | UserDisciplineScalarWhereInput[]
    id?: StringFilter<"UserDiscipline"> | string
    userId?: StringFilter<"UserDiscipline"> | string
    disciplineId?: StringFilter<"UserDiscipline"> | string
  }

  export type ArticleDisciplineCreateWithoutDisciplineInput = {
    id?: string
    article: ArticleCreateNestedOneWithoutDisciplinesInput
  }

  export type ArticleDisciplineUncheckedCreateWithoutDisciplineInput = {
    id?: string
    articleId: string
  }

  export type ArticleDisciplineCreateOrConnectWithoutDisciplineInput = {
    where: ArticleDisciplineWhereUniqueInput
    create: XOR<ArticleDisciplineCreateWithoutDisciplineInput, ArticleDisciplineUncheckedCreateWithoutDisciplineInput>
  }

  export type ArticleDisciplineCreateManyDisciplineInputEnvelope = {
    data: ArticleDisciplineCreateManyDisciplineInput | ArticleDisciplineCreateManyDisciplineInput[]
    skipDuplicates?: boolean
  }

  export type UserDisciplineCreateWithoutDisciplineInput = {
    id?: string
    user: UserCreateNestedOneWithoutPreferencesInput
  }

  export type UserDisciplineUncheckedCreateWithoutDisciplineInput = {
    id?: string
    userId: string
  }

  export type UserDisciplineCreateOrConnectWithoutDisciplineInput = {
    where: UserDisciplineWhereUniqueInput
    create: XOR<UserDisciplineCreateWithoutDisciplineInput, UserDisciplineUncheckedCreateWithoutDisciplineInput>
  }

  export type UserDisciplineCreateManyDisciplineInputEnvelope = {
    data: UserDisciplineCreateManyDisciplineInput | UserDisciplineCreateManyDisciplineInput[]
    skipDuplicates?: boolean
  }

  export type ArticleDisciplineUpsertWithWhereUniqueWithoutDisciplineInput = {
    where: ArticleDisciplineWhereUniqueInput
    update: XOR<ArticleDisciplineUpdateWithoutDisciplineInput, ArticleDisciplineUncheckedUpdateWithoutDisciplineInput>
    create: XOR<ArticleDisciplineCreateWithoutDisciplineInput, ArticleDisciplineUncheckedCreateWithoutDisciplineInput>
  }

  export type ArticleDisciplineUpdateWithWhereUniqueWithoutDisciplineInput = {
    where: ArticleDisciplineWhereUniqueInput
    data: XOR<ArticleDisciplineUpdateWithoutDisciplineInput, ArticleDisciplineUncheckedUpdateWithoutDisciplineInput>
  }

  export type ArticleDisciplineUpdateManyWithWhereWithoutDisciplineInput = {
    where: ArticleDisciplineScalarWhereInput
    data: XOR<ArticleDisciplineUpdateManyMutationInput, ArticleDisciplineUncheckedUpdateManyWithoutDisciplineInput>
  }

  export type ArticleDisciplineScalarWhereInput = {
    AND?: ArticleDisciplineScalarWhereInput | ArticleDisciplineScalarWhereInput[]
    OR?: ArticleDisciplineScalarWhereInput[]
    NOT?: ArticleDisciplineScalarWhereInput | ArticleDisciplineScalarWhereInput[]
    id?: StringFilter<"ArticleDiscipline"> | string
    articleId?: StringFilter<"ArticleDiscipline"> | string
    disciplineId?: StringFilter<"ArticleDiscipline"> | string
  }

  export type UserDisciplineUpsertWithWhereUniqueWithoutDisciplineInput = {
    where: UserDisciplineWhereUniqueInput
    update: XOR<UserDisciplineUpdateWithoutDisciplineInput, UserDisciplineUncheckedUpdateWithoutDisciplineInput>
    create: XOR<UserDisciplineCreateWithoutDisciplineInput, UserDisciplineUncheckedCreateWithoutDisciplineInput>
  }

  export type UserDisciplineUpdateWithWhereUniqueWithoutDisciplineInput = {
    where: UserDisciplineWhereUniqueInput
    data: XOR<UserDisciplineUpdateWithoutDisciplineInput, UserDisciplineUncheckedUpdateWithoutDisciplineInput>
  }

  export type UserDisciplineUpdateManyWithWhereWithoutDisciplineInput = {
    where: UserDisciplineScalarWhereInput
    data: XOR<UserDisciplineUpdateManyMutationInput, UserDisciplineUncheckedUpdateManyWithoutDisciplineInput>
  }

  export type ArticleCreateWithoutDisciplinesInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    source?: SourceCreateNestedOneWithoutArticlesInput
    bookmarks?: BookmarkCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutDisciplinesInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    sourceId?: string | null
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutDisciplinesInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutDisciplinesInput, ArticleUncheckedCreateWithoutDisciplinesInput>
  }

  export type DisciplineCreateWithoutArticlesInput = {
    id?: string
    name: string
    slug: string
    users?: UserDisciplineCreateNestedManyWithoutDisciplineInput
  }

  export type DisciplineUncheckedCreateWithoutArticlesInput = {
    id?: string
    name: string
    slug: string
    users?: UserDisciplineUncheckedCreateNestedManyWithoutDisciplineInput
  }

  export type DisciplineCreateOrConnectWithoutArticlesInput = {
    where: DisciplineWhereUniqueInput
    create: XOR<DisciplineCreateWithoutArticlesInput, DisciplineUncheckedCreateWithoutArticlesInput>
  }

  export type ArticleUpsertWithoutDisciplinesInput = {
    update: XOR<ArticleUpdateWithoutDisciplinesInput, ArticleUncheckedUpdateWithoutDisciplinesInput>
    create: XOR<ArticleCreateWithoutDisciplinesInput, ArticleUncheckedCreateWithoutDisciplinesInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutDisciplinesInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutDisciplinesInput, ArticleUncheckedUpdateWithoutDisciplinesInput>
  }

  export type ArticleUpdateWithoutDisciplinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: SourceUpdateOneWithoutArticlesNestedInput
    bookmarks?: BookmarkUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutDisciplinesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks?: BookmarkUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type DisciplineUpsertWithoutArticlesInput = {
    update: XOR<DisciplineUpdateWithoutArticlesInput, DisciplineUncheckedUpdateWithoutArticlesInput>
    create: XOR<DisciplineCreateWithoutArticlesInput, DisciplineUncheckedCreateWithoutArticlesInput>
    where?: DisciplineWhereInput
  }

  export type DisciplineUpdateToOneWithWhereWithoutArticlesInput = {
    where?: DisciplineWhereInput
    data: XOR<DisciplineUpdateWithoutArticlesInput, DisciplineUncheckedUpdateWithoutArticlesInput>
  }

  export type DisciplineUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    users?: UserDisciplineUpdateManyWithoutDisciplineNestedInput
  }

  export type DisciplineUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    users?: UserDisciplineUncheckedUpdateManyWithoutDisciplineNestedInput
  }

  export type SourceCreateWithoutArticlesInput = {
    id?: string
    name: string
    url?: string | null
    createdAt?: Date | string
  }

  export type SourceUncheckedCreateWithoutArticlesInput = {
    id?: string
    name: string
    url?: string | null
    createdAt?: Date | string
  }

  export type SourceCreateOrConnectWithoutArticlesInput = {
    where: SourceWhereUniqueInput
    create: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
  }

  export type ArticleDisciplineCreateWithoutArticleInput = {
    id?: string
    discipline: DisciplineCreateNestedOneWithoutArticlesInput
  }

  export type ArticleDisciplineUncheckedCreateWithoutArticleInput = {
    id?: string
    disciplineId: string
  }

  export type ArticleDisciplineCreateOrConnectWithoutArticleInput = {
    where: ArticleDisciplineWhereUniqueInput
    create: XOR<ArticleDisciplineCreateWithoutArticleInput, ArticleDisciplineUncheckedCreateWithoutArticleInput>
  }

  export type ArticleDisciplineCreateManyArticleInputEnvelope = {
    data: ArticleDisciplineCreateManyArticleInput | ArticleDisciplineCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutArticleInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
    resource?: ResourceCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutArticleInput = {
    id?: string
    userId: string
    resourceId?: string | null
    createdAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutArticleInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutArticleInput, BookmarkUncheckedCreateWithoutArticleInput>
  }

  export type BookmarkCreateManyArticleInputEnvelope = {
    data: BookmarkCreateManyArticleInput | BookmarkCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type SourceUpsertWithoutArticlesInput = {
    update: XOR<SourceUpdateWithoutArticlesInput, SourceUncheckedUpdateWithoutArticlesInput>
    create: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
    where?: SourceWhereInput
  }

  export type SourceUpdateToOneWithWhereWithoutArticlesInput = {
    where?: SourceWhereInput
    data: XOR<SourceUpdateWithoutArticlesInput, SourceUncheckedUpdateWithoutArticlesInput>
  }

  export type SourceUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleDisciplineUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleDisciplineWhereUniqueInput
    update: XOR<ArticleDisciplineUpdateWithoutArticleInput, ArticleDisciplineUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleDisciplineCreateWithoutArticleInput, ArticleDisciplineUncheckedCreateWithoutArticleInput>
  }

  export type ArticleDisciplineUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleDisciplineWhereUniqueInput
    data: XOR<ArticleDisciplineUpdateWithoutArticleInput, ArticleDisciplineUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleDisciplineUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleDisciplineScalarWhereInput
    data: XOR<ArticleDisciplineUpdateManyMutationInput, ArticleDisciplineUncheckedUpdateManyWithoutArticleInput>
  }

  export type BookmarkUpsertWithWhereUniqueWithoutArticleInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutArticleInput, BookmarkUncheckedUpdateWithoutArticleInput>
    create: XOR<BookmarkCreateWithoutArticleInput, BookmarkUncheckedCreateWithoutArticleInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutArticleInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutArticleInput, BookmarkUncheckedUpdateWithoutArticleInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutArticleInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleCreateWithoutSourceInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    disciplines?: ArticleDisciplineCreateNestedManyWithoutArticleInput
    bookmarks?: BookmarkCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutSourceInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    disciplines?: ArticleDisciplineUncheckedCreateNestedManyWithoutArticleInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutSourceInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput>
  }

  export type ArticleCreateManySourceInputEnvelope = {
    data: ArticleCreateManySourceInput | ArticleCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type ArticleUpsertWithWhereUniqueWithoutSourceInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutSourceInput, ArticleUncheckedUpdateWithoutSourceInput>
    create: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutSourceInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutSourceInput, ArticleUncheckedUpdateWithoutSourceInput>
  }

  export type ArticleUpdateManyWithWhereWithoutSourceInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutSourceInput>
  }

  export type ArticleScalarWhereInput = {
    AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    OR?: ArticleScalarWhereInput[]
    NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    url?: StringFilter<"Article"> | string
    excerpt?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    sourceId?: StringNullableFilter<"Article"> | string | null
  }

  export type CategoryCreateWithoutResourcesInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    color?: string | null
  }

  export type CategoryUncheckedCreateWithoutResourcesInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    color?: string | null
  }

  export type CategoryCreateOrConnectWithoutResourcesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutResourcesInput, CategoryUncheckedCreateWithoutResourcesInput>
  }

  export type BookmarkCreateWithoutResourceInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarksInput
    article?: ArticleCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutResourceInput = {
    id?: string
    userId: string
    articleId?: string | null
    createdAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutResourceInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutResourceInput, BookmarkUncheckedCreateWithoutResourceInput>
  }

  export type BookmarkCreateManyResourceInputEnvelope = {
    data: BookmarkCreateManyResourceInput | BookmarkCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutResourcesInput = {
    update: XOR<CategoryUpdateWithoutResourcesInput, CategoryUncheckedUpdateWithoutResourcesInput>
    create: XOR<CategoryCreateWithoutResourcesInput, CategoryUncheckedCreateWithoutResourcesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutResourcesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutResourcesInput, CategoryUncheckedUpdateWithoutResourcesInput>
  }

  export type CategoryUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryUncheckedUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BookmarkUpsertWithWhereUniqueWithoutResourceInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutResourceInput, BookmarkUncheckedUpdateWithoutResourceInput>
    create: XOR<BookmarkCreateWithoutResourceInput, BookmarkUncheckedCreateWithoutResourceInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutResourceInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutResourceInput, BookmarkUncheckedUpdateWithoutResourceInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutResourceInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutResourceInput>
  }

  export type ResourceCreateWithoutCategoryInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    bookmarks?: BookmarkCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutCategoryInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutCategoryInput, ResourceUncheckedCreateWithoutCategoryInput>
  }

  export type ResourceCreateManyCategoryInputEnvelope = {
    data: ResourceCreateManyCategoryInput | ResourceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ResourceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ResourceWhereUniqueInput
    update: XOR<ResourceUpdateWithoutCategoryInput, ResourceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ResourceCreateWithoutCategoryInput, ResourceUncheckedCreateWithoutCategoryInput>
  }

  export type ResourceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ResourceWhereUniqueInput
    data: XOR<ResourceUpdateWithoutCategoryInput, ResourceUncheckedUpdateWithoutCategoryInput>
  }

  export type ResourceUpdateManyWithWhereWithoutCategoryInput = {
    where: ResourceScalarWhereInput
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ResourceScalarWhereInput = {
    AND?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    OR?: ResourceScalarWhereInput[]
    NOT?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    id?: StringFilter<"Resource"> | string
    name?: StringFilter<"Resource"> | string
    url?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    pricing?: EnumPricingFilter<"Resource"> | $Enums.Pricing
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    logoLetter?: StringNullableFilter<"Resource"> | string | null
    logoColor?: StringNullableFilter<"Resource"> | string | null
    categoryId?: StringFilter<"Resource"> | string
  }

  export type UserCreateWithoutBookmarksInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    preferences?: UserDisciplineCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookmarksInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    preferences?: UserDisciplineUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookmarksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
  }

  export type ArticleCreateWithoutBookmarksInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    source?: SourceCreateNestedOneWithoutArticlesInput
    disciplines?: ArticleDisciplineCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutBookmarksInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
    sourceId?: string | null
    disciplines?: ArticleDisciplineUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutBookmarksInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutBookmarksInput, ArticleUncheckedCreateWithoutBookmarksInput>
  }

  export type ResourceCreateWithoutBookmarksInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    category: CategoryCreateNestedOneWithoutResourcesInput
  }

  export type ResourceUncheckedCreateWithoutBookmarksInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
    categoryId: string
  }

  export type ResourceCreateOrConnectWithoutBookmarksInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutBookmarksInput, ResourceUncheckedCreateWithoutBookmarksInput>
  }

  export type UserUpsertWithoutBookmarksInput = {
    update: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
    create: XOR<UserCreateWithoutBookmarksInput, UserUncheckedCreateWithoutBookmarksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookmarksInput, UserUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: UserDisciplineUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preferences?: UserDisciplineUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleUpsertWithoutBookmarksInput = {
    update: XOR<ArticleUpdateWithoutBookmarksInput, ArticleUncheckedUpdateWithoutBookmarksInput>
    create: XOR<ArticleCreateWithoutBookmarksInput, ArticleUncheckedCreateWithoutBookmarksInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutBookmarksInput, ArticleUncheckedUpdateWithoutBookmarksInput>
  }

  export type ArticleUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    source?: SourceUpdateOneWithoutArticlesNestedInput
    disciplines?: ArticleDisciplineUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    disciplines?: ArticleDisciplineUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ResourceUpsertWithoutBookmarksInput = {
    update: XOR<ResourceUpdateWithoutBookmarksInput, ResourceUncheckedUpdateWithoutBookmarksInput>
    create: XOR<ResourceCreateWithoutBookmarksInput, ResourceUncheckedCreateWithoutBookmarksInput>
    where?: ResourceWhereInput
  }

  export type ResourceUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: ResourceWhereInput
    data: XOR<ResourceUpdateWithoutBookmarksInput, ResourceUncheckedUpdateWithoutBookmarksInput>
  }

  export type ResourceUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutResourcesNestedInput
  }

  export type ResourceUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPreferencesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPreferencesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
  }

  export type DisciplineCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    articles?: ArticleDisciplineCreateNestedManyWithoutDisciplineInput
  }

  export type DisciplineUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    articles?: ArticleDisciplineUncheckedCreateNestedManyWithoutDisciplineInput
  }

  export type DisciplineCreateOrConnectWithoutUsersInput = {
    where: DisciplineWhereUniqueInput
    create: XOR<DisciplineCreateWithoutUsersInput, DisciplineUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutPreferencesInput = {
    update: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type UserUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DisciplineUpsertWithoutUsersInput = {
    update: XOR<DisciplineUpdateWithoutUsersInput, DisciplineUncheckedUpdateWithoutUsersInput>
    create: XOR<DisciplineCreateWithoutUsersInput, DisciplineUncheckedCreateWithoutUsersInput>
    where?: DisciplineWhereInput
  }

  export type DisciplineUpdateToOneWithWhereWithoutUsersInput = {
    where?: DisciplineWhereInput
    data: XOR<DisciplineUpdateWithoutUsersInput, DisciplineUncheckedUpdateWithoutUsersInput>
  }

  export type DisciplineUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articles?: ArticleDisciplineUpdateManyWithoutDisciplineNestedInput
  }

  export type DisciplineUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articles?: ArticleDisciplineUncheckedUpdateManyWithoutDisciplineNestedInput
  }

  export type BookmarkCreateManyUserInput = {
    id?: string
    articleId?: string | null
    resourceId?: string | null
    createdAt?: Date | string
  }

  export type UserDisciplineCreateManyUserInput = {
    id?: string
    disciplineId: string
  }

  export type BookmarkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneWithoutBookmarksNestedInput
    resource?: ResourceUpdateOneWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDisciplineUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    discipline?: DisciplineUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserDisciplineUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDisciplineUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineCreateManyDisciplineInput = {
    id?: string
    articleId: string
  }

  export type UserDisciplineCreateManyDisciplineInput = {
    id?: string
    userId: string
  }

  export type ArticleDisciplineUpdateWithoutDisciplineInput = {
    id?: StringFieldUpdateOperationsInput | string
    article?: ArticleUpdateOneRequiredWithoutDisciplinesNestedInput
  }

  export type ArticleDisciplineUncheckedUpdateWithoutDisciplineInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineUncheckedUpdateManyWithoutDisciplineInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDisciplineUpdateWithoutDisciplineInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type UserDisciplineUncheckedUpdateWithoutDisciplineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDisciplineUncheckedUpdateManyWithoutDisciplineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineCreateManyArticleInput = {
    id?: string
    disciplineId: string
  }

  export type BookmarkCreateManyArticleInput = {
    id?: string
    userId: string
    resourceId?: string | null
    createdAt?: Date | string
  }

  export type ArticleDisciplineUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    discipline?: DisciplineUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleDisciplineUncheckedUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleDisciplineUncheckedUpdateManyWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    disciplineId?: StringFieldUpdateOperationsInput | string
  }

  export type BookmarkUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
    resource?: ResourceUpdateOneWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateManySourceInput = {
    id?: string
    title: string
    url: string
    excerpt?: string | null
    publishedAt?: Date | string | null
  }

  export type ArticleUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disciplines?: ArticleDisciplineUpdateManyWithoutArticleNestedInput
    bookmarks?: BookmarkUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    disciplines?: ArticleDisciplineUncheckedUpdateManyWithoutArticleNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookmarkCreateManyResourceInput = {
    id?: string
    userId: string
    articleId?: string | null
    createdAt?: Date | string
  }

  export type BookmarkUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarksNestedInput
    article?: ArticleUpdateOneWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    articleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceCreateManyCategoryInput = {
    id?: string
    name: string
    url: string
    description?: string | null
    pricing: $Enums.Pricing
    createdAt?: Date | string
    logoLetter?: string | null
    logoColor?: string | null
  }

  export type ResourceUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks?: BookmarkUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks?: BookmarkUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    pricing?: EnumPricingFieldUpdateOperationsInput | $Enums.Pricing
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logoLetter?: NullableStringFieldUpdateOperationsInput | string | null
    logoColor?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}