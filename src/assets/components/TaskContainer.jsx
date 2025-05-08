import { format } from "date-fns";
import { useState } from "react";

export default function TaskContainer({
  text,
  completed,
  deleteTask,
  toggleCompleted,
  createdTime,
  editTask,
}) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      <div style={{ border: "solid white", margin: "8px" }}>
        <p>{format(createdTime, "dd/MM HH:mm")}</p>

        <input
          type="text"
          value={newText}
          disabled={isDisabled}
          onChange={(e) => {
            setNewText(e.target.value);
          }}
        />
        <input
          checked={completed}
          id="checkbox"
          type="checkbox"
          onChange={toggleCompleted}
        />
        <label htmlFor="checkbox">completed?</label>
        <button onClick={deleteTask}>delete</button>

        <button
          onClick={() => {
            setEditing(!editing);
            setIsDisabled(!isDisabled);
          }}
        >
          Edit
        </button>
        {editing && (
          <>
            <button
              onClick={() => {
                editTask(newText);
                setEditing(!editing);
              }}
            >
              save
            </button>
          </>
        )}
      </div>
    </>
  );
}
