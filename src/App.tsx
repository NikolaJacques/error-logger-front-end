import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Main from './components/Main';
import Header from './components/Header';

function App() {

  const headerOffsetXS = '3rem';
  const headerOffsetSM = '4rem';

  return (
    <div className="App">
      <CssBaseline />
      <Header heightXS={headerOffsetXS} heightSM={headerOffsetSM}/>
        <Container sx={{backgroundColor:'lightgray', maxWidth:{xs: "100%", sm:"90%", md:"75%", lg:"66%"},  marginTop: {xs:`${headerOffsetXS}`, sm:`${headerOffsetSM}`}}}>
            <Main />
        </Container>
    </div>
  );
}

export default App;
