import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.spoonacular.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiBase = axios.create({
  baseURL: 'https://spoonacular.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const API_KEY = '6755dfcb759445638822e1bc1649ed09';
// export const API_KEY = 'b585b1a0e24e4141bde8c645fdb3362a';
// export const API_KEY = '2ac27bef82c74aebaf5570acca053060';
// export const API_KEY = '6b504bdada48476d8b3c63f755ceca3d';
// export const API_KEY = 'e29c11e8d950418a813b6511916b292b';
// export const API_KEY = 'c4c96f58049e4dc89f038e2503edee89';


// export const API_KEY = 'fe6c2d84686842f9af715566ad95611d';
export const API_KEY = '81ed55ec527548798517b062b7106e14';
// export const API_KEY = 'd42e2eb08606422ab6edda9934578d59';