import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Step3Props } from '../../types/StepperTypes';

const Step3: React.FC<Step3Props> = ({ question, answers }) => {
    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography
                variant="h6"
                sx={{
                    color: "#06054f",
                    bgcolor: "#e7e7e7",
                    width: "100%",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "20px",
                    fontSize: "24px",
                }}
            >
                {question}
            </Typography>
            <Typography
                variant="h6"
                sx={{ textAlign: "left", color: "#06054F", fontSize: "24px", my: 2 }}
            >
                Answers :
            </Typography>
            <Grid container spacing={2}>
                {answers.map((answer, index) => (
                    <Grid item xs={6} key={index}>
                        <Box
                            sx={{
                                backgroundColor: answer.isCorrect ? "#62dd4e" : 'lightgray',
                                padding: 2,
                                borderRadius: 3,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="body2" sx={{ color: answer.isCorrect ? "white" : 'black', textAlign: "center" }}>
                                {answer.text} {answer.isCorrect && '✓'}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Step3;