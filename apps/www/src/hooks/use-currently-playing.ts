// SWR
import useSWR from 'swr';

// Fetcher function
const fetcher = (url:any) => fetch(url).then(res => res.json());

// Hook
const useCurrentlyPlaying = () => {
  // fetch data from /spotify endpoint, no need for access token
  const { data, error } = useSWR('/spotify', fetcher);

  // Return
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useCurrentlyPlaying };
