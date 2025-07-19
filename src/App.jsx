import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#$%^&{*}[]/>,<:";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numAllowed, charAllowed, length, setPassword]);

  const copytoClipboard = useCallback(() => {
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,8);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // const passwordGenerator =() => {
  //   let pass = "";
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  //   if (numAllowed) {
  //     str += "0123456789";
  //   } if (charAllowed) {
  //     str += "@#$%^&{*}[]\/>,<:";
  //   }
  //   for (let i = 1; i <=length; i++) {
  //     let char = Math.floor(Math.random() * str.length + 1);
  //     pass += str.charAt(char);
  //   }
  //   setPassword(pass);
  // }

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);
  return (
    <>
      <div className="h-screen  flex flex-col justify-center items-center  ">
        <div className="w-full max-w-md rounded-lg px-4 py-8 bg-zinc-400 text-black">
          <h1 className="text-xl text-center">Password Generator</h1>
          <div className="flex">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="generate"
              className="w-full py-1 px-3 border-1 rounded-l-lg outline-0"
              ref={passwordref}
            />
            <button
              className=" flex content-center p-2 rounded-br-lg font-semibold cursor-pointer rounded-tr-lg shrink-0 bg-blue-600"
              onClick={copytoClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center justify-center px-2 py-3">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length:({length})</label>
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
                // passwordGenerator()
              }}
              className="ml-3"
            />
            <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              // onClick={()=>{passwordGenerator()}}
              className="ml-3"
            />
            <label htmlFor="charInput">Characters</label>
          </div>
          <div className=" flex justify-center items-center ">
            <button
              className="border-2 rounded-lg px-4 py-2"
              onClick={() => {
                passwordGenerator();
              }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
