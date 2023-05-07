import './App.css';
import AdminDashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { BookForm } from './components/BookForm/BookForm';
import AdminLogin from './components/Login/AdminLogin/AdminLogin';
import IssueDashboard from './components/Dashboard/IssueDashboard';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<AdminLogin />} />
      <Route exact path='/dashboard' element={<AdminDashboard />} />
      <Route exact path='/addbook' element={<BookForm />} />
      <Route exact path='/issue' element={<IssueDashboard />} />
      <Route path='/editbook/:id' element={<BookForm />} />
    </Routes>
  );
}

export default App;
