//requirements
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import { Navbar } from './components/index'

//pages
import { Home, CreatePost } from './pages/index';
const App = () =>{
  return(
    <BrowserRouter>
      <Navbar/>
      <main className='phone:p-8 px-6 py-8'>
      {/* Routes */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/post' element={<CreatePost/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App; 