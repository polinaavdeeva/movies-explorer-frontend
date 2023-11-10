import { useState } from "react";

export default function useSearchForm() {
  const [word, setWord] = useState("");
  const [isShort, setIsShort] = useState(false);

  function handleShortChange(e) {
    setIsShort(() => (e.target.checked))
  }

  function handleChange(e) {
    setWord(() => (e.target.value))
  }

  return {word, setWord, isShort, setIsShort, handleChange, handleShortChange}
}
