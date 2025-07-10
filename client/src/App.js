import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Routes,Route} from 'react-router-dom';
import AddMovie from './addmovie';
import MyBookings from './myBooking';
import MyContacts from './myContact';
import MyEvents from './myevents';
import MyHomes from './myHome';
// import { useContext, useState } from 'react';
import LocationContext from './locationcontext'; // empty string
import { useState } from 'react';
import Login from './login';
function App()
{
  const[location,setLocation]=useState('Bangalore');// Assuming
  const updateLocation = (newLocation)=>{
    setLocation(newLocation); // after u making any function call it will be rerender
  } 
  return (
    <LocationContext.Provider value={{location,updateLocation}}>
  <div>
   <nav class="navbar navbar-expand-lg navbar-light bg-black">
  <a class="navbar-brand" href="#">My Show-{location}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/movies">Movies</Link>
      </li>
      {(location==='Bangalore')?
       <li class="nav-item">
        <Link class="nav-link " to="/events">Events</Link>
      </li>
       :''}
          <li class="nav-item">
        <Link class="nav-link " to="/bookings">Bookings</Link>
      </li>
        <li class="nav-item">
        <Link class="nav-link " to="/contact">Contact</Link>
      </li>

    <form class="form-inline my-2 my-lg-0">
      {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}
      <Link to="/login" class="btn btn-outline-success my-2 my-sm-0">Login</Link>
    </form>
    </ul>
  </div>
</nav>
<Routes>
  <Route path='/' element={<MyHomes></MyHomes>}/>
  <Route path='/movies' element={<AddMovie title="Movies" />}/>
  <Route path='/events' element={<MyEvents></MyEvents>}/>
  <Route path='/bookings' element={<MyBookings></MyBookings>}/>
  <Route path='/contact' element={<MyContacts></MyContacts>}/>
  <Route path='/login' element={<Login/>} />
</Routes>
   
</div>
</LocationContext.Provider>
  );
}
export default App;
//given expresiion only run the logic
 {/* <Menubar mytitle="Welcome to my show" location="bangalore"></Menubar>
    <AddMovie title="Tickenewsite"></AddMovie> */}
