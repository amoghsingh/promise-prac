import { useEffect } from "react";

import "./App.css";
import axios from "axios";

function App() {
  let source = axios.CancelToken.source();

  const getPosts = async () => {
    setTimeout(async () => {
      let response: any = await axios(
        "https://jsonplaceholder.typicode.com/posts",
        {
          cancelToken: source.token,
        }
      ).catch((error: any) => {
        if (axios.isCancel(error)) {
          alert("Request cancelled" + error.message);
        } else {
          console.log(error);
        }
      });
      console.log(response.data);
    }, 3000);
  };

  useEffect(() => {
    getPosts();

    return () => {};
  }, []);

  const stopRequest = () => {
    if (source) {
      alert("Stoping the request");
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            stopRequest();
          }}
        >
          Stop
        </button>
      </div>
    </>
  );
}

export default App;
