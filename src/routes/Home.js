import { dbService } from "fbase";
import React, { useState } from "react";
import { useEffect } from "react";

function Home({ userObj }) {
  const [bweet, setBweet] = useState("");
  const [bweets, setBweets] = useState([]);
  // console.log(userObj.uid);

  // // collection에 있는 것을 get 하는 방식
  // // -> realtime이 아니라 이미 컬렉션에 있는 것을 가져오는 방식 -> 새로고침으로 렌더링필요
  // const getBweets = async () => {
  //   const dbBweets = await dbService.collection("bweets").get();
  //   dbBweets.forEach((docs) => {
  //     const bweetsObj = {
  //       ...docs.data(),
  //       id: docs.id,
  //     };
  //     setBweets((prev) => [bweetsObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    //getBweets();
    dbService
      .collection("bweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const bweetsArray = snapshot.docs.map((docs) => ({
          id: docs.id,
          ...docs.data(),
        }));
        setBweets(bweetsArray);
      });
  }, []);
  // useEffect에 async/awit 쓸거면 함수 밖에 써준거를
  // 안에서 호출하던지
  // 안에다가 async함수 만들어서 호출하던가 하면 됨

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("bweets").add({
      //bweet:bweet,
      bweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setBweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setBweet(value);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={bweet}
            placeholder="What's on your mind?"
            maxLength={50}
            onChange={onChange}
          />
          <input type="submit" value="Bweet" />
        </form>

        {/* 화면에 텍스트 렌더링 */}
        <div>
          {bweets.map((bw) => (
            <div key={bw.id}>
              <h4>{bw.bweet}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
