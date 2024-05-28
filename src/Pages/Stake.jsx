import React, { useMemo, useState, useEffect } from 'react';
import { ConnectWallet, Web3Button, useContractRead, useContract, useAddress } from "@thirdweb-dev/react";
import { Footer, Navbar } from "../Components";
import { MotionAnimate } from "react-motion-animate";

// const BASE_URL = "https://blastarians-api.onrender.com";
const BASE_URL = "https://blclientapi.onrender.com";

const Stake = () => {
  const address = useAddress();
  const [refetched, setRefetched] = useState(1);

  const stats = [
    { id: 1, name: 'Total NFT Supply', value: 5555 },
    { id: 3, name: 'Reward Points Number', value: 30 },
    { id: 4, name: 'Reward Points Interval', value: 'Every 10 minutes' }
  ]

  return (
    <>
      <div className='lg:max-w-[93%] lg:-ml-[90px]'>
        <Navbar />
      </div>

      <MotionAnimate
        animation='fadeInUp'
        reset={true}
        distance={200}
        delay={0}
        speed={0.5}
      >
        <div className="h-full ">
          <div className="lg:mt-[20px] lg:mb-[100px] block min-h-full flex-col justify-center items-start py-16 mx-auto md:px-4 lg:px-8 lg:pt-5 bg-no-repeat bg-cover bg-center !p-0">
            <div className="mb-10 sm:text-center md:mb-0">
              <div className="mx-auto">
                <div className="space-y-4 h-full">
                  <div className="hidden lg:block">
                    <ConnectWallet
                      className="!absolute bg-amber-100 lg:!right-[120px] !top-[60px]"
                      theme="dark"
                      style={{ background: "#fef3c7" }}
                      networkSelector="open"
                      hideTestnetFaucet={true}
                      switchToActiveChain={true}
                      modalSize="wide"
                    />
                  </div>

                  <div className="h-full mx-auto mt-0 lg:flex justify-center items-start">
                    <div className="block items-center justify-center lg:max-w-[85%] w-screen">
                      <Staking {...{ address, refetched, setRefetched }} />
                      <Leaderboard {...{ address, refetched }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionAnimate>

      <div className="my-[50px] lg:my-[100px]">
        <div className="mx-auto max-w-[75%]">
          <dl className="text-center lg:flex lg:-ml-[5px] space-y-7 lg:space-y-0 justify-center">
            {stats.map((stat) => (
              <div key={stat.name} className="mx-auto flex flex-col gap-y-4">
                <dt className="text-[18px] leading-7 text-white/70">{stat.name}</dt>
                <dd className="whitespace-nowrap order-first text-3xl font-semibold tracking-tight text-amber-100 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Footer />
    </>
  );
};

function Staking({ address, setRefetched, refetched }) {
  const stakeContract = "0x8311c034FB7F537BeB842ff01381a0b8a974CE32"
  const nftContract = "0xC6f85C3768beb29A715E1EB7B44B1B1C8d84B202"
  const { contract } = useContract(nftContract);
  const [data, setData] = useState(null);
  const [fetchingStake, setFetchingStake] = useState(false);
  const [stakeQuantity, setStakeQuantity] = useState(1);
  const [unstakeQuantity, setUnstakeQuantity] = useState(1);

  const { data: isApproved, isLoading, refetch: refetchApproval } = useContractRead(contract, "isApprovedForAll", [address, stakeContract]);

  const url = new URL(window.location.href);
  const referrer = url.pathname.includes('/r/') ? url.pathname.split('/').filter(Boolean).pop() : "";

  const getStakeInfo = () => {
    if (address) {
      setFetchingStake(true)
      fetch(`${BASE_URL}/stake/${address}?referrer=${referrer}`, {
        method: 'GET'
      }).then(response => response.json())
        .then(result => {
          setRefetched(refetched + 1)
          setData(result.data)
          setFetchingStake(false)
        })
        .catch(error => {
          setFetchingStake(false)
        });
    }
  }

  useEffect(() => {
    if (address) getStakeInfo()
  }, [address]);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <div className="flex flex-col w-full lg:min-w-full gap-4 px-12 lg:p-12 rounded-0 lg:border lg:border-amber-100 lg:dark:border-amber-100 !border-b-0">
      <h4 className="text-[35px] lg:text-[45px] font-bold lg:whitespace-nowrap px-[0px] text-amber-100 pb-5 capitalize">
        NFT Staking Dashboard
        <p className='mt-5 text-[20px] lg:mt-2 lg:text-[30px] text-white'>Stake your NFTs to earn Blastarians points</p>
      </h4>

      <div className="grid mt-5 space-y-[20px] lg:space-y-0 min-h-[750px] lg:min-h-[260px] w-[95%] mx-auto border divide-y lg:divide-y-0 lg:divide-x divide-amber-100 border-amber-100 grid-cols-1 lg:grid-cols-4">
        <div className='w-full h-full flex justify-center items-center'>
          <div className='-mt-[10px] w-full'>
            <h4 className="text-[45px] text-center leading-[60px]">{memoizedData?.nftsCount ?? 0}</h4>
            <p className="text-[20px] text-white/50 text-center">Your NFTs</p>

            <>
              {fetchingStake || isLoading ? (
                <button className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                  <span className='flex justify-center items-center'>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    Loading...
                  </span>
                </button>
              ) : (memoizedData?.nftsCount > 0 || !address) ? (
                <div className='w-full relative mx-auto max-w-[75%]'>
                  {address && (
                    <QuantitySetter limit={memoizedData?.nftsCount ?? 1} quantity={stakeQuantity} setQuantity={setStakeQuantity} />
                  )}

                  {!address ? (
                    <ConnectWallet
                      style={{ maxHeight: "50px", marginTop: "15px", height: "40px", fontSize: "18px", minWidth: "100%", background: "#fef3c7", borderRadius: 0 }}
                      theme="dark"
                      networkSelector="open"
                      hideTestnetFaucet={true}
                      switchToActiveChain={true}
                      modalSize="wide"
                    />
                  ) : isApproved ? (
                    <Web3Button
                      contractAddress={stakeContract}
                      style={{ maxHeight: "50px", marginTop: "15px", height: "40px", fontSize: "18px", minWidth: "100%", background: "#fef3c7", borderRadius: 0 }}
                      theme="dark"
                      action={async (contract) => {
                        if (memoizedData?.nftsCount >= stakeQuantity) {
                          const nftIds = memoizedData?.nftIds.slice(0, stakeQuantity);
                          await contract.call("stake", [nftIds])
                        } else {
                          alert("You don't have enough NFTs to stake")
                        }
                      }}
                      onError={(err) => {
                        alert(err.reason?.toUpperCase() || "Uh uh! failed to unstake NFT");
                      }}
                      onSuccess={getStakeInfo}
                    >
                      Stake
                    </Web3Button>
                  ) : (
                    <Web3Button
                      contractAddress={nftContract}
                      style={{ maxHeight: "50px", marginTop: "15px", height: "40px", fontSize: "18px", minWidth: "100%", background: "#fef3c7", borderRadius: 0 }}
                      theme="dark"
                      action={async (contract) => {
                        await contract.call("setApprovalForAll", [stakeContract, address])
                      }}
                      onError={(err) => {
                        alert(err.reason?.toUpperCase() || "Uh uh! failed to unstake NFT");
                      }}
                      onSuccess={refetchApproval}
                    >
                      Approve
                    </Web3Button>
                  )}
                </div>
              ) : null}
            </>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='-mt-[10px] w-full'>
            <h4 className="text-[45px] text-center leading-[60px]">{memoizedData?.stakedCount ?? 0}</h4>
            <p className="text-[20px] text-white/50 text-center">Staked NFTs</p>

            <>
              {fetchingStake ? (
                <button className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                  <span className='flex justify-center items-center'>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    Loading...
                  </span>
                </button>
              ) : memoizedData?.stakedCount ? (
                <div className='w-full relative mx-auto max-w-[75%]'>
                  {!address ? (
                    <ConnectWallet
                      style={{ maxHeight: "50px", marginTop: "15px", height: "40px", fontSize: "18px", minWidth: "100%", background: "#fef3c7", borderRadius: 0 }}
                      theme="dark"
                      networkSelector="open"
                      hideTestnetFaucet={true}
                      switchToActiveChain={true}
                      modalSize="wide"
                    />
                  ) : (
                    <>
                      <QuantitySetter limit={memoizedData?.stakedCount ?? 1} quantity={unstakeQuantity} setQuantity={setUnstakeQuantity} />
                      <Web3Button
                        contractAddress={stakeContract}
                        style={{ maxHeight: "50px", marginTop: "15px", height: "40px", fontSize: "18px", minWidth: "100%", background: "#fef3c7", borderRadius: 0 }}
                        theme="dark"
                        action={async (contract) => {
                          if (memoizedData?.stakedCount >= unstakeQuantity) {
                            const nftIds = memoizedData?.stakedNftIds.slice(0, unstakeQuantity);
                            await contract.call("withdraw", [nftIds])
                          } else {
                            alert("You don't any staked NFTs to unstake")
                          }
                        }}
                        onError={(err) => {
                          alert(err.reason?.toUpperCase() || "Uh uh! failed to unstake NFT");
                        }}
                        onSuccess={getStakeInfo}
                      >
                        Unstake
                      </Web3Button>
                    </>
                  )}
                </div>
              ) : null}
            </>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-full'>
            <div className='-mt-[10px]'>
              <AnimatedPointsDisplay numberWithCommas={numberWithCommas} memoizedData={memoizedData} />
              <p className="text-[20px] text-white/50 text-center">Your Points</p>
            </div>
            {fetchingStake ? (
              <button className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3a9 9 0 1 0 9 9" />
                  </svg>
                  Loading...
                </span>
              </button>
            ) : null}
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-full'>
            <div className='-mt-[10px]'>
              <h4 className="text-[45px] text-center leading-[60px]">{memoizedData?.referralCount ?? 0}</h4>
              <p className="text-[20px] text-white/50 text-center">Referrals</p>
            </div>
            {fetchingStake ? (
              <button className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3a9 9 0 1 0 9 9" />
                  </svg>
                  Loading...
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-10 mx-auto w-full text-lg font-semibold text-white">
        You're earning <span className='text-amber-100'>{numberWithCommas(memoizedData?.earnRate ?? 0)} Points</span> every 10 minutes. Share your link: {" "}
        {address && memoizedData?.inviteCode ? (
          <><a className="bg-amber-100 text-black px-2 pb-[2px] pr-1" target='_blank' href={`https://blastarians.xyz/r/${memoizedData?.inviteCode}`}>{`https://blastarians.xyz/r/${memoizedData?.inviteCode}`}</a><br /></>
        ) : (
          <><span className='text-amber-100'>-----------------------------</span><br /></>
        )}
        to earn 5% Blastarian reward point of whatever your invited stakers earn when staked.
      </div>
    </div>
  )
}

function Leaderboard({ address, refetched }) {
  const [leader, setLeaderData] = useState(null);
  const [user, setUserData] = useState(null);
  const [fetchingLeaderboard, setFetchingLeaderboard] = useState(false);

  const getLeaderboardInfo = () => {
    setFetchingLeaderboard(true)
    fetch(`${BASE_URL}/leaderboard`, {
      method: 'GET'
    }).then(response => response.json())
      .then(result => {
        setLeaderData(result.data)
        setFetchingLeaderboard(false)
      })
      .catch(error => {
        setFetchingLeaderboard(false)
      });
  }

  useEffect(() => {
    getLeaderboardInfo()
  }, [refetched]);

  const getUserInfo = (address) => {
    fetch(`${BASE_URL}/leaderboard?address=${address}`, {
      method: 'GET'
    }).then(response => response.json())
      .then(result => {
        setUserData(result.data)
      })
  }

  useEffect(() => {
    address && getUserInfo(address)
  }, [refetched, address]);

  return (
    <div className="flex flex-col w-full lg:min-w-full gap-4 px-12 lg:p-12 rounded-0 lg:border lg:border-amber-100 lg:dark:border-amber-100">
      <h4 className="text-[35px] mt-7 lg:mt-0 lg:text-[45px] font-bold lg:whitespace-nowrap px-[0px] text-amber-100 pb-5 capitalize">
        Stakers Leaderboard
        <p className='text-[30px] text-white'>Total Staked: {numberWithCommas(leader?.totalStakedCount ?? 0)} ({leader?.totalStakedPercentage ?? 0}%)</p>
      </h4>

      <div>
        {fetchingLeaderboard ? (
          <button className="transparent flex justify-center items-center text-white w-full max-w-[75%] mx-auto mt-[10px] text-[20px] h-[40px] px-5 rounded-0">
            <span className='flex justify-center items-center'>
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
              Loading Leaderboard...
            </span>
          </button>
        ) : (
          <table className="caption-bottom text-sm mx-auto w-[95%] -ml-[18px] lg:ml-auto bg-background">
            <thead className="[&amp;_tr]:border-b border">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted uppercase *:border *:py-4 *:text-center *:text-base *:font-semibold">
                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] w-[140px]">Rank</th>
                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">Staker</th>
                <th className="hidden lg:table-cell h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">Staked NFTs</th>
                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">Total Points</th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0 border">
              {address ? (
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted *:border *:text-center *:text-lg *:font-semibold">
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] text-primary">{user?.user?.rank ?? "UNRANKED"}</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">YOU</td>
                  <td className="hidden lg:table-cell p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{user?.user?.staked_nft_count ?? 0}</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{numberWithCommas(user?.user?.points?.toFixed(2) ?? 0)}</td>
                </tr>
              ) : null}
              {leader?.leaders?.map((item, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted *:border *:text-center *:text-lg *:font-semibold">
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] text-primary">{item?.rank}</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{item?.address}</td>
                  <td className="hidden lg:table-cell p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{item?.staked_nft_count ?? 0}</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{numberWithCommas(item?.points?.toFixed(2) ?? 0)}</td>
                </tr>
              ))}
            </tbody>
            <caption className="mt-10 mx-auto w-fit text-lg font-semibold text-white">Blastarians Leaderboard - Block Height {Math.floor(100000 + Math.random() * 900000)}</caption>
          </table>
        )}
      </div>
    </div>
  )
}

const QuantitySetter = ({ quantity, setQuantity, limit }) => {
  return (
    <div className="flex items-center w-full justify-center gap-2 mt-4">
      <button
        className="bg-amber-100 text-black px-4 py-2 rounded-0"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        -
      </button>
      <input
        className='ring-0 resize-none text-white w-full h-[40px] px-5 rounded-0 outline-none bg-transparent border border-amber-100 text-[20px] text-center focus:outline-none focus:ring-0 focus:border-amber-100'
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Math.min(limit, Math.max(1, parseInt(e.target.value) || 1)))}
      />
      <button
        className="bg-amber-100 text-black px-4 py-2 rounded-0"
        onClick={() => setQuantity(Math.min(limit, quantity + 1))}
      >
        +
      </button>
    </div>
  );
};

const AnimatedPointsDisplay = ({ memoizedData, numberWithCommas }) => {
  const [animatedPoints, setAnimatedPoints] = useState(memoizedData?.pointEarned ?? 0);

  const earnRatePerSecond = useMemo(() => {
    const pointsPerMinute = memoizedData?.earnRate ?? 0;
    return pointsPerMinute / 600;
  }, [memoizedData?.earnRate]);

  useEffect(() => {
    setAnimatedPoints(memoizedData?.pointEarned ?? 0);
  }, [memoizedData?.pointEarned]);

  useEffect(() => {
    if (memoizedData?.stakedCount > 0) {
      const interval = setInterval(() => {
        setAnimatedPoints((prevPoints) => prevPoints + earnRatePerSecond);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [earnRatePerSecond, memoizedData?.stakedCount]);

  return (
    <h4 className="text-[45px] text-center leading-[60px]">
      {numberWithCommas(animatedPoints?.toFixed(2) ?? 0)}
    </h4>
  );
};

const numberWithCommas = (numb) => {
  if (!numb) return numb;
  const parts = numb?.toString()?.split(".");
  parts[0] = parts?.[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts?.join(".");
};

export default Stake;