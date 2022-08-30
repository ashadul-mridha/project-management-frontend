import 'react-quill/dist/quill.snow.css';
import './App.css';
import AddProjectModal from './components/Modal/AddProjectModal';
import AddTaskModal from './components/Modal/AddTaskModal';
import AppRouter from './routes/appRoutes';

function App() {
  return (
    <>
      <AppRouter />
      <AddProjectModal />
      <AddTaskModal />
    </>
  );
}

export default App;
