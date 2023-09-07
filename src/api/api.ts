import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.spoonacular.com/',
    headers: {
        'Content-Type': 'application/json',

    }
})

export const API_KEY = "6755dfcb759445638822e1bc1649ed09";