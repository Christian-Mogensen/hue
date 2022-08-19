import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      "http://192.168.8.100/api/vah3R1fcYAqBxF2XxRvyMT9v3fjgvqbtiWFtH9Tg/groups"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);

  return { data };
};
export default useFetchData;
