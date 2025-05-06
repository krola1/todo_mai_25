import { useState } from "react";
import TaskContainer from "./TaskContainer.jsx";

export default function ListContainer() {
  const [text, setText] = useState("");
  const [list, setList] = useState([{ text: "kjøp melk", completed: false }]);
  const [showCompleted, setShowCompleted] = useState(true);

  //Updates list when item is added from add-button
  const updateList = () => {
    setList([...list, { text: text, completed: false }]);
    setText("");
    console.log(list);
  };

  //deletes task when deletebutton is pressed.
  const deleteTask = (index) => {
    const tempList = list.filter((_, i) => i !== index);
    setList(tempList);
  };
  //toggles tasks completed key to the oppositte
  const toggleCompleted = (index) => {
    const tempList = [...list];
    tempList[index].completed = !tempList[index].completed;
    setList(tempList);
  };

  return (
    <>
      <div style={{ border: "solid white", height: " 75vh" }}>
        <h1>todo</h1>
        <button onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "hide completed" : "show completed"}
        </button>
        <input
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />{" "}
        <button onClick={updateList}>add</button>
        <ul>
          {list.map((task, index) => {
            if (!showCompleted && task.completed) {
              return null;
            }
            return (
              <TaskContainer
                key={index}
                text={task.text}
                completed={task.completed}
                deleteTask={() => deleteTask(index)}
                toggleCompleted={() => toggleCompleted(index)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
