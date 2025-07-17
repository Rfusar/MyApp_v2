import axios from 'axios';

//TODO aggiungere gestione APIKEY

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    //Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export default apiClient;
