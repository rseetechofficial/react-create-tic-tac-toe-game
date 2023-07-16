import { useState } from "react";
import FirstComponent from "./FirstComponent";
import FirstInfomation from "./FirstInfomation";

function App() {
  const [values, setValue] = useState(Array(9).fill(""));
  const [play, setPlay] = useState("x");
  const [winner, setWinner] = useState(null);

  const checkEndTheGame = () => {
    for (let value of values) {
      if (!value) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        return values[a];
      }
    }
    return null;
  };

  const updateCircle = (ind) => {
    if (values[ind] || winner) {
      return;
    }
    const s = values;
    s[ind] = play;
    setValue(s);
    setPlay(play === "x" ? "o" : "x");
    const W = checkWinner();
    if (W) {
      setWinner(W);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
  };

  const resetGame = () => {
    setValue(Array(9).fill(""));
    setPlay("x");
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <FirstInfomation resetGame={resetGame} />
      <div className="game">
        {Array.from("012345678").map((ind) => (
          <FirstComponent
            key={ind}
            ind={ind}
            updateCircle={updateCircle}
            clsName={values[ind]}
          />
        ))}
      </div>
      <div className={`play ${play === "x" ? "left" : "right"}`}>
        <FirstComponent clsName="x" />
        <FirstComponent clsName="o" />
      </div>

      {winner && (
        <div
          key={"parent-box"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="winner"
        >
          <div
            key={"child-box"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text"
          >
            <h2
              initial={{ scale: 0, y: 100 }}
              animate={{
                scale: 1,
                y: 0,
                transition: {
                  y: { delay: 0.7 },
                  duration: 0.7
                }
              }}
            >
              {winner === "x | o"
                ? "No buddy is winner :"
                : "Winnner is :- " + winner}
            </h2>
            <div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  delay: 1.3,
                  duration: 0.2
                }
              }}
              className="win"
            >
              {winner === "x | o" ? (
                <>
                  <FirstComponent clsName="x" />
                  <FirstComponent clsName="o" />
                </>
              ) : (
                <>
                  <FirstComponent clsName={winner} />
                </>
              )}
            </div>
            <div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { delay: 1.5, duration: 0.3 }
              }}
            >
              <FirstInfomation resetGame={resetGame} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
