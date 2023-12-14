import { useState } from 'react'
import maLogo from '/ma.png'
import './App.css'

function App() {
  const [contacts, setContacts] = useState(["Peter", "John", "Mary","Sandy","Rebecca","Lee","Ming","Lucy","Cate"]);


  return (
    <div className='flex flex-col h-screen'>
      <nav className="bg-cyan-800 px-8 flex h-16 items-center justify-start">
        <img className="h-8 w-auto" src={maLogo} alt="Mortgage Automator" />
        <div className="ml-6 block text-white font-bold text-xl">
          MA PhoneBook
        </div>
      </nav>

      <div className="flex flex-col flex-1 overflow-y-scroll">
        {
          contacts.map((item) => {
            return (
              <div className="py-2 px-4 text-teal-700 hover:bg-sky-100 hover:cursor-pointer hover:text-teal-950">
                {item}
              </div>
            )
          })
        }

      </div>


      <div className="flex flex-row gap-6 w-full bg-gray-100 px-6 py-6">
        <div className="relative flex-grow">
          <input placeholder="First name"
            name="fname"
            className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
          <label
            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
            First name
          </label>
        </div>
        <div className="relative flex-grow">
          <input placeholder="Last name"
            name="lname"
            className="peer w-full border-b border-cyan-700 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-cyan-700 focus:border-cyan-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
          <label
            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-cyan-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-800 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-800 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300">
            Last name
          </label>
        </div>
        <div className="relative">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white flex items-center gap-3"
            type="button">
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

export default App
