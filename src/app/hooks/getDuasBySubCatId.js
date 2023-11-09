import { useState } from "react";

const GetDuasByCats = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDuas = async (id) => {
    setLoading(true);
    setError(null);
    console.log("Fetching ....");
    const res = await fetch(`getDuasBySubcat/${id}`);
    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    } else {
      const duas = await res.json();
      setLoading(false);
      return duas;
    }
  };

  return { getDuas, error, loading };
};

export default GetDuasByCats;
