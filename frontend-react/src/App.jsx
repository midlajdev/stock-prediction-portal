import { useState } from 'react'
import './App.css'
import './assets/css/style.css'
import { Main } from './components/Main'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Register } from './components/register'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Login } from './components/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import AuthProvider from './AuthProvider'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'

function App() {

  return (
    <>
	<AuthProvider>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element = {<Main />} />
				<Route path='/register' element = {<PublicRoute><Register /></PublicRoute>} />
				<Route path='/login' element = {<PublicRoute><Login /></PublicRoute>} />
				<Route path='/dashboard' element = {<PrivateRoute><Dashboard /></PrivateRoute>} />

			</Routes>
			<Footer />
		</BrowserRouter>
	</AuthProvider>
    </>
  )
}

export default App
