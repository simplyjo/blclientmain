import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { checker } from '../actions/auth';
import { Footer, Navbar } from '../Components';
import Web3 from "web3";


const Wlchecker = () => {
 
  const [wallet, setWallet] = useState()
  const [tweet, setTweet] = useState(false)
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.auth.isLoading)
  const wl = useSelector(state => state.users.wl)
  const checked = useSelector(state => state.users.checked)

  console.log("state", isLoading)

  const handleWalletInput = (e) => {

    setWallet(e.target.value);
  };
  const handleSubmit = () => {
    console.log("wallet", wallet)
    dispatch(checker(wallet))

  };

  const handleShare = () => {
    const text = `Finally, The $MEMEZ of all meme sensation for %23Solana Airdrop Season is here.%0a%0a@solmeme_ is a Socio-Fi experiment built to reward meme lovers.%0a%0aStart creating your $MEMEZ moment with %23Solmeme now 👇 %0a%0ahttps%3A%2F%2Fsolmeme.xyz%2Ffarming%0a%0ahttps%3A%2F%2Ftwitter.com%2Fsolmeme_%2Fstatus%2F1725132810854269414`
    const test = "I'm excited about the upcoming FREEMINT launch for the 999 @EtherPillarNFT Genesis collection.  %0a%0aConfirm your waitlist spot via  whitelist checker 👇 .  %0a%0ahttps%3A%2F%2Fetherpillar.xyz%2Fwlchecker."

    window.open(
      `https://twitter.com/intent/tweet?&text=${test}`,
      "_blank",
      "noopener"
    )
    setTweet(true)
  }



  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center py-16 mx-auto md:px-24 lg:px-8 lg:pt-5 bg-no-repeat bg-cover bg-center"
        style={{
          // backgroundImage: `url(${Test})`,
        }}>
        <div className="mb-10 sm:text-center md:mb-12">
          <div className="container mx-auto p-4">
            <div className="space-y-4">
              <div className="">
                <h2 className="mb-6 text-3xl font-bold leading-none md:text-6xl text-white md:mx-auto">
                  Check Your Wallet
                </h2>
                <div>

                  <div className="p-8 bg-neutral-950/80 flex flex-col rounded justify-center items-center">
                    <p className="font-medium text-gray-300">Wallet Checker</p>

                    {/* <div className='my-3'>
                      <button type="button" onClick={handleShare} className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                          <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
                        </svg>
                        Share This Tweet
                      </button>
                    </div> */}
                    <div className="relative w-full min-w-[300px] h-10 my-6">
                      <input type="wallet"
                        className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal  !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        autoFocus
                        onChange={handleWalletInput}
                      />
                      <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        EVM Wallet Address
                      </label>
                    </div>

                    <a>
                      <button

                        className="bg-white inline-flex items-center justify-center h-12 my-2 px-6 font-bold tracking-wide text-black hover:scale-105 transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={!wallet || !Web3.utils.isAddress(wallet)}
                      // disabled={!tweet || !wallet || !Web3.utils.isAddress(wallet)}
                      >
                        <>
                          {isLoading ?
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg> : <></>

                          }
                        </>

                        Submit
                      </button>
                    </a>
                  </div>
                  <>{wl &&

                    <div className="p-8 bg-neutral-950/80 text-green-400 flex my-4 flex-col rounded justify-center items-center">
                      Congratulations! You are on the waitlist!!
                    </div>} </>
                  <>{!wl && checked &&

                    <div className="p-8 bg-neutral-950/80 text-red-400 flex my-4 flex-col rounded justify-center items-center">
                      Sorry! You're not on the waitlist!!
                    </div>} </>

                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default Wlchecker;
