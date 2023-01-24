import React, { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";
import { useEffect } from "react";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 로그인 상태/로그아웃 상태 분기해줄 수 있음 onAuthStateChanged()
      // 로그인 했을 떄, user의 정보가 여기에 있음
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "초기화중..."
      )}
      {/* {isLoggedIn ? "로그인됨" : <Auth />} */}
      <footer>&copy; {new Date().getFullYear()} Bwitter</footer>
    </>
  );
}

export default App;
