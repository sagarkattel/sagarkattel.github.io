import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetch("https://nice-puce-bat-vest.cyclic.app/api/v1/blogs")
      .then((res) => res.json())
      .then((blogs) => setBlogs(blogs));
  }, []);

  const handleCreate = () => {
    navigate("/create");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleReadMore = (blog) => {
    navigate(`/blogs/${blog.id}`, { state: { blog } });
  };

  return (
    <div>
      <h2>Blogs</h2>
      <button onClick={localStorage.getItem("token") ? handleCreate : handleAdmin}>
        Admin
      </button>
      {!blogs ? (
        <h2>Loading Blogs...</h2>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.field.substring(0, 100)}...</p>
              <button onClick={() => handleReadMore(blog)}>Read More</button>
              <br />
              <span>
                
                <small>Author: {blog.created_by}</small>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Blogs;