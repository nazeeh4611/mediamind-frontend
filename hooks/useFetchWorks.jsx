import { useState, useCallback } from 'react';
import axios from 'axios';
import baseurl from '../base/base';

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(new Error(err.response?.data?.message || err.message)),
);

export const useFetchWorks = () => {
  const [recentWorks, setRecentWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);

  const fetchWorks = useCallback(async () => {
    try {
      const data = await api.get('/works', { params: { limit: 6 } });
      const list = Array.isArray(data?.works) ? data.works : Array.isArray(data) ? data : [];
      setRecentWorks(list.slice(0, 6).map(w => ({
        ...w,
        tags: Array.isArray(w.tags) ? w.tags : [],
        image: w.featuredImage?.url || w.image || null,
        _id: w._id || w.id,
      })));
    } catch {
      setRecentWorks([]);
    } finally {
      setLoadingWorks(false);
    }
  }, []);

  return { recentWorks, loadingWorks, fetchWorks };
};