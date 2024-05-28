import { React } from "react";
import {

  rocket,
  naut
} from "../Assets";

import { MotionAnimate } from "react-motion-animate";
import { Footer, Navbar } from "../Components";


const Home = () => {

  return (
    <div>
      <Navbar />
      <MotionAnimate
        animation='fadeInUp'
        reset={true}
        distance={200}
        delay={1}
        speed={1}>

        <section className="h-screen flex flex-wrap items-center justify-between content-center m-4 p-4 md:m-12 md:p-12 rounded-2xl  shadow-xl shadow-black/50 bg-no-repeat bg-cover bg-center"
        >
          <div className=" ">
            <h1 className="text-amber-100 text-left font-bold text-5xl xl:text-8xl">
              Blastarians
            </h1>

            <p className=" py-3 text-gray-300 text-left">
              Where creativity meets ultimate yield
            </p>

            <div className="py-5">
              <button className="block py-3 px-10 font-medium text-center text-black bg-yellow rounded-xl shadow-2xl shadow-yellow/30 hover:shadow-yellow/50">
                <a href="/mint">
                  Mint

                </a>
              </button>

            </div>

          </div>
          <div className="text-end flex content-end items-end justify-items-end" >

            <img src={rocket} className="img w-[400px]" />
            <div>

            </div>

            <div>

            </div>

          </div>


        </section>

      </MotionAnimate>


      {/* Landing */}
      <section className="h-screen flex flex-wrap items-center justify-between content-center m-4 p-4 md:m-12 md:p-12 rounded-2xl  shadow-xl shadow-black/50 bg-no-repeat bg-cover bg-center"
      >

        <div className="text-end flex col-span-5 content-end items-end justify-items-end">

          <img src={naut} className="img w-[600px]" />

        </div>
        <div className="col-span-5 ">
          <h1 className="text-amber-100 text-left font-bold text-2xl xl:text-8xl">
            Built on Blast
          </h1>

          <p className="text-gray-300 text-2xl">
            To Last
          </p>

        </div>






      </section>

      <Footer />

    </div>
  );
};

export const shortenString = (value, length = 4) => {
  if (!value) return '';
  if (length >= value?.length) return value;
  return `${value.slice(0, length + 2)}...${value.slice(-length)}`;
}

export const compareStrings = (str1, str2) => {
  return str1?.toLowerCase() === str2?.toLowerCase();
}

export default Home;


