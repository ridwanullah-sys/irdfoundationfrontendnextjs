import { useState } from "react";

const GetSubCats = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSubCats = async (id) => {
    setLoading(true);
    setError(null);
    console.log("Fetching ....");
    const res = await fetch(`getSubcatsByCat/${id}`);
    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    } else {
      const subCats = await res.json();
      setLoading(false);
      return subCats;
    }
  };

  return { getSubCats, error, loading };
};

export default GetSubCats;
