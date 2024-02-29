import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(5);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const passRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) str += "1234567890";
    if (isChar) str += "~!@#$%^&*()_+-*/";
    let pass = "";
    for (let i = 0; i < length; i++) {
      const r = Math.floor(Math.random() * str.length);
      pass += str[r];
    }
    setPassword(pass);
  }, [length, isNum, isChar]);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNum, isChar, passwordGenerator]);
  return (
    <div className="w-screen h-screen bg-gray-700">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  bg-gray-800 text-orange-500">
        <div className="my-1 ">
          <input
            className="rounded-xl w-80 px-1 mx-1 my-2 outline-none"
            type="text"
            value={password}
            ref={passRef}
          />
          <button
            className="rounded-xl bg-gray-500 px-3"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name="length"
              value={length}
              className="cursor-pointer"
              min={5}
              max={50}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length" className="shadow">
              Length({length})
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="charCheckbox"
              defaultChecked={isChar}
              onChange={() => {
                setIsChar((prev) => !prev);
              }}
            />
            <label htmlFor="charCheckbox" className="shadow">
              Char
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="numCheckbox"
              defaultChecked={isNum}
              onChange={() => {
                setIsNum((prev) => !prev);
              }}
            />
            <label htmlFor="numCheckbox" className="shadow">
              Num
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
