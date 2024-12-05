import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY;

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-r7XhwMQMRquu3jyvdmquxNH9",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoins();
    const updateCoins = setInterval(() => {
      setDisplayCoins(allCoins);
      // alert("Hellow");
    }, 10000);
    return () => clearInterval(updateCoins);
  }, [currency]);

  const contextValue = {
    allCoins,
    setAllCoins,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinContextProvider;
