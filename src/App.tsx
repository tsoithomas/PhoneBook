import { useState, useEffect, useRef } from 'react'
import maLogo from '/ma.png'
import ContactList from './ContactList'
import Login from './Login';

function App() {
	const token = "";

	if (token == "") 
		return <Login />
	else
		return <ContactList />
}

export default App
