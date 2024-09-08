import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

import { Step1Props } from '../../types/StepperTypes';

const Step1: React.FC<Step1Props> = ({ question, setQuestion }) => {
    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>Question:</Typography>
            <TextField
                name="question"
                variant="outlined"
                fullWidth
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ mt: 1, bgcolor: "#e7e7e7" }}
            />
        </Box>
    );
};

export default Step1;