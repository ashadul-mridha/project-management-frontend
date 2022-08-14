import './App.css';
import HomeLayout from './components/Layout/HomeLayout';
import AddProjectModal from './components/Modal/AddProjectModal';
import AddTaskModal from './components/Modal/AddTaskModal';

function App() {
  return (
    <>
      <HomeLayout />
      
      {/* all model and popup  */}
      <AddProjectModal />
      <AddTaskModal />
    </>
  );
}

export default App;
