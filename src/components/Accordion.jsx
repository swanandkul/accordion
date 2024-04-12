import { useState } from "react";
import data from "../data";
import "../styles.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  const handleSingleSelection = (currentId) => {
    let itemId = selected === currentId ? null : currentId;
    setSelected(itemId);
  };

  const handleMultipleSelection = (currentId) => {
    let copyMultipleSelected = [...multipleSelected];
    let currentIdIndex = copyMultipleSelected.indexOf(currentId);
    if (currentIdIndex === -1) copyMultipleSelected.push(currentId);
    else copyMultipleSelected.splice(currentIdIndex, 1);
    setMultipleSelected(copyMultipleSelected);
  };

  return (
    <div className="wrapper">
      <div className="accordion">
        <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
          Enable Multiple Selection
        </button>
        {data.map((item) => (
          <div className="item" key={item.id}>
            <div className="title">
              <h2
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(item.id)
                    : () => handleSingleSelection(item.id)
                }
              >
                {item.title}
              </h2>
              <span>{selected && selected === item.id ? "-" : "+"}</span>
            </div>
            <div className="content">
              {enableMultiSelection
                ? multipleSelected.indexOf(item.id) !== -1 && item.content
                : selected && selected === item.id && item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
