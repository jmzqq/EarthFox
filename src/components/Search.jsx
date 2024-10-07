import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import EarthFox from "../assets/earthfox_logo.png";
import "../App.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const URL = "https;//serpapi.com/search.json";
  const API_KEY =
    "3d6630aab4a10b256e438863fe496beb3d9d140fe74e0f3aabbfed36bc924bda";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query) {
      return;
    }

    setError("");
    setLoading(true);
    try {
      const URL = "http://localhost:4000/search";
      const res = await axios.get(URL, {
        params: {
          query: query,
        },
      });
      const data = res.data.organic_results || [];
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Aconteceu um erro ao tentar fazer a busca.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="Logo">
        <h1>Earthfox</h1>
        <img src={EarthFox} alt="" />
      </div>
      <div className="Input">
        <form onSubmit={handleSubmit}>
          <input
            className="Search-input"
            type="text"
            placeholder="Pesquise com Google ou digite um endereço"
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
        <div>
          {error ? (
            <h4>{error}</h4>
          ) : loading ? (
            <h4>Carregando...</h4>
          ) : (
            <ul className="Resultado">
              {results.map((r, index) => {
                return (
                  <li className="ul__link" key={index}>
                    <a
                      className="a__link"
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {r.title}
                    </a>
                    <p>{r.snippet}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
