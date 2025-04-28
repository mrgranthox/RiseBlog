import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../axiosInstance";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [getPostByUser, setGetPostByUser] = useState([]);
  const [allUsers, setAllUsers] = useState(null);
  const [postLists, setPostLists] = useState(null);
  const [loading, setLoading] = useState(true);

  // Improved safeRequest function
  const safeRequest = async (requestFn) => {
    try {
      return await requestFn(); // Execute the request
    } catch (error) {
      console.error("Request failed:", error); // Log error for debugging
      throw error; // Rethrow to be caught in retry logic
    }
  };

  // Improved exponential backoff with retries
  const exponentialBackoff = async (fn, retries = 5, delay = 15000) => {
    try {
      return await safeRequest(fn);
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay)); // Delay retry
        return exponentialBackoff(fn, retries - 1, delay * 2); // Retry with longer delay
      }
      throw error; // Rethrow after all retries are exhausted
    }
  };

  // Fetch data function with loading state control
  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true when data is being fetched
    try {
      await Promise.all([
        exponentialBackoff(getAllUsers),
        exponentialBackoff(getAllPost),
      ]);
    } catch {
      toast.error(
        "Failed to fetch data. Please check your network connection and refresh the page."
      );
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  }, []);

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
      const response = await axiosInstance.get("/post/user-posts");
      setGetPostByUser(response.data.postDataByUser);
    } catch (error) {
      toast.error("Error fetching posts by user");
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

  useEffect(() => {
    fetchData();
    checkAuthStatus();
  }, []);

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
    fetchData,
    getUserData,
    getAllUsers,
    getAllPost,
    postByUser,
    getPostByUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
