import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sanh from './components/Sanh';
import Menu from './components/Menu';
import DichVu from './components/DichVu';
import DatTiec from './components/DatTiec';
import { createContext, useReducer } from 'react';
import myReducer from './reducers/UserReducer';
import Login from './components/Login';
import Register from './components/Register';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TiecCuoi from './components/TiecCuoi';
import TiecCuoiDetail from './components/TiecCuoiDetail';
import DatTiecDetail from './components/DatTiecDetail';

export const UserContext = createContext()

function App() {
  const [user, dispatch] = useReducer(myReducer)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <UserContext.Provider value={[user, dispatch]}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/sanh-tiec' element={<Sanh />}/>
            <Route path='/menu' element={<Menu />}/>
            <Route path='/dich-vu' element={<DichVu />}/>
            <Route path='/dat-tiec' element={<DatTiec />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path="/user/:userId/tieccuois" element={<TiecCuoi />} />
            <Route path="/tieccuoi/:tieccuoiId" element={<TiecCuoiDetail />} />
            <Route path="/dat-tiec/thong-tin" element={<DatTiecDetail />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
