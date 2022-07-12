class ExamService {
    QUESTIONS = 'questions'

    RESULT = 'result'

    getQuestions() {
        const questions = localStorage.getItem(this.QUESTIONS);

        if (!questions) {
            alert('No questions!');
            return;
        }

        return JSON.parse(questions);
    }

    saveQuestion(question, isEdit = false) {
        const questions = JSON.parse(localStorage.getItem(this.QUESTIONS));
        
        if (!questions) {
            localStorage.setItem(this.QUESTIONS, JSON.stringify([question]))
            return ;
        }

        if (isEdit) {
            const updatingQuestion = questions.findIndex(item => item.question === question.question);

            questions.splice(updatingQuestion, 1);
        }

        questions.push(JSON.parse(JSON.stringify(question)));
        
        
        // questions-ga questionni qo'shamiz
        localStorage.setItem(this.QUESTIONS, JSON.stringify(questions));
    }


    getQuestion(id) {
        const questions = this.getQuestions();

        if (!questions) return [];
        return questions[id-1];
    }

    saveResult(result) {
        localStorage.setItem(this.RESULT, JSON.stringify(result));
    }

    getResult() {
        const result = localStorage.getItem(this.RESULT);
        return result ? JSON.parse(result) : null;
    }

    deleteQuestion(index) {
        const questions = this.getQuestions();
        questions.splice(index, 1);
        localStorage.setItem(this.QUESTIONS, JSON.stringify(questions));
    }
}

export default new ExamService();