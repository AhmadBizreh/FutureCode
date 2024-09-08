import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import Step1 from '../../components/Steps/Step1';
import Step2 from '../../components/Steps/Step2';
import Step3 from '../../components/Steps/Step3';
import { useSaveToLocalStorageMutation } from '../../services/Store/apiSlice';
import Joi from 'joi';
import { Answer } from '../../types/StepperTypes';

import { useNavigate } from 'react-router-dom';




const QuestionStepper: React.FC = () => {
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(0);
	const [question, setQuestion] = useState<string>('');
	const [answers, setAnswers] = useState<Answer[]>([{ text: '', isCorrect: false }]);
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [saveToLocalStorage] = useSaveToLocalStorageMutation();

	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

	const steps = [
		{ label: 'Add A Question' },
		{ label: question },
		{ label: 'Preview' },
	];

	const schema = Joi.object({
		question: Joi.string().required(),
		answers: Joi.array().items(Joi.object({
			text: Joi.string().min(1).required(),
			isCorrect: Joi.boolean().required()
		})).min(4).required(),
		correctAnswerIndex: Joi.number().integer().min(0).max(3).required(),
	});

	const validateForm = () => {
		const { error } = schema.validate({
			question,
			answers,
			correctAnswerIndex,
		});
		setIsFormValid(!error);
	};

	const handleNext = async () => {
		if (activeStep === 1) {
			validateForm();
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = async () => {
		const newQuestion = { question, answers };
		await saveToLocalStorage(newQuestion);
		setOpenSnackbar(true);
		navigate('/show')

	};

	const handleCloseSnackbar = (
		event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
		console.log(event);
	};

	useEffect(() => {
		validateForm();
	}, [question, answers, correctAnswerIndex]);

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}
				message="Submitted Successfully"
			/>
			<Box sx={{
				maxWidth: 600, flexGrow: 1, bgcolor: "white", borderRadius: "20px", overflow: 'hidden',

				height: {
					xs: '500px',
					sm: "600px"
				},
			}}>
				<Paper
					square
					elevation={0}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: 50,
						pl: 2,
						bgcolor: 'background.default',
					}}
				>
					{activeStep === 1 ? <Typography sx={{
						fontWeight: "bold",
						mr: 2,
						color: "#06054f",
						bgcolor: "#e7e7e7",
						width: "100%",
						textAlign: "center",
						padding: "10px",
						borderRadius: "20px",
						mt: 10,
						fontSize: "32px",
						zIndex: 2

					}}>{steps[activeStep].label}</Typography> :
						<Typography sx={{ fontWeight: "bold", color: "#06054f", fontSize: "32px", zIndex: 2 }}>{steps[activeStep].label}</Typography>
					}
				</Paper>
				<Box
					sx={{
						// height: 430,
						height: {
							xs: 330,
							sm: 430
						},
						width: {
							xs: '300px',
							sm: '500px',
						},
						p: 2,
						overflowY: 'auto',
						overflowX: 'hidden',
						mx: "auto",

					}}
				>
					{activeStep === 0 && <Step1 question={question} setQuestion={setQuestion} />}
					{activeStep === 1 && <Step2 answers={answers} setAnswers={setAnswers} setCorrectAnswerIndex={setCorrectAnswerIndex} />}
					{activeStep === 2 && <Step3 question={question} answers={answers} />}
				</Box>
				<MobileStepper
					variant="dots"
					steps={steps.length}
					position="static"
					activeStep={activeStep}
					sx={{
						m: "10px",
						bgcolor: 'transparent',
						'& .MuiMobileStepper-dot': {
							bgcolor: '#d9d9d9',
						},
						'& .MuiMobileStepper-dotActive': {
							bgcolor: '#8b4088',
						},
					}}
					nextButton={
						<Button
							size="small"
							onClick={activeStep === 2 ? handleSubmit : handleNext}
							disabled={activeStep === 1 && !isFormValid}
							sx={{
								color: 'white',
								bgcolor: "#8b4088",
								'&:hover': {
									backgroundColor: "#382837",
								},
								mt: 2,
							}}
						>
							{activeStep === 2 ? 'Submit' : 'Next'}
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
							sx={{
								color: 'black',
								bgcolor: "transparent",
								border: `2px solid #8b4088`,
								'&:hover': {
									backgroundColor: "#cec8c8",
								},
							}}
						>
							Back
						</Button>
					}
				/>
			</Box>
		</Box>
	);
}

export default QuestionStepper;
