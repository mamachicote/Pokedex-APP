import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme';

import Routes from './routes/Routes';

function App() {
  return (
    <ThemeProvider
      theme={createTheme()}
    >
      <Routes />
    </ThemeProvider>
  );
}

export default App;
