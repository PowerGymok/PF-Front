"use client";

import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = () => {

  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:3000/auth/google";

  };

  return (
    <div>
      <section >
        <button onClick={handleGoogleLogin} className="cursor-pointer flex items-center justify-center px-4 gap-4 mt-4 border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <FaGoogle />Continuar con Google
        </button>
      </section>
      
    </div>
    
  );
};

export default GoogleLoginButton;
