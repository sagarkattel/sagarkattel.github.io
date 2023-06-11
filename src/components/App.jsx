import React from 'react';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
import {Route,Routes} from "react-router-dom";
// import Navbar from './Navbar';
import Blogs from "./blogs";
import BlogDetails from './blogdetails'; // Import the BlogDetails component
import Edit from './edit';
import Create from './create';
import Login from './login';



const App = () => {
  return (
    <div>
      <Routes>
       <Route>
        <Route index element={<Blogs />} />
        {/* <Route path="/blogs" element={<Blogs />} /> */}
        <Route path="/edit" element={localStorage.getItem('token')?<Edit />:<Login />} />
        <Route path="/create" element={localStorage.getItem('token')?<Create />:<Login />} />
        <Route path="/blogs/:id" element={<BlogDetails />} /> {/* Add the route for /blogs/:id */}
        <Route path="/admin" element={<Login />} />
       </Route> 
      </Routes>
    </div>
  )
}

export default App