import React from 'react';

interface Props {
	question: any;
}

const QuestionForm: React.FC<Props> = ({ question }) => {
	return <p>Question form {question.id}</p>;
};

export default QuestionForm;
