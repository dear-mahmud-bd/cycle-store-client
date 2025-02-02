import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <MainLayout></MainLayout>
      <ToastContainer />
    </>
  );
}

export default App;
