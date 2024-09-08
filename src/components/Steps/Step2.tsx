import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { Answer } from '../../types/StepperTypes';
import { Step2Props } from '../../types/StepperTypes';

const Step2: React.FC<Step2Props> = ({ answers, setAnswers, setCorrectAnswerIndex }) => {
    const [localAnswers, setLocalAnswers] = useState<Answer[]>(answers);

    const handleAddAnswer = () => {
        setLocalAnswers([...localAnswers, { text: '', isCorrect: false }]);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...localAnswers];
        newAnswers[index].text = value;
        setLocalAnswers(newAnswers);
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index: number) => {
        const updatedAnswers = localAnswers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index,
        }));
        setLocalAnswers(updatedAnswers);
        setAnswers(updatedAnswers);
        setCorrectAnswerIndex(index);
    };

    return (
        <Box sx={{ textAlign: 'center', p: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>Answers:</Typography>
            {localAnswers.map((answer, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 1 }}>
                    <TextField
                        variant="outlined"
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        InputProps={{
                            endAdornment: index === localAnswers.length - 1 ? (
                                <InputAdornment position="end">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: '1px',
                                                height: '54px',
                                                backgroundColor: 'gray',
                                                marginRight: 1,
                                            }}
                                        />
                                        <IconButton onClick={handleAddAnswer} aria-label="add answer" color="secondary">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </InputAdornment>
                            ) : null,
                        }}
                        sx={{ width: { xs: '100%', sm: '400px' }, mr: 1 }}
                    />
                    <Checkbox
                        sx={{
                            color: "#62dd4e",
                            '&.Mui-checked': {
                                color: "#62dd4e",
                            },
                        }}
                        checked={answer.isCorrect}
                        onChange={() => handleCorrectAnswerChange(index)}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default Step2;