export interface Question {
    question: string;
    answers: Answer[];
}

export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface Step1Props {
    question: string;
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
}


export interface Step2Props {
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
    setCorrectAnswerIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface Step3Props {
    question: string;
    answers: Answer[];
}
