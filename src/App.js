import './App.css'
import Login from './components/Login'
import Main from './components/Main'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home/:mail' element={<Home/>}/>
          <Route path='/main' element={<Main/>}/>
        </Routes>
      </Router>

    </>
  );
}

export default App;

