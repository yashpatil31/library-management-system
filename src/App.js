import './App.css';
import AdminLogin from './components/AdminLogin';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route exact path='/adminlogin' element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
