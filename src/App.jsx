
import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import TaskBoard from './Task/TaskBoard';
const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex flex-col justify-center items-center' >
      <Hero></Hero>
      <TaskBoard></TaskBoard>
      </div>
      <Footer></Footer>

    </div>
  );
};

export default App;