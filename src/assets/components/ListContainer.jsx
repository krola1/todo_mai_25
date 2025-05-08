import { useEffect, useState } from "react";
import TaskContainer from "./TaskContainer.jsx";
import { format } from "date-fns";

export default function ListContainer() {
  const [text, setText] = useState("");
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("todoList");
    return storedList ? JSON.parse(storedList) : [];
  });

  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  //Updates list when item is added from add-button
  const updateList = () => {
    if (text.trim() !== "") {
      setList([
        ...list,
        { text: text.trim(), completed: false, createdTime: new Date() },
      ]);
      setText("");
      console.log(list[0].createdTime);
    }
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

  const editTask = (index, newText) => {
    const tempList = [...list];
    tempList[index].text = newText.trim();
    setList(tempList);
  };

  return (
    <>
      <div style={{ border: "solid white", height: " 75vh" }}>
        <h1>Todo</h1>
        <input
          style={{ gap: "10px" }}
          id="checked"
          type="checkbox"
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <label htmlFor="checked">Show Completed</label>
        <input
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateList();
          }}
        />
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
                createdTime={task.createdTime}
                deleteTask={() => deleteTask(index)}
                toggleCompleted={() => toggleCompleted(index)}
                editTask={(newText) => editTask(index, newText)}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
