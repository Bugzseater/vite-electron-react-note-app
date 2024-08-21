
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Note from './pages/Note'
import Login from './pages/Login'
import SignUp from './pages/Signup'

function App() {
 

  return (
    <>
    <MemoryRouter>
      <Routes>
        <Route path = "/">
        <Route index Component={Home}/>
        <Route path='notes' Component={Note}/>
        <Route path='login' Component={Login}/>
        <Route path='signup' Component={SignUp}/>
        </Route>
      </Routes>
    </MemoryRouter>

      
    </>
  )
}

export default App
