import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAxios } from "../hooks/useAxios";
import { apiConfig } from "../api/apiConfig";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	const navigate = useNavigate();

	const { data: storeData, loading } = useAxios({
		url: apiConfig.getStore,
		method: 'get',
	});

	const [userError, setUserError] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		// Check user name inserted is present inside employees, just for a fake login
		const employeeCheck = storeData.employees.some(employee => employee.toLocaleLowerCase() === data.get("user").toLocaleLowerCase());
		
		if (employeeCheck) {
			if (data.get("remember")) {
				localStorage.setItem("login-user", data.get("user"));
			} else {
				sessionStorage.setItem("login-user", data.get("user"));
			}
			navigate("/");
		} else {
			setUserError(true)
		}
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{loading ? (
					<Loader></Loader>
				) : (
					<>
						<Typography component="h1" variant="h5" mb={1}>
							Login
						</Typography>
						<Typography component="h2" variant="h6" mb={1} color="primary">
							{storeData.name}
						</Typography>

						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="user"
								label="Utente"
								name="user"
								autoFocus
								error={userError}
								helperText={userError ? "Utente non trovato" : ""}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
							/>
							<FormControlLabel
								control={<Checkbox name="remember" value="remember" color="primary" />}
								label="Ricordami"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Accedi
							</Button>
						</Box>
					</>
				)}
			</Box>
		</Container>
	);
}

export default Login