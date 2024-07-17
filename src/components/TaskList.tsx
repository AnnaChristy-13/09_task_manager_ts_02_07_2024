import { useState } from "react";
// import axios from "axios";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reduxRTK/storeRTK";
import { addTask, ITask } from "../reduxRTK/tasksSlice";

const TaskList = () => {
  const { tasks, status } = useSelector((state: RootState) => state.taskList);
  const [newTask, setNewTask] = useState<Omit<ITask, "updatedAt" | "id">>({
    title: "",
    isCompleted: false,
  });

  const dispatch: AppDispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      dispatch(
        addTask({ ...newTask, updatedAt: new Date(), id: tasks.length })
      );
      setNewTask({
        title: "",
        isCompleted: false,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Task Manager App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ title: e.target.value, isCompleted: false })
          }
          className="form-control"
          placeholder="New Task"
        />
        <button onClick={handleAddTask} className="btn btn-info">
          Add Task
        </button>
      </div>
      <div>
        {status === "loading" && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {status === "success" &&
          tasks.map((task, index) => (
            <Task key={index} task={task} index={index} />
          ))}
        {status === "error" && (
          <p>Opps. Something went wrong. Try, please, again.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
