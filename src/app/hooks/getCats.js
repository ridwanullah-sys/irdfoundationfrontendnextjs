import { useState } from "react";

const GetCats = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCats = async () => {
    setLoading(true);
    setError(null);
    console.log("Fetching ....");
    const res = await fetch("getCats");
    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    } else {
      const Cats = await res.json();
      setLoading(false);
      return Cats;
    }
  };

  return { getCats, error, loading };
};

export default GetCats;
