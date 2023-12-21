import { useState, useEffect, useRef } from 'react'
import maLogo from '/ma.png'
import ContactList from './components/ContactList'
import Login from './components/Login';
import useToken from './components/useToken';

function App() {
	const { token, setToken } = useToken();

	if (!token) 
		return <Login setToken={setToken} />
	else
		return <ContactList token={token} setToken={setToken} />
}

export default App
