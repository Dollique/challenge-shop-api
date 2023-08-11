/** API CONFIG RULES **/
// you can include the path directly in the string like so: categories[0].category_url_path


/** Product **/
/* objects */
// value    ->  value fetched from data source
// type     ->  type of this value from the data source (used for type guards)
//              please make sure the types here are equal to the API interface in types/api.d.ts

/* items */
// name         -> product name
// id           -> unique id (lowercase)
// img_url      -> src of image
// description  -> array of properties that will be shown in the description
const productConfig: ProductConfig = {
    name: { value: "title", type: 'string' },
    id: { value: "id", type: 'number' },
    img_url: { value: "images[0]", type: 'string' },
    description: [
        { value: "title", type: 'string' },
        { value: "brand", type: 'string' },
        { value: "description", type: 'string' },
        { value: "price", type: 'number' },
    ],
};

export { productConfig }


/** Filter **/
// name -> lowercase name
// key  -> name of the api key which is used for the filter
// type -> TypeScript guard to check the filter type
const filterConfig: FilterConfig[] = [
    {
        name: "Category",
        key: "category",
        type: "string",
    },
    { name: "Brand", key: "brand", type: "string" },
];

export { filterConfig }