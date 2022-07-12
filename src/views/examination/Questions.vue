<template>
<div>
    <table>
        <thead>
            <th>Savol</th>
            <th>Variantlar</th>
            <th>To'g'ri javob</th>
            <th>Actions</th>
        </thead>
        <tbody>
            <tr v-for="(question, idx) in questions" :key="idx">
                <td>{{ question.question }}</td>
                <td>
                    <ul v-if="question.type !== examTypes.WRITING">
                        <li v-for="(answer, idy) in question.answers" :key="idy">{{ answer.answer }}</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li v-for="(correct, idz) in getCorrectAnswer(question.answers)" :key="idz">
                            {{ correct.answer }}
                        </li>
                    </ul>
                </td>
                <td>
                    <router-link :to="`/admin/exam/create-exam/${idx+1}`"><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg></button></router-link>

                    <button @click="deleteQuestion(idx)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg></button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import ExamService from '@/services/ExamService';
import {
    examTypes
} from '@/static/enums';

export default {
    name: "app-examination",
    data() {
        return {
            questions: [],
            examTypes
        }
    },
    mounted() {
        this.getQuestions();
    },
    methods: {
        getQuestions() {
            this.questions = ExamService.getQuestions();
        },
        getCorrectAnswer(data) {
            return data ? data.filter(item => item.isTrue) : [{
                answer: ""
            }];
        },
        deleteQuestion(index) {
            ExamService.deleteQuestion(index);
            this.getQuestions()
        }
    }

}
</script>

<style>
img {
    width: 25px;
    height: 25px;
}

table td button,
table td a {
    min-width: 25px;
}
table td button {
    margin-left: 5px;
}
svg{
    color: black;
}
</style>
