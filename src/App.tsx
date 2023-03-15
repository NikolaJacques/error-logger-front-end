import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Error404 from 'components/404';
import Login from 'routes/Login';
import Main from 'routes/Main';
import './App.scss';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error404/>
    },
    {
      path: "/login",
      element: <Login/>,
    }
  ]);

  return (
    <div className="App">
      <CssBaseline />
      <Header/>
      <Box className='layout-wrapper'>
        <Container className='container'>
            <RouterProvider router={router}/>
        </Container>
      </Box>
    </div>
  );
}

export default App;
