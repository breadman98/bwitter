import React, { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";
import { useEffect } from "react";
import Auth from "routes/Auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인 상태/로그아웃 상태 분기해줄 수 있음 onAuthStateChanged()
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "초기화중..."}
      {/* {isLoggedIn ? "로그인됨" : <Auth />} */}
      <footer>&copy; {new Date().getFullYear()} Bwitter</footer>
    </>
  );
}

export default App;
