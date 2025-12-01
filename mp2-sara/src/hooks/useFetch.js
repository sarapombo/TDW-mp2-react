import { useState, useEffect } from "react";

export default function useFetch(url, options = {}, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(url, options)
      .then(res => res.json())
      .then(json => { if(!ignore) setData(json); })
      .catch(err => { if(!ignore) setError(err); })
      .finally(()=> { if(!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, deps);

  return { data, loading, error };
}
