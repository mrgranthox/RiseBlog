import { createContext, useEffect, useState, useCallback, useContext } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { NetworkContext } from "../utils/NetworkStatus";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // Use the NetworkContext to get network status
  const { isOnline } = useContext(NetworkContext);
  
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [getPostByUser, setGetPostByUser] = useState([])
  const [allUsers, setAllUsers] = useState(null);
  const [postLists, setPostLists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkReady, setNetworkReady] = useState(false);


  
  // Update networkReady when isOnline changes
  useEffect(() => {
    setNetworkReady(isOnline);
  }, [isOnline]);

  // Enhanced exponentialBackoff that uses safeRequest
const exponentialBackoff = async (fn, retries = 1, delay = 100) => {
  return safeRequest(async () => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && navigator.onLine) { // Only retry if browser reports online
        toast.log(`Retrying in ${delay}ms... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return exponentialBackoff(fn, retries - 1, delay * 1); // Exponential backoff
      }
      throw error; // After retries are exhausted, throw the error
    }
  });
};

  // Fetch Data
  const fetchData = useCallback(async () => {
    try {
      // Retry fetching users and posts with exponential backoff
      await Promise.all([
        exponentialBackoff(getAllUsers),
        exponentialBackoff(getAllPost)
      ]);
    } catch (error) {
      toast.error("Failed to fetch data after multiple retries", error);
      toast.error("Unable to fetch data. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies to avoid infinite loops

  const getAllUsers = async () => {
    const { data } = await axiosInstance.get("/auth/user/users");
    if (data.success) {
      setAllUsers(data.userLists);
    } else {
      throw new Error(data.message);
    }
  };

  const getAllPost = async () => {
    const { data } = await axiosInstance.get("/post/posts");
    if (data.success) {
      setPostLists(data.postLists);
    } else {
      throw new Error(data.message);
    }
  };

  
  const postByUser = async () => {
    try {
      const response = await axiosInstance.get('/post/user-posts');
 
     setGetPostByUser(response.data.postDataByUser); 
     console.log(getPostByUser)
  
    } catch (error) {
      console.error("Error fetching posts by user:", error);
      throw error;
    }
  };
  
  const getUserData = async () => {
    const { data } = await axiosInstance.get("/auth/user/data");
    if (data.success) {
      setUserData(data.userData);
    } else {
      throw new Error(data.message);
    }
  };

  // Authentication check with retries
  const checkAuthStatus = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/user/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        await postByUser();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch {
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  // Effect for checking network and triggering data load
  useEffect(() => {
    if (networkReady) {
      fetchData();
      checkAuthStatus();
    }
  }, [networkReady]); // Removed fetchData from dependency array, included checkAuthStatus


  // Add this to AppContextProvider
const safeRequest = async (requestFn) => {
  // Set a safety timeout to reset loading state
  const safetyTimeout = setTimeout(() => {
    if (loading) {
      console.log("Request taking too long, resetting loading state");
      setLoading(false);
    }
  }, 10000); // 15 seconds safety timeout
  
  try {
    return await requestFn();
  } catch (error) {
    // Handle network errors
    console.error("Request failed:", error);
    throw error;
  } finally {
    clearTimeout(safetyTimeout);
  }
};
  
  const value = {
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    backendurl,
    loading,
    setLoading,
    postLists,
    allUsers,
    setAllUsers,
    networkReady,
    fetchData,
    getUserData,
    getAllUsers,
    getAllPost,
    postByUser,
    getPostByUser
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;