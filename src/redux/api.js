import axios from 'axios';

let instance = axios.create({
  baseURL: 'https://sheffchenk0.github.io/react-pizza/db.json',
});
console.log('https://sheffchenk0.github.io/react-pizza/db.json');
export const API = {
  getPizzas() {
    return instance.get().then((response) => response.data);
  },
};
