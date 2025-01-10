'use client'

import React from "react";

export default function Page() {
  return (
    <>
      <div className="app-logo-content h-auto flex-grow basis-1/3 pt-4 pl-4 pb-5 relative overflow-hidden flex flex-col z-[2]">
        <div className="app-logo-content-bg absolute left-0 top-0 w-full h-full z-10">
          <img
            className="max-w-full w-full h-full align-middle border-none object-fill"
            src="https://wieldy.g-axon.work/assets/images/appModule/neature.jpg"
            alt="Neature"
          />
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(3,143,222,0.7)] z-20"></div>
        <div className="app-logo-wid text-white leading-8 mb-2 z-30">
          <h1 className="text-xl font-bold">Sign In</h1>
          <p>By Signing Up, you can avail full features of our services.</p>
          <p>Get an account !!!</p>
        </div>
        <div className="app-logo z-30">
          <img
            src="https://wieldy.g-axon.work/assets/images/logo.png"
            alt="example"
          />
        </div>
      </div>

      <div className="app-login-content flex-grow basis-2/3 p-4">
        {/* <OFormInput /> */}
        adsasd
      </div>
    </>
  );
}
