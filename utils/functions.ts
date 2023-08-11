import { checkType } from "@/utils/validations";

/** GET DATA **/
// simple way to call getProperty for API Data (ApiDataConfig) 
export const getData = (data: any, key: ApiDataConfig) => {
    const prop = getProperty(data, key.value);
    if (checkType(prop, key.type)) {
        return prop;
    }
}

export const getDataProp = (data: any, key: string, type: string = 'string') => {
    const prop = getProperty(data, key);
    if (checkType(prop, type)) {
        return prop;
    }
}


/** GET PROPERTY **/

// the function getProperty() is used to to create a property lookup for an object
// object   -> your object (it can include arrays as well)
// property -> the property you want to reference to (as a string)

// example object: myObj; property: 'categories[0].product_name'
// this will return myObj.categories[0].product_name
const getProperty = (object: any, property: string) => {
    if (!object) return undefined;

    // get all properties and save it in an array (turns [0] to its own property '0')
    const properties = property.split(/\.|\[(\d+)\]/).filter(Boolean);
    let result = object;

    for (const prop of properties) {
        if (Array.isArray(result) && /^\d+$/.test(prop)) { // 1. check if result is an Array 2. check if prop is a number
            // Handle exception for Array lookups (example: [0])
            const index = parseInt(prop, 10); // parse prop to number using 10=decimal
            if (index >= 0 && index < result.length) { // make sure it's a real number
                // do a lookup and overwrite current lookup variable
                result = result[index];
            } else {
                result = undefined;
                break;
            }
        } else {
            // do a lookup for the current result and overwrite result variable
            result = result[prop];
        }

        if (result === undefined) break;
    }

    return result;
};


/** SANITIZE **/

// chatGPT magic here -> basically it loops through the object and sanitizes each array
export const sanitizeData = (data: { [key: string]: any }) => {
    return Object.keys(data).reduce((acc: Record<string, any>, key: string) => {
        acc[key] = recursiveSanitizeData(data[key]);
        return acc;
    }, {});
};

const recursiveSanitizeData = (data: any): any => {
    if (typeof data === 'string') {
        return sanitizeString(data);
    } else if (Array.isArray(data)) {
        return data.map(item => recursiveSanitizeData(item));
    } else if (typeof data === 'object') {
        return sanitizeData(data);
    } else {
        return data;
    }
};

const sanitizeString = (string: string): string => {
    string = string
        .replace('&', '&amp;')
        .replace('>', '&gt;')
        .replace('<', '&lt;');
    return string;
}