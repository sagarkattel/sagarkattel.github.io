import React from "react";
import { useLocation } from "react-router-dom";

function BlogDetails() {
  const location = useLocation();
  const blog = location.state.blog;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.field}</p>
      <span>
        Created At: {blog.created_at}
        <br />
        <small>Author: {blog.created_by}</small>
      </span>
    </div>
  );
}

export default BlogDetails;
