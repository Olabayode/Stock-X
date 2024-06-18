import axios from 'axios'

const mySecret = import.meta.env.VITE_API_TOKEN

console.log(mySecret);

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: mySecret
  }
}) 