import { Button, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			marginTop="10%"
		>
			<img src="/logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
			<Box mt={20}>
				<Button
					variant="contained"
					sx={{
						backgroundColor: "white",
						color: "black",
						padding: "6px 32px",
						fontSize: "18px",
						fontWeight: "bold",
						textTransform: "none",
						'&:hover': {
							backgroundColor: "#f0f0f0",
						},
					}}
					onClick={() => navigate('/stepper')}
				>
					open
				</Button>
			</Box>
		</Box>
	);
};

export default HomePage;

