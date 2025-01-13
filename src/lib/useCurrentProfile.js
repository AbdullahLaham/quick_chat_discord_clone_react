import { useState, useEffect } from "react";

export function useCurrentProfile() {
  const [profile, setProfile] = useState(null);  // Profile data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    // Fetch token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    // Fetch profile data using the token
    const fetchProfile = async () => {
      try {

        const response = await axios.get('/api/user/current-user', {
            headers: {
                authorization: `Bearer ${token}`,  // Use the token in the Authorization header
            },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }

        const data = await response.json();
        setProfile(data);  // Set profile data if request is successful
      } catch (err) {
        setError(err.message);  // Set error if request fails
      } finally {
        setLoading(false);  // Set loading to false once request completes
      }
    };

    fetchProfile();
  }, []);  // Empty dependency array so this effect only runs once when the component mounts

  return { profile, loading, error };
}
