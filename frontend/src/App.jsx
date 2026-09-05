import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <main>
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Social Challenge Platform</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
