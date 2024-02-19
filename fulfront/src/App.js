
import './App.css';
import Register from './Fullpage/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Fullpage/Login';
import Homee from './Fullpage/Homee';

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homee />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
