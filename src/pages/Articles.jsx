import { useContext } from "react";
import { AppContext } from "../context/context";
import { Link } from "react-router-dom";
import Footer from "../compnents/Footer";
import Navbar from "../compnents/Navbar";

const Articles = () => {
  const { postLists, allUsers, loading } = useContext(AppContext);

  return (
    <>
      <Navbar />

      {postLists ? (
        <div className="flex flex-col md:flex-row gap-8 px-4 md:px-6 py-6 max-w-7xl mx-auto bg-gray-100 min-h-screen">
          {/* Left Content - Mobile optimized */}
          <div className="w-full md:w-2/3 flex flex-col">
            {/* Fixed "For you" heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sticky top-0 bg-gray-100 py-2 z-10">
              For you
            </h2>
            
            {/* Scrollable posts container - Mobile optimized */}
            <div 
              className="overflow-y-auto flex-1" 
              style={{ 
                height: 'calc(100vh - 180px)', 
                maxHeight: 'calc(100vh - 180px)',
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
            >
              <style jsx="true">{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-xl p-4 shadow-md">
                      <div className="h-5 w-2/3 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  {postLists?.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white p-3 md:p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col sm:flex-row gap-3"
                    >
                      <img
                        src={post?.coverImage || "/placeholder.png"}
                        alt="Post thumbnail"
                        className="w-full sm:w-32 h-36 sm:h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <Link to={`/articles/post/${post.slug}`}>
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 hover:text-indigo-600">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 line-clamp-2 my-1">
                          {post.excerpt || post.content?.slice(0, 100)}
                        </p>
                        <div className="text-xs text-gray-500 mt-2">
                          By {post.author?.name || "Unknown Author"} • {formatDate(post.createdAt)} ago
                        </div>
                      </div>
                      <Link
                        to={`/articles/post/${post.slug}`}
                        className="self-start sm:self-center text-sm text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1"
                      >
                        Read More
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Only shown on desktop, sticky on scroll */}
          <aside className="hidden md:block w-1/3 md:sticky md:top-6 md:self-start space-y-6 h-fit">
            {/* Trending Section */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending</h3>
              {postLists?.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  to={`/articles/post/${post.slug}`}
                  className="flex gap-3 mb-4 hover:bg-gray-100 p-2 rounded"
                >
                  <img
                    src={post.coverImage || "/placeholder.png"}
                    alt="Trending post"
                    className="w-16 h-14 object-contain rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      By {post.author?.name || "Unknown Author"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recommended Users */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Users</h3>
              {allUsers?.slice(0, 4).map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Mobile Trending Section - Only visible on mobile at bottom */}
          <div className="w-full block md:hidden mt-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending</h3>
              <div className="flex overflow-x-auto gap-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx="true">{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {postLists?.slice(0, 3).map((post) => (
                  <Link
                    key={post._id}
                    to={`/articles/post/${post.slug}`}
                    className="flex-shrink-0 w-48"
                  >
                    <img
                      src={post.coverImage || "/placeholder.png"}
                      alt="Trending post"
                      className="w-full h-28 object-contain rounded-lg mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      By {post.author?.name || "Unknown Author"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-lg text-gray-600 font-base flex align-center justify-center">Failed to load Articles</h1>
          <h3 className="text-lg text-gray-600 font-base flex align-center justify-center">Check Internet Connection and refresh page</h3>
        </div>
      )}

      <Footer />
    </>
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString()}`;
};

export default Articles;