import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
const API = axios.create({ baseURL: "http://localhost:4000" });
// const API = axios.create({baseURL:'https://mini-server-mlxr.onrender.com'})

export const User = {
  id: "",
  name: "",
  username: "",
  type: "local" | "twitter"
};

export function useMeQuery() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    API
      .get(`/me`, {
        withCredentials: true,
      })
      .then((v) => {
        if (v.data) setData(v.data);
      })
      .catch(() => setError("Not Authenticated"))
      .finally(() => setLoading(false));
  }, []);

  return { error, data, loading };
}