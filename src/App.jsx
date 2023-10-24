import { Navigate, Route, Routes } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.scss'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Stats from './pages/Stats';
import Global from './pages/Global';
import Login from './pages/Login';

const App = () => {

  const PrivateWrapper = () => {
    const userStorage = sessionStorage.getItem("login-user") || localStorage.getItem("login-user") || null;
    return (
      <>
      { userStorage ? (
        <Global />
      ) : (
        <Navigate to="/login" />
      )}
      </>
    )
  };

  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/detail/:productId" element={<Detail />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
