import React, { useEffect, useState } from "react";
import Navbar from "../compnents/Navbar";
import Footer from "../compnents/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { toast } from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    excerpt: "",
    slug: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/post/get-user-by-post/${id}`
        );
        const post = data.post;

        setForm({
          title: post.title || "",
          content: post.content || "",
          tags: post.tags?.join(", ") || "",
          excerpt: post.excerpt || "",
          slug: post.slug || "",
        });
        setCoverImage(post.coverImage || null);
      } catch (error) {
        toast.error("Failed to load post data");
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating post...");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("tags", form.tags);
      formData.append("excerpt", form.excerpt);
      formData.append("slug", form.slug);
      if (coverImage instanceof File) {
        formData.append("coverImage", coverImage);
      }

      const { data } = await axiosInstance.patch(
        `/post/edit-post/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("Post updated!", { id: toastId });
        navigate("/profile");
      } else {
        toast.error(data.message || "Something went wrong", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Post update failed!", { id: toastId });
    }
  };

  return (
    <div>
      <Navbar />
      <section className="min-h-screen px-4 py-16 md:py-24 bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3f] to-[#1e1e2f] text-white">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition"
            >
              <ArrowLeft size={16} />
              Back to Profile
            </button>

            <h2 className="text-3xl font-bold mb-6">Edit Post</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
                  placeholder="e.g. The Rise of AI Startups"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
                  placeholder="Write your full post content here..."
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
                  placeholder="e.g. tech, coding, AI"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Excerpt (optional)</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
                  placeholder="Short summary of your post..."
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Slug (optional)</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  // disabled
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
                  placeholder="e.g. rise-of-ai-startups"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-white"
                />
              </div>

              {(previewUrl ||
                (typeof coverImage === "string" && coverImage)) && (
                <div className="mt-2">
                  <p className="text-sm text-white/70 mb-1">
                    Current Cover Image:
                  </p>
                  <img
                    src={previewUrl || coverImage}
                    alt="Cover Preview"
                    className="max-w-full max-h-64 rounded-xl border border-white/10"
                  />
                </div>
              )}

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-all"
                >
                  <Upload size={16} />
                  Update Post
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EditPost;
