import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetchDetail = (endpoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const FetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }, [endpoint]);

  useEffect(() => {
    FetchData();
  }, [FetchData]);
  return { data, loading };
};

export default useFetchDetail;
