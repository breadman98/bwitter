import { dbService } from "fbase";
import React, { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [bweet, setBweet] = useState("");
  const [bweets, setBweets] = useState([]);

  const getBweets = async () => {
    const dbBweets = await dbService.collection("bweets").get();
    dbBweets.forEach((docs) => {
      const bweetsObj = {
        ...docs.data(),
        id: docs.id,
      };
      setBweets((prev) => [bweetsObj, ...prev]);
    });
  };

  useEffect(() => {
    getBweets();
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
