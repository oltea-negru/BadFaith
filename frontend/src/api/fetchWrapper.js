import {apiEndpoint} from './config.json'
const handleFetch = async(route, body, requestType, headers={}) => {
    headers['Content-Type'] = 'application/json'
    headers['x-functions-key'] = process.env['APP_KEY']

    // fetch is like the `requests.` function in our python tests for azure
    return fetch(apiEndpoint + route, {
        method: requestType,
        headers,
        body: JSON.stringify(body)
    })
}

// Export this function as a default means that we don't need to add the `{}` 
// around the import in other files.
export default handleFetch;