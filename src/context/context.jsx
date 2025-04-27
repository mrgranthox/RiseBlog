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

  const exponentialBackoff = async (fn, retries = 1, delay = 100) => {
    return safeRequest(async () => {
      try {
        return await fn();
      } catch (error) {
        if (retries > 0) {
          toast.log(`Retrying in ${delay}ms... (${retries} attempts left)`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return exponentialBackoff(fn, retries - 1, delay * 1);
        }
        throw error;
      }
    });
  };

  const fetchData = useCallback(async () => {
    try {
      await Promise.all([
        exponentialBackoff(getAllUsers),
        exponentialBackoff(getAllPost),
      ]);
    } catch (error) {
      toast.error("Failed to fetch data after multiple retries", error);
      toast.error(
        "Unable to fetch data. Please check your network connection."
      );
    } finally {
      setLoading(false);
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

  const safeRequest = async (requestFn) => {
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.log("Request taking too long, resetting loading state");
        setLoading(false);
      }
    }, 10000);

    try {
      return await requestFn();
    } catch (error) {
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
