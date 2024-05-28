import { useState } from 'react'
import { Logo } from '../Assets'
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Navbar = () => {

  const [state, setState] = useState(false)
  const loading = useSelector(state => state?.auth?.isLoading)

  const navigation = [
    { title: "Home", path: "../" },
    // { title: "WL Checker", path: "../wlchecker" },
    // { title: "Mint", path: "../mint" },
    { title: "Stake", path: "../stake" },
    { title: "Social Campaign", path: "../social" }
  ]


  const query = useQuery();
  const invite = query.get("invite");
  const user = JSON.parse(localStorage.getItem("user"))












  return (
    <div>
      <nav className="bg-opacity-0 w-full md:static py-4 lg:px-[150px]">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a className='flex content-center justify-center items-center text-white' href="../">
              <img
                src={Logo}
                width={100}
                alt="Blast Ecosytem"
              />
              <p className=' text-[30px]'>
                Blastarians
              </p>
            </a>
            <div className="md:hidden">
              <button className="text-slate-50 hover:text-slate-50"
                onClick={() => setState(!state)}
              >
                {
                  state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`flex-1 pb-3 mt-5 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {
                navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-amber-100 hover:text-yellow">
                      <a href={item.path} className="block">
                        {item.title}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
            <div className="lg:hidden mt-[40px]">
              <ConnectWallet
                className="bg-yellow"
                theme={"dark"}
                style={{background: "yellow"}}
                networkSelector="open"
                hideTestnetFaucet={true}
                switchToActiveChain={true}
                modalSize="wide"
                modalTitleIconUrl=""
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export const shortenString = (value, length = 4) => {
  if (!value) return '';
  if (length >= value?.length) return value;
  return `${value.slice(0, length + 2)}...${value.slice(-length)}`;
}

export const compareStrings = (str1, str2) => {
  return str1?.toLowerCase() === str2?.toLowerCase();
}

export default Navbar