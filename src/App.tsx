import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import UserDetails from "./components/UserDetails";
import { useEffect } from "react";
import { fetchTodos } from "./reduxRTK/tasksSlice";
import { AppDispatch } from "./reduxRTK/storeRTK";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./reduxRTK/usersSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos()), dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
