import express from "express";
import cors from 'cors'
import axios from 'axios'

const PORT = 4000;
const API_KEY =
"*your api key*";

const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
    const query = req.query;

    try {
        const response = await axios.get("https://serpapi.com/search.json", {
          params: {
            q: query,
            engine: "google",
            google_domain: "google.com.br",
            api_key: API_KEY,
            hl: "pt-br",
            gl: "br",
            num: 10,
          },
        });
        res.json(response.data)
    } catch (err) {
        res.status(500).json({error: "Erro ao fazer a requisição à API"})
    }
})

app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`)
})
