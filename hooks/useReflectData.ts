import { useState, useEffect, useCallback } from 'react';
import { reflectApi, Core, System } from '@/lib/api';

interface UseReflectDataResult {
  cores: Core[];
  systems: System[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useReflectData(pollingInterval: number = 30000): UseReflectDataResult {
  const [cores, setCores] = useState<Core[]>([]);
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      // Fetch both endpoints in parallel
      const [coresData, systemsData] = await Promise.all([
        reflectApi.getCores(),
        reflectApi.getSystems(),
      ]);

      setCores(coresData);
      setSystems(systemsData);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling
    const intervalId = setInterval(fetchData, pollingInterval);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchData, pollingInterval]);

  return {
    cores,
    systems,
    loading,
    error,
    lastUpdated,
    refresh,
  };
}