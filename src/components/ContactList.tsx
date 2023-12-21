import { useState, useEffect } from 'react'
import maLogo from '/ma.png'

interface ContactListProps {
	token: string,
	setToken: (token: string | null) => void;
}

function ContactList(props:ContactListProps) {
	const [persons, setPersons] = useState([]);
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [phone, setPhone] = useState("");
	const [submenuStates, setSubmenuStates] = useState<{[index: number]: boolean}>({});
	const [phones, setPhones] = useState([]);

	useEffect(() => {
		listPersons();
	}, []);

	function Logout() {
		props.setToken(null);
	}

	async function listPersons() {
		const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=listpersons&token="+props.token);
		const data = await response.json();


		if (response.ok && data.status == 200) {
			setPersons(data.persons);

			let newSubmenuStates: {[index: number]: boolean} = {};
			for (const person of data.persons) {
				newSubmenuStates[person.personid] = false;
			}
			setSubmenuStates(newSubmenuStates);
		}
	}

	async function createPerson() {
		try {
			const inputs = {
				fname: fname, 
				lname: lname
			};
			const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=createperson&token="+props.token, {
				method: "POST", 
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(inputs), 
			});
			const data = await response.json();

			if (response.ok && data.status == 200) {
				setPersons(data.persons);
				setFname("");
				setLname("");
			}
		} catch (e: any) {
			console.error(`Download error: ${e.message}`);
		}
	}

	async function deletePerson(personid: number) {
		try {
			const inputs = {
				personid: personid
			};
			const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=deleteperson&token="+props.token, {
				method: "POST", 
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(inputs), 
			});
			const data = await response.json();

			if (response.ok && data.status == 200) {
				listPersons();
			}
		} catch (e: any) {
			console.error(`Download error: ${e.message}`);
		}
	}
	
	async function listPhones(personid: number) {
		try {
			const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=listphones&personid="+personid+"&token="+props.token);
			const data = await response.json();

			if (response.ok) {
				setPhones(data.phones);
			}
		} catch (e: any) {
			console.error(`Download error: ${e.message}`);
		}
	}

	async function createPhone(personid: number) {
		try {
			const inputs = {
				personid: personid, 
				phone: phone
			};
			const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=createphone&token="+props.token, {
				method: "POST", 
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(inputs), 
			});
			const data = await response.json();

			if (response.ok && data.status == 200) {
				setPhones(data.phones);
				setPhone("");
			}
		} catch (e: any) {
			console.error(`Download error: ${e.message}`);
		}
	}

	async function deletePhone(personid: number, phoneid: number) {
		try {
			const inputs = {
				phoneid: phoneid
			};
			const response = await fetch("http://localhost/PhoneBookBackend/api.php?action=deletephone&token="+props.token, {
				method: "POST", 
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(inputs), 
			});
			const data = await response.json();

			if (response.ok && data.status == 200) {
				listPhones(personid);
			}
		} catch (e: any) {
			console.error(`Download error: ${e.message}`);
		}
	}
	
	function toggleSubmenu(personid: number) {
		listPhones(personid);
		let newSubmenuStates: {[index: number]: boolean} = {};
		newSubmenuStates = Object.assign({},submenuStates);
		for (const state in newSubmenuStates) {
			newSubmenuStates[state] = false;
		}
		newSubmenuStates[personid] = ! submenuStates[personid];
		setSubmenuStates(newSubmenuStates);
	}

	return (
		<div className='flex flex-col h-screen'>
			<nav className="flex flex-row bg-cyan-800 px-4 flex h-16 items-center justify-start">
				<div className='rounded-full overflow-hidden'>
					<img className="h-12 w-auto hover:bg-cyan-700 px-2 py-2" src={maLogo} alt="Mortgage Automator" />
				</div>
				<div className="flex-grow ml-2 block text-white font-bold text-xl">
					MA PhoneBook
				</div>
				<div>
					<button
						className="w-full align-middle justify-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white flex items-center gap-3"
						type="button"
						onClick={Logout}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none" fill="currentColor" className="w-5 h-5">
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 018 4h-2.71a8 8 0 10.001 12h2.71A9.985 9.985 0 0112 22zm7-6v-3h-8v-2h8V8l5 4-5 4z" />
						</svg>
						Log out
					</button>
				</div>
			</nav>

			<div className="flex flex-col flex-1 overflow-y-scroll overflow-x-hidden">
				{
					persons.map((item) => {
						const personid = item["personid"];
						return (
							<div
								key={item["personid"]} 
								className={submenuStates[personid] ? "" : "border-b-[1px]"}
							>
								<div 
									onClick={() => toggleSubmenu(personid)}
									className={(submenuStates[personid]?"bg-cyan-600 text-white hover:text-white ":"text-cyan-700 hover:bg-sky-100 hover:text-teal-950 ") + " transition-all duration-200 group h-12 flex flex-row items-center py-2 px-4 hover:cursor-pointer text-sm"}
								>
									<div className='flex flex-row flex-grow items-center ms-0 group-hover:ms-[0.25rem] font-normal group-hover:font-bold transition-all duration-200 '>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
											<path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
										</svg>
										{item["fname"]} {item["lname"]}
									</div>

									<div className="relative w-8 h-12" tabIndex={-1}>
										<button 
											className="absolute top-2 left-12 group-hover:-left-1 rounded transition-all bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-2 h-8 w-8 items-center"
											onClick={() => deletePerson(personid)}
											tabIndex={-1}
											>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
											</svg>
										</button>
									</div>
								</div>
								<div className={(submenuStates[personid] ? "is-open border-cyan-600 border-b-4 " : "border-sky-100 border-b-0") + ' wrapper transition-all duration-200 overflow-hidden border-x-4 rounded-b-lg'}>
									<div className='overflow-hidden'>
										<div className='flex flex-col'>
											{
												phones.map((item) => {
													const phoneid = item["phoneid"];
													const phonenum = item["phone"];
													return (
														<div 
															key={phoneid}
															className="group hover:bg-sky-100 flex w-full ps-6 pe-4 h-12 items-center text-cyan-800 text-sm"
															>
															<div className='flex flex-row flex-grow ms-0 group-hover:ms-[0.25rem] font-normal group-hover:font-bold transition-all'>
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
																	<path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
																</svg>
																{phonenum}
															</div>
															<div className="relative w-8 h-12" tabIndex={-1}>
																<button 
																	className="absolute top-2 left-14 group-hover:left-0 rounded transition-all bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-2 h-8 w-8 items-center"
																	onClick={() => deletePhone(personid, phoneid)}
																	tabIndex={-1}
																	>
																	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" tabIndex={-1}>
																		<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
																	</svg>
																</button>
															</div>
														</div>
													)
												})
											}
										</div>
										<div className='flex flex-row gap-6 ps-6 pe-4 pt-4 pb-2 bg-gray-100 rounded-b-lg'>
											<div className="relative flex-grow">
												<input placeholder="Phone number"
													name="phone"
													className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" 
													value={phone}
													onChange={(e) => {
														setPhone(e.target.value);
													}}
													onKeyDown={(e) => {
														if (e.key == 'Enter') createPhone(personid);
													}}
												/>
												<label
													className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
													Phone number
												</label>
											</div>
											<div className="relative">
												<button
													className="rounded bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-2 h-8 w-8 items-center"
													type="button"
													onClick={() => createPhone(personid)}
												>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none" fill="currentColor">
														<path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})
				}

			</div>


			<div className="flex flex-col sm:flex-row gap-6 w-full bg-gray-100 px-6 py-6">
				<div className="relative flex-grow">
					<input placeholder="First name"
						name="fname"
						className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
						value={fname}
						onChange={(e) => {
							setFname(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key == 'Enter') createPerson();
						}}
					/>
					<label
						className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
						First name
					</label>
				</div>
				<div className="relative flex-grow">
					<input placeholder="Last name"
						name="lname"
						className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" 
						value={lname}
						onChange={(e) => {
							setLname(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key == 'Enter') createPerson();
						}}
					/>
					<label
						className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
						Last name
					</label>
				</div>
				<div className="relative">
					<button
						className="w-full align-middle justify-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white flex items-center gap-3"
						type="button"
						onClick={createPerson}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none" fill="currentColor" className="w-5 h-5">
							<path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
						</svg>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}

export default ContactList
