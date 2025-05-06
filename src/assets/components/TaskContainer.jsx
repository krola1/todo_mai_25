export default function TaskContainer({
  text,
  completed,
  deleteTask,
  toggleCompleted,
}) {
  console.log(text);
  console.log(completed);

  return (
    <>
      <div style={{ border: "solid white", margin: "8px" }}>
        <h3>{text}</h3>
        <input
          checked={completed}
          id="checkbox"
          type="checkbox"
          onChange={toggleCompleted}
        />
        <label htmlFor="checkbox">completed?</label>
        <button onClick={deleteTask}>delete</button>
      </div>
    </>
  );
}
