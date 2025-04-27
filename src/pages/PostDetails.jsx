import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { motion } from "framer-motion";
import Footer from "../compnents/Footer";
import Navbar from "../compnents/Navbar";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { AppContext } from "../context/context";

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  const { postLists, allUsers } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/post/posts/${slug}`);
        setPost(res.data.post);
      } catch {
        toast.error("Failed to load post.");
      }
    };
    fetchPost();
  }, [slug]);

  if (!post)
    return (
      <div className="flex items-center justify-center h-screen transparent">
        <div className="flex space-x-2">
          <div className="w-2 h-10 bg-blue-600 rounded animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-8 bg-purple-600 rounded animate-bounce"></div>
          <div className="w-2 h-10 bg-blue-600 rounded animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-8 bg-purple-600 rounded animate-bounce"></div>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="bg-[#f9fafb] min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-800 ml-4 pt-4 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-3 pt-8 mb-16">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-3 bg-white shadow-sm rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={post.author?.profilePicture || "/default-avatar.png"}
                alt={post.author?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  {post.author?.name || "Unknown"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <img
              src={post.coverImage}
              alt={post.title}
              className="rounded-xl w-full h-auto object-contain mb-6 max-h-[500px]"
            />
            <p className="text-sm text-gray-500 mb-8 italic text-center">
              {post.imageCaption || "Image related to the article"}
            </p>
            <div className="prose prose-lg max-w-none text-gray-800">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="w-full lg:col-span-1 flex flex-col gap-8">
            {/* Trending Section */}
            <div className="bg-white p-6 rounded-2xl shadow-md w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                🔥 Trending
              </h3>
              {postLists?.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  to={`/articles/post/${post.slug}`}
                  className="flex items-start gap-4 mb-4 p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <img
                    src={post.coverImage || "/placeholder.png"}
                    alt="Trending post"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500 mt-1">
                      by {post.author?.name || "Unknown Author"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recommended Users */}
            <div className="bg-white p-6 rounded-2xl shadow-md w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                👥 Recommended Users
              </h3>
              <div className="divide-y divide-gray-200">
                {allUsers?.slice(0, 4).map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profilePicture || "/default-avatar.png"}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium text-gray-800">
                        {user.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostDetails;
