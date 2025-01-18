import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinners from "./Spinners";

type QuoteData = {
  quote: string;
  author: string;
};

const QuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_QUOTE_URL;

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<QuoteData>(API_URL);
      const quoteData = {
        quote: response.data.quote,
        author: response.data.author,
      };
      setQuote(quoteData);
    } catch (err) {
      setError(`Error with quote ${err}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded-lg w-full md:w-[80%] text-center">
        <h1 className="text-2xl font-bold mb-4">Random Quote Generator</h1>
        {loading && (
          <div className="w-full animate-pulse">
            <div className="h-6 bg-gray-300 rounded-md mb-4"></div>{" "}
            <div className="h-4 bg-gray-300 rounded-md w-1/3 mx-auto"></div>{" "}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && quote && (
          <div className="w-full">
            <p className="text-lg italic text-gray-700">"{quote.quote}"</p>
            <p className="text-center mt-4 text-sm font-medium text-gray-500">
              - {quote.author || "Unknown"}
            </p>
          </div>
        )}
        <button
          onClick={fetchRandomQuote}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? <Spinners color="white" /> : "New Quote"}
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
