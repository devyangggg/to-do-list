import { useState } from "react";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  return (
    <div className="main-div">
      <Header />
      <Form setTaskList={setTaskList} />
      <TaskList taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
}

function Header() {
  return <h1>To-Do List App</h1>;
}
function Form({ setTaskList }) {
  const [newTask, setNewTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    setNewTask("");

    const taskObj = { task: newTask, isDone: false, key: Date.now() };
    setTaskList((taskList) => [...taskList, taskObj]);
  }
  return (
    <div className="card main">
      <form onSubmit={handleSubmit}>
        <input
          className="input-box"
          placeholder="Add new task"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn">Add</button>
      </form>
    </div>
  );
}
function TaskList({ taskList, setTaskList }) {
  function handleDelete(id) {
    setTaskList((taskList) => taskList.filter((item) => item.key !== id));
  }

  return (
    <div>
      {taskList.map((items) => {
        return (
          <Task items={items} key={items.key} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
}
function Task({ items, handleDelete }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="card">
      <input
        type="checkbox"
        value={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <span
        className="task"
        style={{ textDecoration: `${isChecked ? "line-through" : ""}` }}
      >
        {items.task}
      </span>
      <button className="btn red" onClick={() => handleDelete(items.key)}>
        Delete
      </button>
    </div>
  );
}

/*
taskList.filter((items)=>items.key !== )
*/
