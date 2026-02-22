"use client";

const GoogleLoginButton = () => {

  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:3000/auth/google";

  };

  return (
    <button onClick={handleGoogleLogin}>
      Continuar con Google
    </button>
  );
};

export default GoogleLoginButton;
