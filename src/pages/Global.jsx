import { useTheme } from "@emotion/react";
import { AppBar, Avatar, Box, Button, Menu, MenuItem, Skeleton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { apiConfig } from "../api/apiConfig";
import { DashboadMainContainer, DashboardMainContainerContent } from "../components/StyledGlobal/styles";
import Animate from "../components/Animate";
import { useState } from "react";

const Global = () => {
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

	const user = localStorage.getItem("login-user") || sessionStorage.getItem("login-user");

	const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
  const logoutOpen = Boolean(logoutAnchorEl);
  const handleLogoutClickOpen = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };
  const handleLogoutClose = () => {
    setLogoutAnchorEl(null);
  };

	const handleLogoutAction = () => {
		localStorage.removeItem("login-user");
		sessionStorage.removeItem("login-user");
		navigate("/login");
	}

	return (
		<DashboadMainContainer $isMobile={isMobile}>

			<AppBar>
				<Animate animation="fadeInTop">
					<Toolbar>
						{storeData?.name ? (
							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
								<Typography variant="h6" noWrap component="div">
									{storeData.name}
								</Typography>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<Typography variant="body1" mr={1}>{user}</Typography>
									<Avatar onClick={handleLogoutClickOpen}></Avatar>
									<Menu
										open={logoutOpen}
										anchorEl={logoutAnchorEl}
										onClose={handleLogoutClose}
									>
										<MenuItem onClick={handleLogoutAction}>Logout</MenuItem>
									</Menu>
								</Box>
							</Box>
						) : (
							<Skeleton variant="rectangular" width={150} height={20} />
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

				<Outlet />
				
			</DashboardMainContainerContent>

		</DashboadMainContainer>
	)
}

export default Global;