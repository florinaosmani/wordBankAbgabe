import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './components/Root';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Admin from './pages/Admin';

 const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={ <Root /> }>
      <Route index element={ <Home /> } />
      <Route path='favorites' element={ <Favorites /> } /> 
      <Route path='admin' element={ <Admin /> } /> 
    </Route>
  ));

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
