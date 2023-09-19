import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Category from './containers/Category'
import Register from './containers/Register'
import './App.css'
import Login from './containers/Login'
import EditCategory from './containers/EditCategory'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/category" element={<Category />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/editcategory" element={<EditCategory />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
