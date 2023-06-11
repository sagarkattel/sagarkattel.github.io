import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const navigate=useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedField, setUpdatedField] = useState('');

  const handleCreate=()=>{
    navigate("/create");
  }
  const handleHome=()=>{
    navigate('/');
  }

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('localname');
    navigate('/');
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch('https://nice-puce-bat-vest.cyclic.app/api/v1/blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.log(error));
  };

  const handleUpdate = (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    setSelectedBlog(blogToUpdate);
    setUpdatedTitle(blogToUpdate.title);
    setUpdatedField(blogToUpdate.field);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'title') {
      setUpdatedTitle(e.target.value);
    } else if (e.target.name === 'field') {
      setUpdatedField(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      title: updatedTitle,
      field: updatedField,
    };

    fetch(`https://nice-puce-bat-vest.cyclic.app/api/v1/admin/${selectedBlog.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog post updated:', data);
        const updatedBlogs = blogs.map((blog) => {
          if (blog.id === data.id) {
            return data;
          }
          return blog;
        });
        setBlogs(updatedBlogs);
        setSelectedBlog(null);
        setUpdatedTitle('');
        setUpdatedField('');

        fetchBlogs(); // Fetch the updated blogs data
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://nice-puce-bat-vest.cyclic.app/api/v1/admin/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog post deleted:', data);
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <h2>Create New Post</h2>
        <button onClick={handleCreate}>+</button>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {selectedBlog ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <h2>Update The Post</h2>
          </div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={updatedTitle}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <br />
          <label>Field:</label>
          <textarea
            name="field"
            value={updatedField}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <br />
          <button type="submit">Save</button>
          <button onClick={() => setSelectedBlog(null)}>Cancel</button>
        </form>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.field.substring(0, 100)}...</p>
          <button onClick={() => handleUpdate(blog.id)}>Update</button>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
        )
      ))}
      </div>
  );
};

export default Edit;




