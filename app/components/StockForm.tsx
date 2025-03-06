// app/components/StockForm.tsx
"use client";
import { useState, useEffect } from "react";

interface StockFormProps {
  onSubmit: (symbol: string) => void;
}

// Define the type for suggestions.
interface StockSuggestion {
  symbol: string;
  shortname?: string;
  longname?: string;
}

const StockForm: React.FC<StockFormProps> = ({ onSubmit }) => {
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Fetch suggestions as the user types (with debouncing)
  useEffect(() => {
    if (symbol.trim().length > 0) {
      const timer = setTimeout(() => {
        fetch(`/api/search/${symbol}`)
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data);
            setIsDropdownVisible(true);
          })
          .catch((error) =>
            console.error("Error fetching suggestions:", error)
          );
      }, 300); // 300ms debounce delay

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  }, [symbol]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSubmit(symbol.trim().toUpperCase());
      setIsDropdownVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion: StockSuggestion) => {
    setSymbol(suggestion.symbol);
    setSuggestions([]);
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="stock-form">
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="stock-input"
        />
        <button type="submit" className="stock-button">
          Get Trend
        </button>
      </form>

      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="dropdown">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.symbol}
              onClick={() => handleSuggestionClick(suggestion)}
              className="dropdown-item"
            >
              {suggestion.symbol} -{" "}
              {suggestion.shortname || suggestion.longname || "No Name"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockForm;
