import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Search from './pages/Search'
import Image from './pages/Image'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />}/>
      <Route path='/search' element={<Search />} />
      <Route path='/:id' element={<Image />} />
    </Routes>
  )
}

export default App