import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useGetQuestionsQuery, useDeleteQuestionMutation } from "../../services/Store/apiSlice";

interface Column {
	id: 'index' | 'question' | 'correctAnswer' | 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
}

const columns: readonly Column[] = [
	{ id: 'index', label: '#', minWidth: 50 },
	{ id: 'question', label: 'Question', minWidth: 200 },
	{ id: 'correctAnswer', label: 'Correct Answer', minWidth: 150 },
	{ id: 'action', label: 'Action', minWidth: 100 },
];

export default function Tabel() {
	const { data: questions = [] } = useGetQuestionsQuery();
	const [deleteQuestion] = useDeleteQuestionMutation();


	const handleDelete = (question: string) => {
		deleteQuestion(question);
		location.reload();
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
									sx={{ fontWeight: "bold", color: "#06054f", fontSize: "20px" }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{questions
							.map((question, index) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={index}>
										<TableCell align="left">{index + 1}</TableCell>
										<TableCell align="left">{question.question}</TableCell>
										<TableCell align="left">{question.answers.find(answer => answer.isCorrect)?.text}</TableCell>
										<TableCell align="left">
											<IconButton
												onClick={() => handleDelete(question.question.toString())}
												aria-label="add answer"
												color="error"
											>
												<DeleteOutlineIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
