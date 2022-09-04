import 'react-quill/dist/quill.snow.css';
import './App.css';
import AddProjectModal from './components/Modal/AddProjectModal';
import AddTaskModal from './components/Modal/AddTaskModal';
import AppRouter from './routes/appRoutes';
import { isExpired } from "react-jwt";
import useAuthHooks from './utils/hooks/useAuth';
import { useEffect } from 'react';
import EditTaskModal from './components/Modal/EditTaskModal';

function App() {

  // if token expire then logout automatic
    const { getToken, logout } = useAuthHooks();
    const token = getToken();
    const isMyTokenExpired = isExpired(token);

    useEffect( () => {
      if (isMyTokenExpired && token) {
        logout();
        console.log('logout', isMyTokenExpired , token);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [isMyTokenExpired])

  return (
    <>
      <AppRouter />
      <AddProjectModal />
      <AddTaskModal />
      <EditTaskModal />
    </>
  );
}

export default App;
