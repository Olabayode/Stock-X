import axios from 'axios'


const TOKEN = "cfv0sp1r01qtdvl3ggj0cfv0sp1r01qtdvl3ggjg"
const mySecret = import.meta.env.VITE_API_TOKEN

console.log(mySecret);

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: mySecret
  }
}) 