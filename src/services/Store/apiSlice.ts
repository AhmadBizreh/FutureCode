import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question } from '../../types/StepperTypes';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	endpoints: (builder) => ({
		addQuestion: builder.mutation<void, Question>({
			query: (newQuestion) => ({
				url: 'questions',
				method: 'POST',
				body: newQuestion,
			}),
		}),
		saveToLocalStorage: builder.mutation<void, Question>({
			queryFn: (newQuestion) => {
				const existingData = localStorage.getItem('questionData');
				const questions = existingData ? JSON.parse(existingData) : [];
				questions.push(newQuestion);
				localStorage.setItem('questionData', JSON.stringify(questions));
				return { data: undefined };
			},
		}),
		getQuestions: builder.query<Question[], void>({
			queryFn: () => {
				const existingData = localStorage.getItem('questionData');
				const questions = existingData ? JSON.parse(existingData) : [];
				return { data: questions }; 
			},
		}),
		deleteQuestion: builder.mutation<void, string>({
			queryFn: (questionText) => {
				const existingData = localStorage.getItem('questionData');
				const questions: Question[] = existingData ? JSON.parse(existingData) : [];
				const updatedQuestions = questions.filter((question) => question.question !== questionText);
				localStorage.setItem('questionData', JSON.stringify(updatedQuestions));
				return { data: undefined };
			},
		}),
	}),
});

export const { useAddQuestionMutation, useSaveToLocalStorageMutation, useGetQuestionsQuery, useDeleteQuestionMutation } = apiSlice;
