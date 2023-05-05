import './App.css';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminLogin from './components/AdminLogin/AdminLogin';
import { Routes, Route } from 'react-router-dom';
import { BookForm } from './components/add_book_form/BookForm';
import AdminLoginnew from './components/AdminLogin/AdminLoginnew';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<AdminLoginnew />} />
      <Route exact path='/admindashboard' element={<AdminDashboard />} />
      <Route exact path='/addbook' element={<BookForm />} />
    </Routes>
  );
}

export default App;
