import React from 'react';
import { Provider } from 'react-redux';
import { Chat } from './components/chatBoard';
import { store } from './store';
import './app.css';
import SocketProvider from './context/socket';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign from './components/SignUpAndSignIn';
import HomePage from './components/HomePage';
function App() {
  React.useEffect(() => {
    const lang = window.localStorage.getItem('lang');
    if (!lang) window.localStorage.setItem('lang', 'vn');
  }, []);
  return (
    <Provider store={store}>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/messages/:id" element={<Chat />} />
            <Route path="/sign" element={<Sign />} />
          </Routes>
        </Router>
      </SocketProvider>
    </Provider>
  );
}
// function Home() {

//   return (

//   );
// }
// function ChatMain() {
//   React.useEffect(() => {
//     const lang = window.localStorage.getItem('lang');
//     if (!lang) window.localStorage.setItem('lang', 'vn');
//   }, []);
//   return (
//     <Provider store={store}>
//       <SocketProvider>
//         <Chat />
//       </SocketProvider>
//     </Provider>
//   );
// }

export default App;
