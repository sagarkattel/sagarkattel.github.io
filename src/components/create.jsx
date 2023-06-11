import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Edit from './edit';

function Create() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  // const [response, setResponse] = useState(null);

  const handleTitle = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleField = (e) => {
    setData({ ...data, field: e.target.value });
  };

  const handleEdit=()=>{
    navigate('/edit');
  }
  const handleHome=()=>{
    navigate('/');
  }

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('localname');
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const created_by = localStorage.getItem("localname"); // Updated line

    const updatedData = { ...data, created_by };
  
    // Filter out null values from the data object
    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== null)
    );
  
  
    if (Object.keys(filteredData).length === 0) {
      // If all values are null, you can handle this case accordingly
      console.log('All values are null');
      return;
    }
  
    const response = await fetch('https://nice-puce-bat-vest.cyclic.app/api/v1/admin/write', {
      method: 'POST',
      body: JSON.stringify(filteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    console.log(filteredData);
  
    const result = await response.json();
    console.log(result);
    navigate('/edit');
  };
  

  return (
    <div>
      <h2>Welcome {localStorage.getItem("localname")} Create Blog!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleTitle} />
        <br />
        <br />
        <textarea type="text" name="field" placeholder="Content" onChange={handleField} />
        <br />
        <br />
        {console.log(localStorage.getItem('token'))}
        <button type="submit">Post</button>
        <button onClick={handleEdit}>View All Posts</button>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
      
    </div>
  );
}

export default Create;
