import { useState, useEffect } from 'react'
import maLogo from '/ma.png'
import sha256 from 'crypto-js/sha256';

interface LoginProps {
	setToken: (token: string | null) => void;
}

function Login(props:LoginProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);

	async function SubmitLogin() {
		try {
			const inputs = {
				username: username, 
				password: sha256(password).toString()
			};
			const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=login", {
				method: "POST", 
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(inputs), 
			});
			const data = await response.json();

			if (response.ok && data.status == 200) {
				props.setToken(data.token);
			}
			else {
				setShowError(true);
			}
		} catch (e: any) {
			console.error(`Download error: ${e.message}`);
		}
	}

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
			
			<div className="flex flex-col flex-1 overflow-y-scroll overflow-x-hidden justify-center items-center">
				<div className='flex flex-col gap-4 w-full max-w-sm'>
					<div className='text-xs text-cyan-700/50'>
						user: demo | pass: pass
					</div>
					<div className="relative flex-grow">
						<input placeholder="Username"
							name="username"
							className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								setShowError(false);
							}}
							onKeyDown={(e) => {
								if (e.key == 'Enter') SubmitLogin();
							}}
						/>
						<label
							className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
							Username
						</label>
					</div>
					<div className="relative flex-grow">
						<input placeholder="Password"
							type="password"
							name="password"
							className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" 
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setShowError(false);
							}}
							onKeyDown={(e) => {
								if (e.key == 'Enter') SubmitLogin();
							}}
						/>
						<label
							className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
							Password
						</label>
					</div>
					<div className={(showError?"is-open ":"") + 'wrapper transition-all duration-200 overflow-hidden'}>
						<div className='overflow-hidden'>
							<div className=' text-xs text-red-600 px-4 py-2 rounded-full border-red-600 border-2'>
							Error: incorrect username and/or password
							</div>
						</div>
					</div>
					<div className="relative">
						<button
							className="w-full align-middle justify-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white flex items-center gap-3"
							type="button"
							onClick={SubmitLogin}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none" fill="currentColor" className="w-5 h-5">
								<path fill="none" d="M0 0h24v24H0z" />
								<path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0020 12 8 8 0 004.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z" />
							</svg>
							Sign In
						</button>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Login