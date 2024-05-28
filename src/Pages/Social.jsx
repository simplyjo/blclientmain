import React, { useMemo, useState, useEffect } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import { Footer, Navbar } from "../Components";
import { MotionAnimate } from "react-motion-animate";
import { useTwitterConnection } from '@ekaruz/react-social-auth';

const BASE_URL = "https://blastarians-api.onrender.com";

const SocialCampaign = () => {
  const [address, setAddress] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [refetched, setRefetched] = useState(1);

  useEffect(() => {
    const cachedAddress = localStorage.getItem('userAddress');
    if (cachedAddress) {
      setAddress(cachedAddress);
    }
  }, []);


  const handleConnect = (userAddress) => {
    if (/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
      setAddress(userAddress);
      setIsAddressModalOpen(false);
      localStorage.setItem('userAddress', userAddress);
    } else {
      setAddress("");
      alert("Please enter a valid EVM address.");
    }
  };
  
  return (
    <>
      <div className='lg:max-w-[97%] lg:-ml-[100px]'>
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
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="!absolute lg:!right-[120px] !top-[65px] bg-amber-100 text-black font-bold py-2 px-4"
                    >
                      {address ? "Wallet Connected" : "Connect Wallet"}
                    </button>
                  </div>

                  <div className="h-full mx-auto mt-0 lg:flex justify-center items-start">
                    <div className="block items-center justify-center lg:max-w-[85%] w-screen">
                      <Social {...{ address, refetched, setRefetched, isAddressModalOpen, setIsAddressModalOpen, handleConnect }} />
                      <Leaderboard {...{ address, refetched }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionAnimate>

      <Footer />
    </>
  );
};

function Social({ address, setRefetched, refetched, isAddressModalOpen, setIsAddressModalOpen, handleConnect }) {
  const [data, setData] = useState();
  const [copySuccess, setCopySuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowClicked, setIsFollowClicked] = useState(true);
  const [isRetweetClicked, setIsRetweetClicked] = useState(true);
  const [isLikeClicked, setIsLikeClicked] = useState(true);
  const [isShareClicked, setIsShareClicked] = useState(true);
  const [isDiscordClicked, setIsDiscordClicked] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [twitterCredentials, setTwitterCredentials] = useState(null);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [isCheckingDiscord, setIsCheckingDiscord] = useState(false);
  
  const url = new URL(window.location.href);
  const referrer = url.pathname.includes('/s/') ? url.pathname.split('/').filter(Boolean).pop() : "";

  const TWITTER_REDIRECT_URI = `${typeof window === 'object' && window.location.origin}/callback/twitter`
  const { onTwitterConnect, twitterData, isLoadingTwitter } = useTwitterConnection({
    clientId: twitterCredentials?.client_id,
    clientKeys: twitterCredentials?.client_key,
    redirect_uri: TWITTER_REDIRECT_URI,
    isOnlyGetCode: true
  });

  const claimPoints = (action) => {
    if (address) {
      setIsLoading(true);
      if(action === 'discord') {
        setIsCheckingDiscord(true);
      }

      fetch(`${BASE_URL}/social`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          ...(action && { social: action }),
          ...(referrer && { referrer }),
        }),
      })
      .then(response => response.json())
      .then(result => {
        getSocialInfo();
        setRefetched(refetched + 1);
        setIsLoading(false);
        setIsCheckingDiscord(false);
      })
      .catch(error => {
        setIsLoading(false);
        setIsCheckingDiscord(false);
      });
    }
  }

  function follow() {
    const url = "https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fetherpillar.org%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EBlastarians_&screen_name=Blastarians_"
    
    setIsLoading(true);
    setTimeout(() => {
      claimPoints("follow");
      window.open(url, '_blank');
    }, 2000);

    setTimeout(() => {
      setIsFollowClicked(true);
    }, 15000);
  }

  function like() {
    const postId = "1767065252611420419";
    const url = `https://twitter.com/intent/like?tweet_id=${postId}`;
    
    setIsLoading(true);
    setTimeout(() => {
      claimPoints("like");
      window.open(url, '_blank');
    }, 2000);

    setTimeout(() => {
      setIsLikeClicked(true);
    }, 15000);
  }

  const retweet = () => {
    const postId = "1767065252611420419";
    const url = `https://twitter.com/intent/retweet?tweet_id=${postId}`;
    
    setIsLoading(true);
    setTimeout(() => {
      claimPoints("retweet");
      window.open(url, '_blank');
    }, 2000);

    setTimeout(() => {
      setIsRetweetClicked(true);
    }, 15000);
  }

  const share = () => {
    const referralLink = `https://blastarians.xyz/s/${data?.invite_code}`
    const message = `Exciting times ahead with the upcoming $BLITZ coin by @Blastarians_ on #Blast_L2!\n\nLet’s $BLITZ and $BLAST together by participating in their social campaign.\n\nRegister here: `;
    const url = `http://twitter.com/share?text=${encodeURIComponent(message)}&url=${referralLink}`;

    setIsLoading(true);
    setTimeout(() => {
      claimPoints("share");
      window.open(url, '_blank');
    }, 2000);

    setTimeout(() => {
      setIsShareClicked(true);
    }, 15000);
  }

  const joinDiscord = () => {
    const url = "https://discord.com/invite/blastarians";
    
    setIsLoading(true);
    setIsCheckingDiscord(true);
    setTimeout(() => {
      claimPoints("discord");
      window.open(url, '_blank');
    }, 2000);

    setTimeout(() => {
      setIsDiscordClicked(true);
      claimPoints("discord");
    }, 15000);
  }

  const getSocialInfo = () => {
    if (address) {
      setIsLoading(true)
      fetch(`${BASE_URL}/social/${address}`, {
        method: 'GET'
      }).then(response => response.json())
        .then(result => {
          setTwitterCredentials(JSON.parse(atob(result?.data?.credentials)))
          setRefetched(refetched + 1)
          setTwitterConnected(!!result?.data?.twitter_token);
          setData(result.data)
          setIsLoading(false)
        })
        .catch(error => {
          setIsLoading(false)
        });
    }
  }

  useEffect(() => {
    if (address) getSocialInfo()
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      setIsConnecting(true);
      fetch(`${BASE_URL}/social`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          twitter_token: twitterData?.data?.code,
        }),
      })
      .then(response => response.json())
      .then(result => {
        setTwitterConnected(true)
        setIsConnecting(false);
      })
      .catch(error => {
        setIsConnecting(false);
      });
    }

    twitterData?.data?.code && fetchData();
  }, [twitterData]);

  useEffect(() => {
    setTwitterConnected(!!twitterData?.data?.code);
  }, [twitterData]);

  useEffect(() => {
    if (data) {
      setIsFollowClicked(data?.twitter_follow);
      setIsRetweetClicked(data?.twitter_retweet);
      setIsShareClicked(data?.twitter_share);
      setIsLikeClicked(data?.twitter_like);
      setIsDiscordClicked(data?.join_discord);
    }
  }, [data])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied');
      setTimeout(() => {
        setCopySuccess('');
      }, 10000);
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const memoizedData = useMemo(() => data, [data]);

  return (
    <div className="flex flex-col w-full lg:min-w-full px-5 lg:p-12 rounded-0 lg:border lg:border-amber-100 lg:dark:border-amber-100 !border-b-0">
      <h4 className="text-[35px] lg:text-[45px] font-bold lg:whitespace-nowrap px-[0px] text-amber-100 pb-5 capitalize">
        Blastarians Social Campaign
        <p className='mt-5 text-[20px] lg:mt-2 lg:text-[30px] text-white'>Engage your social audience and earn points</p>
      </h4>

      <div className='relative mt-10 mb-6 overflow-hidden mx-auto w-[95%] lg:max-h-[450px]'>
        <div className="grid space-y-[20px] lg:space-y-0 min-h-[750px] lg:min-h-[250px] mx-auto border divide-y lg:divide-y-0 lg:divide-x divide-amber-100 border-amber-100 grid-cols-1 lg:grid-cols-4">
          <div className='w-full h-full flex justify-center items-center'>
            <div className='-mt-[10px] w-full'>
              <h4 className="text-[45px] text-center leading-[60px]">{numberWithCommas(memoizedData?.rewardPerReferral ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Refer your friends</p>
              
              <button onClick={() => copyToClipboard(memoizedData?.invite_code ? `https://blastarians.xyz/s/${memoizedData?.invite_code}` : '')} className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[78.5%] lg:max-w-[82.5%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="w-[21px] mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                  </svg>
                  {copySuccess || 'Copy invite link'}
                </span>
              </button>
            </div>
          </div>

          <div className='w-full h-full flex justify-center items-center'>
            <div className='-mt-[10px] w-full'>
              <h4 className="text-[60px] text-center leading-[90px]">500</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Tag <span className='bg-amber-100 text-black px-1'>$BLITZ</span> or <span className='bg-amber-100 text-black px-1'>@blastarians_</span> to earn</p>
            </div>
          </div>

          <div className='w-full h-full flex justify-center items-center'>
            <div className='-mt-[10px] w-full'>
              <h4 className="text-[60px] text-center leading-[90px]">{numberWithCommas(memoizedData?.invite_count ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Referral count</p>
            </div>
          </div>

          <div className='w-full h-full flex justify-center items-center'>
            <div className='-mt-[10px] w-full'>
              <h4 className="text-[60px] text-center leading-[90px]">{numberWithCommas(memoizedData?.points ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Points earned</p>
            </div>
          </div>
        </div>

        <div className="grid space-y-[20px] lg:space-y-0 min-h-[1200px] lg:min-h-[200px] mx-auto border border-t-0 divide-y lg:divide-y-0 lg:divide-x divide-amber-100 border-amber-100 grid-cols-1 lg:grid-cols-5">
          <div className="w-full h-full flex justify-center items-center">
            <div className={`${isShareClicked && "grayscale opacity-10 blur-[2px] pointer-events-none select-none"} -mt-[10px] w-full`}>
              <h4 className="text-[45px] text-center leading-[60px]">{numberWithCommas(memoizedData?.rewardPerTwitterShare ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Share a post</p>
              <button onClick={share} disabled={isShareClicked} className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="w-[21px] mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                  </svg>
                  Share
                </span>
              </button>
            </div>
          </div>

          <div className="w-full h-full flex justify-center items-center">
            <div className={`${isFollowClicked && "grayscale opacity-10 blur-[2px] pointer-events-none select-none"} -mt-[10px] w-full`}>
              <h4 className="text-[45px] text-center leading-[60px]">{numberWithCommas(memoizedData?.rewardPerTwitterFollow ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Follow account</p>
              <button onClick={follow} disabled={isFollowClicked} className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="w-[21px] mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                  </svg>
                  Follow
                </span>
              </button>
            </div>
          </div>

          <div className='w-full h-full flex justify-center items-center'>
            <div className={`${isLikeClicked && "grayscale opacity-10 blur-[2px] pointer-events-none select-none"} -mt-[10px] w-full`}>
              <h4 className="text-[45px] text-center leading-[60px]">{numberWithCommas(memoizedData?.rewardPerTwitterLike ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Like a post</p>
              <button onClick={like} disabled={isLikeClicked} className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="w-[21px] mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                  </svg>
                  Like
                </span>
              </button>
            </div>
          </div>
          
          <div className='w-full h-full flex justify-center items-center'>
            <div className={`${isRetweetClicked && "grayscale opacity-10 blur-[2px] pointer-events-none select-none"} -mt-[10px] w-full`}>
              <h4 className="text-[45px] text-center leading-[60px]">{numberWithCommas(memoizedData?.rewardPerTwitterRetweet ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Retweet a post</p>
              <button onClick={retweet} disabled={isRetweetClicked} className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="w-[21px] mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                  </svg>
                  Retweet
                </span>
              </button>
            </div>
          </div>

          <div className='w-full h-full flex justify-center items-center'>
            <div className={`${isDiscordClicked && "grayscale opacity-10 blur-[2px] pointer-events-none select-none"} -mt-[10px] w-full`}>
              <h4 className="text-[45px] text-center leading-[60px]">{numberWithCommas(memoizedData?.rewardPerDiscord ?? 0)}</h4>
              <p className="text-[20px] text-white/50 text-center lg:pb-[5px]">Join discord</p>
              <button onClick={joinDiscord} disabled={isDiscordClicked} className="bg-amber-100 flex justify-center items-center text-black w-full max-w-[75%] mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                <span className='flex justify-center items-center'>
                  <svg className="w-[21px] mr-[5px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                    <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                    <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
                    <path d="M7 16.5c3.5 1 6.5 1 10 0" />
                  </svg>
                  Join
                </span>
              </button>
            </div>
          </div>
        </div>

        {(!twitterConnected || isLoading) && (
          <div className='absolute w-full border border-amber-100 left-0 flex justify-center items-start pt-[100px] lg:pt-0 lg:items-center right-0 h-full top-0 bottom-0 mx-auto max-h bg-black/90'>
            <div className='lg:max-w-[60%] min-w-[30%] mx-auto'>
              {!address ? (
                <>
                  <h4 className="text-[35px] text-center lg:text-[45px] font-bold px-[0px] text-amber-100 pb-5 capitalize">
                    <p className='text-[30px] text-white'>Connect your wallet</p>
                  </h4>
                  <button onClick={() => setIsAddressModalOpen(true)} className="bg-amber-100 flex justify-center  mx-auto items-center text-black w-full mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                    <span className='flex justify-center items-center'>
                      <svg className="w-[35px] pr-[7px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054z" />
                        <path d="M4 20l3.5 -3.5" />
                        <path d="M15 4l-3.5 3.5" />
                        <path d="M20 9l-3.5 3.5" />
                      </svg>
                      Connect Wallet
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {(isConnecting || isLoadingTwitter || isLoading) ? (
                    <>
                      <h4 className="text-[35px] text-center lg:text-[45px] font-bold px-[0px] text-amber-100 pb-5 capitalize">
                        <p className='text-[30px] text-white'>Verifying Twitter</p>
                      </h4>
                      <button className="bg-amber-100 flex justify-center items-center text-black w-full mx-auto mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                        <span className='flex justify-center items-center'>
                          <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3a9 9 0 1 0 9 9" />
                          </svg>
                          {isCheckingDiscord ? 'Checking Discord...' : 'Connecting Twitter...'}
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <h4 className="text-[35px] text-center lg:text-[45px] font-bold px-[0px] text-amber-100 pb-5 capitalize">
                        <p className='text-[30px] text-white'>Connect Your Twitter </p>
                      </h4>
                      <button onClick={onTwitterConnect} className="bg-amber-100 flex justify-center  mx-auto items-center text-black w-full mt-[10px] text-[18px] h-[40px] px-5 rounded-0">
                        <span className='flex justify-center items-center'>
                          <svg className="w-[21px] mr-[10px]" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                          </svg>
                          Connect Twitter
                        </span>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onConnect={handleConnect}
        />
      </div>
    </div>
  )
}

function AddressModal({ isOpen, onClose, onConnect }) {
  const [address, setAddress] = useState('');

  return (
    isOpen ? (
      <div className="absolute top-0 inset-0 bg-[#0b0b0b] bg-opacity-50 flex justify-center items-start pt-[20px] lg:pt-0 lg:items-center">
        <div className="bg-[#0b0b0b] w-[90%] lg:w-[45%] border border-amber-100 p-7 rounded-0">
          <h2 className="text-lg text-amber-100 font-bold mb-4">Enter Your Wallet Address</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border focus:outline-none focus:ring-0 !border-amber-100 py-2 text-white px-4 bg-transparent w-full mb-3"
            placeholder="0x......."
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
            >
              Close
            </button>
            <button
              onClick={() => {
                onConnect(address);
                onClose();
              }}
              className="w-full bg-amber-100 text-black font-bold py-2 px-4"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
}

function Leaderboard({ address, refetched }) {
  const [leader, setLeaderData] = useState(null);
  const [user, setUserData] = useState(null);
  const [fetchingLeaderboard, setFetchingLeaderboard] = useState(false);

  const getLeaderboardInfo = () => {
    setFetchingLeaderboard(true)
    fetch(`${BASE_URL}/social/leaderboard`, {
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
    fetch(`${BASE_URL}/social/leaderboard?address=${address}`, {
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
    <div className="flex flex-col w-full lg:min-w-full gap-4 px-5 lg:p-12 rounded-0 lg:border lg:border-amber-100 lg:dark:border-amber-100">
      <h4 className="text-[35px] mt-7 lg:mt-0 lg:text-[45px] font-bold lg:whitespace-nowrap px-[0px] text-amber-100 pb-5 capitalize">
        Social Campaign Leaderboard
        <p className='text-[30px] text-white'>
          Today's Social Leader:
          <span className="text-amber-100 ml-3">{leader?.leaders?.[0]?.address}</span>
        </p>
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
          <table className="caption-bottom text-sm mx-auto w-[95%] lg:ml-auto bg-background">
            <thead className="[&amp;_tr]:border-b border">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted uppercase *:border *:py-4 *:text-center *:text-base *:font-semibold">
                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] w-[140px]">Rank</th>
                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">Blastarian</th>
                <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">Points Earned</th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0 border">
              {address ? (
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted *:border *:text-center *:text-lg *:font-semibold">
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] text-primary">{user?.user?.rank ?? "UNRANKED"}</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">YOU</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{numberWithCommas(user?.user?.points?.toFixed(2) ?? 0)}</td>
                </tr>
              ) : null}

              {leader?.leaders?.map((item, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted *:border *:text-center *:text-lg *:font-semibold">
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] text-primary">{item?.rank}</td>
                  <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">{item?.address}</td>
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

const numberWithCommas = (numb) => {
  if (!numb) return numb;
  const parts = numb?.toString()?.split(".");
  parts[0] = parts?.[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts?.join(".");
};

export default SocialCampaign;