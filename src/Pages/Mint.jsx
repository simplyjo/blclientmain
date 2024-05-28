import React, { useMemo, useState, useEffect } from 'react';
import { ConnectWallet, detectContractFeature, useActiveClaimConditionForWallet, useAddress, useClaimConditions, useClaimedNFTSupply, useClaimerProofs, useClaimIneligibilityReasons, useContract, useContractMetadata, useUnclaimedNFTSupply, Web3Button, } from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import { ClaimEligibility } from "@thirdweb-dev/sdk";
import Countdown from './countdown';
import { Footer, Navbar } from "../Components";

const MintNFT = () => {
  const theme = "dark";
  let quantity = 1;
  const contractAddress = "0xC6f85C3768beb29A715E1EB7B44B1B1C8d84B202"
  const contractQuery = useContract(contractAddress);
  const contractMetadata = useContractMetadata(contractQuery.contract);
  const address = useAddress();

  const claimConditions = useClaimConditions(contractQuery.contract);
  const activeClaimCondition = useActiveClaimConditionForWallet(contractQuery.contract, address);
  const claimerProofs = useClaimerProofs(contractQuery.contract, address || "");

  const unclaimedSupply = useUnclaimedNFTSupply(contractQuery.contract);
  const claimedSupply = useClaimedNFTSupply(contractQuery.contract);
  const [message, setMessage] = useState("");

  function parseIneligibility(
    reasons,
    quantity = 0,
  ) {
    if (!reasons.length) {
      return "";
    }

    const reason = reasons[0];

    if (
      reason === ClaimEligibility.Unknown ||
      reason === ClaimEligibility.NoActiveClaimPhase ||
      reason === ClaimEligibility.NoClaimConditionSet
    ) {
      return "This drop is not ready to be minted.";
    } else if (reason === ClaimEligibility.NotEnoughTokens) {
      return "You don't have enough currency to mint.";
    } else if (reason === ClaimEligibility.AddressNotAllowed) {
      if (quantity > 1) {
        return `You are not eligible to mint ${quantity} NFT.`;
      }

      return "You are not eligible to mint NFT.";
    }

    return reason;
  }

  const claimIneligibilityReasons = useClaimIneligibilityReasons(contractQuery.contract,
    { quantity, walletAddress: address || "" }
  );

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    return BigNumber.from(claimedSupply.data || 0)
      .add(BigNumber.from(unclaimedSupply.data || 0))
      .toString();
  }, [claimedSupply.data, unclaimedSupply.data]);

  const priceToMint = useMemo(() => {
    let bnPrice = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0,
    );

    if (bnPrice.eq(0)) {
      bnPrice = utils.parseUnits("0.01", "ether");
    }

    return `${utils.formatUnits(
      bnPrice.mul(quantity).toString(),
      activeClaimCondition.data?.currencyMetadata.decimals || 18,
    )} ${activeClaimCondition.data?.currencyMetadata.symbol ?? "ETH"}`;
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const isOpenEdition = useMemo(() => {
    if (contractQuery?.contract) {
      const contractWrapper = (contractQuery.contract).contractWrapper;

      const featureDetected = detectContractFeature(
        contractWrapper,
        "ERC721SharedMetadata",
      );

      return featureDetected;
    }
    return false;
  }, [contractQuery.contract]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0,
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(5555);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0,
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(5555);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === "0") {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(5555);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    const maxAvailable = BigNumber.from(unclaimedSupply.data || 0);

    let max;
    if (maxAvailable.lt(bnMaxClaimable) && !isOpenEdition) {
      max = maxAvailable;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(5555)) {
      return 5555;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    unclaimedSupply.data,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);
  quantity = maxClaimable > 2 ? maxClaimable : 1;

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(0)) ||
        (numberClaimed === numberTotal && !isOpenEdition)
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
    isOpenEdition,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return (
      activeClaimCondition.isLoading ||
      unclaimedSupply.isLoading ||
      claimedSupply.isLoading ||
      !contractQuery.contract
    );
  }, [
    activeClaimCondition.isLoading,
    contractQuery.contract,
    claimedSupply.isLoading,
    unclaimedSupply.isLoading,
  ]);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading],
  );

  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return "Minting Ended";
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0,
      );
      if (pricePerToken.eq(0)) {
        return "Mint (Free)";
      }
      return `Mint (${priceToMint})`;
    }
    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }
    if (buttonLoading) {
      return "Checking eligibility...";
    }

    return "Minting not available";
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  const dropNotReady = useMemo(
    () =>
      claimConditions.data?.length === 0 ||
      claimConditions.data?.every((cc) => cc.maxClaimableSupply === "0"),
    [claimConditions.data],
  );

  const dropStartingSoon = useMemo(
    () =>
      (claimConditions.data &&
        claimConditions.data.length > 0 &&
        activeClaimCondition.isError) ||
      (activeClaimCondition.data &&
        activeClaimCondition.data.startTime > new Date()),
    [
      activeClaimCondition.data,
      activeClaimCondition.isError,
      claimConditions.data,
    ],
  );

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, [message])

  const stats = [
    { id: 1, name: 'Total NFT Supply', value: numberTotal },
    { id: 2, name: 'NFT Mint Price', value: priceToMint },
    { id: 2, name: 'Mint Phases', value: '2' },
    { id: 3, name: 'NFT Mint Date', value: 'Today, 4pm UTC' },
  ]

  return (
    <>
      <div className='lg:max-w-[80%] lg:-ml-[20px]'>
        <Navbar/>
      </div>
      <div className="h-fit flex flex-wrap items-center justify-between content-center rounded-2xl bg-no-repeat bg-cover bg-center">
        <div className="lg:mt-[20px] lg:mb-[130px] flex min-h-full flex-col justify-center items-center py-16 mx-auto md:px-24 lg:px-8 lg:pt-5 bg-no-repeat bg-cover bg-center !p-0">
          <div className="mb-10 sm:text-center md:mb-0">
            <div className="mx-auto">
              <div className="space-y-4 h-full">
                <div className="hidden lg:block">
                  <ConnectWallet
                    className="!absolute bg-yellow lg:!right-[190px] !top-[60px]"
                    theme={theme}
                    style={{background: "yellow"}}
                    networkSelector="open"
                    hideTestnetFaucet={true}
                    switchToActiveChain={true}
                    modalSize="wide"
                    modalTitleIconUrl=""
                  />
                </div>

                <div className="h-full mx-auto mt-0 lg:flex justify-center items-center">
                  <div className="flex items-center justify-center lg:max-w-[73%] w-screen h-fit col-span-1 lg:col-span-7">
                    <div className="flex flex-col w-full lg:min-w-full gap-4 px-12 lg:p-12 rounded-0 lg:border lg:border-amber-100 lg:dark:border-amber-100">
                      <h4 className="text-[35px] lg:text-[45px] font-bold lg:whitespace-nowrap px-[0px] text-amber-100 pb-5 capitalize">
                        First Pixelated NFTs art on Blast.
                      </h4>

                      {message && (
                        <p className="text-[20px] text-red-400 pb-5 capitalize">{"Error was encountered while trying to mint NFT, check and try again."}</p>
                      )}

                      <a target='_blank' href={`https://blastexplorer.io/address/${contractAddress}`} style={{overflowWrap: "anywhere"}} className='hover:bg-yellow hidden lg:block bg-amber-100 text-black rounded-[0px] w-fit mx-auto px-3 py-2 mb-5'>
                        <p>CA: {contractAddress}</p>
                      </a>

                      <div className="flex flex-col mx-auto w-full gap-2 xs:gap-4">
                        {isLoading ? (
                          <div
                            role="status"
                            className="space-y-8 animate-pulse md:flex mx-auto md:items-center md:space-x-8 md:space-y-0"
                          >
                            <div className="w-full">
                              <div className="w-24 h-[30px] mb-[10px] bg-amber-100 rounded-0 dark:bg-yellow"></div>
                            </div>
                          </div>
                        ) : isOpenEdition ? null : (
                          <p>
                            <span className="text-lg font-bold tracking-wider text-gray-500 xs:text-xl lg:text-2xl">
                              {numberClaimed}
                            </span>{" "}
                            <span className="text-lg font-bold tracking-wider xs:text-xl lg:text-2xl">
                              / {numberTotal} minted
                            </span>
                          </p>
                        )}
                        <h1 className="text-2xl font-bold line-clamp-1 xs:text-3xl lg:text-4xl">
                          {contractMetadata.isLoading ? (
                            <div
                              role="status"
                              className="space-y-8 animate-pulse mx-auto md:flex md:items-center md:space-x-8 md:space-y-0"
                            >
                              <div className="w-full">
                                <div className="w-48 h-8 bg-amber-100 rounded-0 mx-auto dark:bg-amber-100"></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            activeClaimCondition?.data?.metadata?.name ?? contractMetadata?.data?.name
                          )}
                        </h1>
                        {contractMetadata.data?.description ||
                          contractMetadata.isLoading ? (
                          <div className="text-gray-500 line-clamp-2">
                            {contractMetadata.isLoading ? (
                              <div
                                role="status"
                                className="space-y-8 animate-pulse md:flex md:items-center md:space-x-8 md:space-y-0"
                              >
                                <div className="w-full">
                                  <div className="mb-2.5 h-3 mt-[10px] max-w-full rounded-0 bg-amber-100 dark:bg-amber-100"></div>
                                </div>
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              contractMetadata.data?.description
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex w-full gap-4">
                        {isLoading ? (
                          <div className="lg:flex justify-center space-y-[20px] lg:space-y-0 mx-auto lg:space-x-[20px] mt-[40px] items-center">
                            <div
                              role="status"
                              className="space-y-8 animate-pulse md:flex mx-auto md:items-center md:space-x-8 md:space-y-0"
                            >
                              <div className="w-full">
                                <div className="w-[250px] h-10 bg-amber-100 rounded-0 dark:bg-amber-100"></div>
                              </div>
                            </div>
                            <div
                              role="status"
                              className="space-y-8 animate-pulse md:flex mx-auto md:items-center md:space-x-8 md:space-y-0"
                            >
                              <div className="w-full">
                                <div className="lg:w-[150px] h-10 bg-amber-100 rounded-0 dark:bg-amber-100"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {dropNotReady ? (
                              <span className="text-red-500 mx-auto">
                                This drop is not ready to be minted yet.
                              </span>
                            ) : dropStartingSoon ? (
                              <Countdown />
                            ) : (
                              <div className="flex flex-col w-full gap-4">
                                <div className="w-[90%] mt-[10px] mx-auto bg-gray-500 rounded-0 h-2 mb-4 dark:bg-gray-500">
                                  <div className="bg-yellow h-full rounded-0 dark:bg-yellow" style={{ width: `${numberTotal > 0 ? numberClaimed / numberTotal * 100 : 0}%` }}></div>
                                </div>

                                <div className="flex flex-col w-full gap-4 lg:flex-row lg:items-center lg:gap-4 ">
                                  <div className="flex w-full px-2 border border-gray-400 rounded-0 h-[50px] dark:border-amber-100 md:w-full">
                                    <p className="flex items-center justify-center w-full h-full font-mono text-center dark:text-amber-100 lg:w-full">
                                      {!isLoading && isSoldOut ? "Sold Out" : `${quantity} NFT to mint`}
                                    </p>
                                  </div>
                                  <Web3Button
                                    contractAddress={contractQuery.contract?.getAddress() || ""}
                                    style={{ maxHeight: "50px", height: "50px", minWidth: "50%", background: "yellow", borderRadius: 0 }}
                                    theme={theme}
                                    action={(cntr) => cntr.erc721.claim(quantity)}
                                    isDisabled={!canClaim || buttonLoading}
                                    onError={(err) => {
                                      setMessage(err.reason || "Uh uh! failed to mint NFT");
                                    }}
                                    onSuccess={() => {
                                      setMessage("The NFT has been minted Successfully");
                                    }}
                                  >
                                    {buttonLoading ? (
                                      <div role="status">
                                        <svg
                                          aria-hidden="true"
                                          className="w-4 h-4 mr-2 text-amber-100 animate-spin fill-blue-600 dark:text-white/70"
                                          viewBox="0 0 100 101"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                          />
                                          <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                          />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                      </div>
                                    ) : (
                                      buttonText
                                    )}
                                  </Web3Button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-[50px] lg:pt-[100px]">
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

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MintNFT;