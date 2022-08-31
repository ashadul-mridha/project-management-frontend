import 'react-quill/dist/quill.snow.css';
import './App.css';
import AddProjectModal from './components/Modal/AddProjectModal';
import AddTaskModal from './components/Modal/AddTaskModal';
import AppRouter from './routes/appRoutes';
import { isExpired } from "react-jwt";
import useAuthHooks from './utils/hooks/useAuth';
import { useEffect } from 'react';

function App() {

  // if token expire then louout automatic
    const { getToken, logout } = useAuthHooks();
    const token = getToken();
    const isMyTokenExpired = isExpired(token);

    useEffect( () => {
      if (isMyTokenExpired) {
        logout();
        console.log('logout');
      }
    } , [isMyTokenExpired])

  return (
    <>
      <AppRouter />
      <AddProjectModal />
      <AddTaskModal />
    </>
  );
}

export default App;
