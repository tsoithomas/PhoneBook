import { useState, useEffect } from 'react'
import maLogo from '/ma.png'

function Login() {


	return (
		<div className='flex flex-col h-screen'>
			<nav className="bg-cyan-800 px-4 flex h-16 items-center justify-start">
				<div className='rounded-full overflow-hidden'>
					<img className="h-12 w-auto hover:bg-cyan-700 px-2 py-2" src={maLogo} alt="Mortgage Automator" />
				</div>
				<div className="ml-2 block text-white font-bold text-xl">
					MA PhoneBook
				</div>
			</nav>


		</div>
	)
}

export default Login
