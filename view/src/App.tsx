import {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import {Page} from './utilities/constants';
import ToastContextProvider from './contexts/Notification/ToastContext';

function App() {
  const [currentPage, setCurrentPage] = useState(Page.Discover);

  return (
    <div className="App">
      <ToastContextProvider>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Content currentPage={currentPage} />
      </ToastContextProvider>
    </div>
  );
}

export default App;
