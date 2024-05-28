import React from 'react'
import { Logo } from '../Assets'

const current = new Date();
const date = current.getFullYear();


const Footer = () => {
  return (
    <div>
      <footer className="text-slate-50 bg-opacity-0 px-4 py-5 max-w-screen-xl mx-auto md:px-8 space-y-4">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <div className='flex justify-center'>
                <div className="flex items-center mt-4 space-x-[30px] sm:mt-0">
            <a
              href="https://twitter.com/Blastarians_"
              className=" transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fef3c7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            <a
              href="https://t.co/yrhVCAV4qJ"
              className=" transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
              rel="noopener noreferrer"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fef3c7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
                <path d="M7 16.5c3.5 1 6.5 1 10 0" />
              </svg>
            </a>
            <a
              href="https://t.co/yrhVCAV4qJ"
              className=" transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
              rel="noopener noreferrer"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fef3c7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
              </svg>
            </a>
            <a
              href="https://t.co/yrhVCAV4qJ"
              className=" transition-colors duration-300 hover:text-teal-accent-400"
              target="_blank"
              rel="noopener noreferrer"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fef3c7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>
          </div>
                  
                </div>
       
            </div>
          

            <div className="mt-8 sm:mt-0">
                    &copy; {date} Blastarians All rights reserved.
                </div>

        </footer>

    </div>
  )
}

export default Footer