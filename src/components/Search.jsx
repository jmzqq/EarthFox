import axios from "axios";
import { useState } from "react";
import EarthFox from "../assets/earthfox_logo.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  
  const URL = "https;//serpapi.com/search.json";
  const API_KEY =
    "3d6630aab4a10b256e438863fe496beb3d9d140fe74e0f3aabbfed36bc924bda";
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get(URL, {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          h1: "pt-br",
          gl: "br",
          num: 10,
        }
      })
      const data = await res.json();
      setResults(data);
    }catch (err) {
      console.error(err);
      setError("Aconteceu um erro ao tentar fazer a busca.")
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
            placeholder="O que você está procurando?"
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
