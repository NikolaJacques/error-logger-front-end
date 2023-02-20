import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Error404 from 'components/404';
import Login from 'routes/Login';
import Main from 'routes/Main';

function App() {

  const headerOffsetXS = '3rem';
  const headerOffsetSM = '4rem';

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
      <Header heightXS={headerOffsetXS} heightSM={headerOffsetSM}/>
        <Container sx={{backgroundColor:'lightgray', maxWidth:{xs: "100%", sm:"90%", md:"75%", lg:"66%"},  marginTop: {xs:`${headerOffsetXS}`, sm:`${headerOffsetSM}`}}}>
            <RouterProvider router={router}/>
        </Container>
    </div>
  );
}

export default App;
