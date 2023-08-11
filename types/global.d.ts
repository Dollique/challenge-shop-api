// type interfaces

// keep in mind that interfaces are only for development purposes and are not checked at runtime
// to make sure your types are correct on runtime use type guards.
// see: utils/validations.ts

// actual type for the data that is fetched
interface ProductArray extends Array<ProductData> { }

// Filter
interface FilterObject {
    // color: 'blue'
    [key: string]: string
};

// Configuration Types
interface ApiDataConfig {
    value: string,
    type: string
}
interface ProductConfig {
    name: ApiDataConfig,
    id: ApiDataConfig,
    img_url: ApiDataConfig,
    description: array<ApiDataConfig>
};

interface FilterConfig {
    name: string,
    key: string,
    type: string // type of the filter value
}