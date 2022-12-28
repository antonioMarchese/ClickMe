import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRotateLeft,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

interface Coordinates {
  x: number;
  y: number;
  color: string;
  size: number;
}

const colors = ["176, 215, 255", "220, 127, 155", "247, 161, 196"];

function App() {
  const [list, setList] = useState<Coordinates[]>([]);
  const [size, setSize] = useState(20);

  const handleClick = (e: any) => {
    const newDot = {
      x: Number(e.pageX),
      y: Number(e.pageY),
      color: `rgb(${colors[Math.floor(Math.random() * 3)]})`,
      size,
    };
    setList([...list, newDot]);
  };

  const clearAll = (e: any) => {
    e.stopPropagation();
    setList([]);
    setSize(20);
  };

  const undo = (e: any) => {
    e.stopPropagation();
    setList(list.slice(0, -1));
  };

  const increase = (e: any) => {
    e.stopPropagation();
    size >= 99 ? setSize(size) : setSize(size + 1);
  };

  const decrease = (e: any) => {
    e.stopPropagation();
    size <= 10 ? setSize(10) : setSize(size - 1);
  };

  return (
    <div id="page" onClick={handleClick}>
      <div className="buttons">
        <button onClick={clearAll}>
          <FontAwesomeIcon icon={faTrash} size={"2x"} />
        </button>
        <button onClick={undo}>
          <FontAwesomeIcon icon={faRotateLeft} size={"2x"} />
        </button>
        <div className="sizing" onClick={(e) => e.stopPropagation()}>
          <button onClick={increase}>
            <FontAwesomeIcon icon={faPlus} size={"xl"} />
          </button>
          {size}
          <button onClick={decrease}>
            <FontAwesomeIcon icon={faMinus} size={"xl"} />
          </button>
        </div>
      </div>
      {list.map((dot, index) => (
        <span
          key={index}
          className="dot"
          style={{
            left: dot.x,
            top: dot.y,
            backgroundColor: dot.color,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default App;
