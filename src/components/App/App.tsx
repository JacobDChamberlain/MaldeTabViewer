import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home/Home.tsx';

import './App.css'

function App() {
  return (
    <div className='app-wrapper'>

      <BrowserRouter>
        <Routes>
          <Route path='/' Component={ Home } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
