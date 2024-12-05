import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchedCoin = await allCoins.filter((coin) => {
      return coin.name.includes(input);
    });
    setDisplayCoins(searchedCoin);
  };

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Market Tracking Place.
        </h1>
        <p>
          Welcome! To the world's largest crypto currency market tracking place.
          SignUp to explore more about cryptos coins.
        </p>
        <form onSubmit={handleSearch}>
          <input
            onChange={handleInputChange}
            value={input}
            list="coinsList"
            type="text"
            placeholder="Search Coin..."
            required
          />
          <datalist id="coinsList">
            {allCoins.map((coin, idx) => (
              <option key={idx} value={coin.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h %</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoins.slice(0, 10).map((coin, idx) => (
          <Link to={`/coin/${coin.id}`} className="table-layout" key={idx}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <img src={coin.image} alt="Coin Image" />
              <p>{coin.name + " - " + coin.symbol}</p>
            </div>
            <p>
              {currency.symbol} {coin.current_price.toLocaleString()}
            </p>
            <p
              className={coin.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(coin.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {coin.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
