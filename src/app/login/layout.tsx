import React from 'react'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-login-wrap h-screen flex flex-col justify-center items-center overflow-hidden pt-5">
      <div className="app-login-container w-11/12 h-auto max-w-2xl min-h-96 mx-5 pb-5">
        <div className="app-login-main-content flex flex-col flex-wrap rounded-xl overflow-hidden bg-white drop-shadow-lg md:flex-row">
          {children}
        </div>
      </div>
    </div>
  );
}
    