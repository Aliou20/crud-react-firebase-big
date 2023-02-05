import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login'
import OublierMotPasse from '../Auth/OublierMotPasse'
import Register from '../Auth/Register'
import Layout from '../Layout/Layout'
import Dashboard from '../Pages/Dashboard'
import Acceuil from '../ViewUser/Acceuil'

function Chemin() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registe' element={<Register />} />
        <Route path='/oublier' element={<OublierMotPasse />} />
        <Route path='/acceuil' element={<Acceuil />} />
        <Route path='/sidebar' element={<Layout />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

export default Chemin