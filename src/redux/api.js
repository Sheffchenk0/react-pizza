import axios from 'axios';

let instance = axios.create({
  baseURL: 'http://localhost:3000/db.json',
});

export const API = {
  getPizzas() {
    return instance.get().then((response) => response.data);
  },
};
