import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#db57b1',
    },
    secondary: {
      main: '#00C9C3',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/dashboard">
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
