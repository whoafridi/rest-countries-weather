import React, { useState } from "react";
import Button from "@mui/material/Button";

const SearchInput = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter country"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        variant="contained"
        type="submit"
        style={{ margin: 5 }}
        disabled={!input}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchInput;
