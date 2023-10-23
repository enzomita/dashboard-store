import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.scss'
import Home from './pages/Home'
import Detail from './pages/Detail'
import { AppBar, Box, Button, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAxios } from './hooks/useAxios';
import { apiConfig } from './api/apiConfig';
import Animate from './components/Animate';
import Stats from './pages/Stats';
import { DashboadMainContainer, DashboardMainContainerContent } from './components/StyledGlobal/styles';

const App = () => {

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true
  });

  const { data: storeData } = useAxios({
    url: apiConfig.getStore,
    method: 'get',
  });

  const menu = [
    {
      label: "DASHBOARD",
      location: "/",
    },
    {
      label: "STATISTICHE",
      location: "/stats",
    }
  ]

  return (
    <DashboadMainContainer $isMobile={isMobile}>

        <AppBar>
          <Animate animation="fadeInTop">
            <Toolbar>
              {storeData?.name && (
                <Animate>
                  <Typography variant="h6" noWrap component="div">
                    {storeData.name}
                  </Typography>
                </Animate>
              )}
            </Toolbar>
            <Box sx={{ display: "flex", justifyContent: "center", background: "#fff" }}>
              {menu.map(item => (
                <Button 
                  sx={{ mr: 5, borderBottom: location.pathname === item.location ? `3px solid ${theme.palette.secondary.main}` : '' }} 
                  key={`menu-${item.label}`} onClick={() => navigate(item.location)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Animate>
        </AppBar>

      <DashboardMainContainerContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/detail/:productId" element={<Detail />} />
        </Routes>
      </DashboardMainContainerContent>
      
    </DashboadMainContainer>
  )
}

export default App
