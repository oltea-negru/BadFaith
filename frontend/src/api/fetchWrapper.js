import {apiEndpoint} from './config.json'

/**
 * Wrapper for the fetch function. Provide the input body, route, request type, 
 * and any optional headers, and it will run the fetch command using those parameters.
 * @param {string} route The route after the api endpoint you want to send the request to, e.g. 
 * '/player/register/'
 * @param {Object} body Object for the body you want to send with your request
 * @param {string} requestType Request method - POST/GET/etc
 * @param {Object} headers Any extra optional header values you want to add
 * @returns 
 */
const handleFetch = async(route, body, requestType, headers={}) => {
    headers['Content-Type'] = 'application/json'
    headers['x-functions-key'] = process.env['APP_KEY']

    // fetch is like the `requests.` function in our python tests for azure
    return fetch("https://badfaith2.azurewebsites.net" + route, {
        method: requestType,
        headers,
        body: JSON.stringify(body)
    })
}

// Export this function as a default means that we don't need to add the `{}` 
// around the import in other files.
export default handleFetch;