// We're importing values from a config.json incase the values change.
// For example, when we're testing the frontend with dummy data from our
// mock server, we'd want to change the API endpoint to be set as
// 'localhost:8080' or something similar.
import {playerRegister} from './config.json'
import {playerLogin} from './config.json'
import handleFetch from './fetchWrapper'

// We aren't exporting this function because it's just for use in this file.
// The underscore can indicate that it's internal too (just convention though)
// async is because the `fetch` command is async and any function that 
// has `await` in it requires the function to have `async` added to it.
const _handlePlayerRegister = async(email, password) => {
    // The reason we're "not assigning values" is because the name of the property is the 
    // same as the variable that has the value for it in it. 
    const body = {
        email: email,
        password: password
    }
    const response = await handleFetch("/api/signup", body, 'POST')
    
    // If the request returns an error, it'll throw (python raise exception equivalent) 
    // the error text instead of trying to get the response body (Most likely because
    // it doesn't exist)
    if(!response.ok) {
        throw response.statusText
    } 
    
    // Otherwise, it'll return the response body
    const data = await response.json()
    return data;
}

const _handlePlayerLogin = async (email, password) => {
    const body = {
        email: email,
        password: password
    }
    const response = await handleFetch("/api/login", body, 'POST')

    if(!response.ok) {
        throw response.statusText
    } 
    
    // Otherwise, it'll return the response body
    const data = await response.json()
    return data;
}

const _handlePlayerSettings = async (email, nickname, password) => {
    const body = {
        email: email,
        nickname: nickname,
        password: password
    }
    const response = await handleFetch("/api/settings", body, 'POST')

    if(!response.ok) {
        throw response.statusText
    } 
    
    // Otherwise, it'll return the response body
    const data = await response.json()
    return data;
}

// export is so that we can access the function from other js files. 
export const player_Register = async(email, password) => {
    // We put this in a try catch because `handlePlayerRegister` could throw an error 
    // and we want to catch it.
    try{
        const message = _handlePlayerRegister(email, password)
        // Wherever we call this function, if it worked, we want to know, so we can
        // display meaningful UI. Doesn't need to be a boolean, but makes sense here
        console.log('Player register message: ' + message)
        return message;
    }
    catch(errorMsg){
        // This will show an error in the browser console, we might not want this in 
        // production, but we can keep it for testing and debugging
        console.error('Could not register player due to the following error: ' + errorMsg);

        // It may be that you'd want to do more processing, and return a specific string 
        // instead of just `false` indicating why `playerRegister` didn't work, so that 
        // you can show it in an error component on the display.
        return false;
    }
}

export const player_Login = async(email, password) => {
    // We put this in a try catch because `handlePlayerRegister` could throw an error 
    // and we want to catch it.
    try{
        const message = _handlePlayerLogin(email, password)
        // Wherever we call this function, if it worked, we want to know, so we can
        // display meaningful UI. Doesn't need to be a boolean, but makes sense here
        console.log('Player Login message: ' + message)
        return message;
    }
    catch(errorMsg){
        console.error('Could not register player due to the following error: ' + errorMsg);
        return false;
    }
}

export const player_Settings = async(email, nickname, password) => {
    // We put this in a try catch because `handlePlayerRegister` could throw an error 
    // and we want to catch it.
    try{
        const message = _handlePlayerSettings(email, nickname, password)
        // Wherever we call this function, if it worked, we want to know, so we can
        // display meaningful UI. Doesn't need to be a boolean, but makes sense here
        console.log('Player Settings message: ' + message)
        return message;
    }
    catch(errorMsg){
        console.error('Could not change the player settings due to the following error: ' + errorMsg);
        return false;
    }
}