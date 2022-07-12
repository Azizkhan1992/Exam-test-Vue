<template>
    <div>
        <div v-if="!finishExam">
            <p>{{ currentQuestion.question }}</p>
            <ul v-if="currentQuestion.type !== examTypes.WRITING">
                <li v-for="(answer, idx) in currentQuestion.answers" :key="idx">
                {{ answer.answer }}
                <div v-if="currentQuestion.type === examTypes.SINGLE">
                    <input type="radio" :value="answer" name="single" v-model="currentUserAnswer" />
                </div>
                <div v-else-if="currentQuestion.type === examTypes.MULTIPLE">
                    <input type="checkbox" :value="answer" name="multiple" v-model="currentUserAnswer" />
                </div>
                </li>
            </ul>
            <textarea v-else type="checkbox" v-model="currentUserAnswer" cols="100" rows="5"></textarea>
            <div>
                <button @click="next" class="next--btn">
                    <span v-if="!isLastQuestion">Keyingi</span>
                    <span v-else>Yakunlash</span>
                </button>
            </div>
        </div>
        <div v-else>
            <h3 v-if="isLucky >= 65">Ajoyib! {{ result }} ta natijani qayd etdingiz! Bu {{ isLucky }} % natija degani. Tabriklaymiz! Podarkani oling!</h3>
            <h3 v-else>Afsus! Yaxshilab o'qib, qaytadan topshiring</h3>
            <!-- <ul>
                <li v-for="(answer, idx) in userAnswers" :key="idx">
                    {{  }}
                </li>
            </ul> -->
        </div>
    </div>
</template>

<script>
import ExamService from '@/services/ExamService';
import { examTypes } from '@/static/enums';
export default {
    name: 'app-examination',
    data() {
        return {
            questions: [],
            examTypes,
            currentQuestion: {},
            currentQuestionPosition: 0,
            userAnswers: [],
            currentUserAnswer: null,
            finishExam: false
        }
    },
    mounted() {
        this.getQuestions();
        this.currentQuestion = this.questions[0];
        this.initCurrentAnswer();
    },
    methods: {
        initCurrentAnswer() {
            if (this.currentQuestion.type === this.examTypes.SINGLE) {
                this.currentUserAnswer = null;
            } else {
                this.currentUserAnswer = [];
            }
        },
        getQuestions() {
            this.questions = ExamService.getQuestions();
        },
        next() {
            if (!this.validateAnswer()) return;

            this.checkAnswer();
            this.initCurrentAnswer();
            this.currentQuestionPosition++;
        },
        validateAnswer() {
            if (!this.currentUserAnswer ||
                (typeof this.currentUserAnswer === 'object' &&
                Object.keys(this.currentUserAnswer).length === 0)
            ) {
                alert('Javobni yozing yoki tanlang!');
                return false;
            }

            if (typeof this.currentUserAnswer === 'string' &&
                this.currentUserAnswer.length < 50) {
                alert("Kamida 50ta belgi yozing");
                return false;
            }

            if (this.isLastQuestion) {
                this.calculateAnswers();
                return false;
            }

            return true;
        },
        checkAnswer() {
            if (this.currentQuestion.type === this.examTypes.SINGLE) {
                this.insertSingleAnswer()
            } else if (this.currentQuestion.type === this.examTypes.MULTIPLE) {
                this.insertMultipleAnswer();
            } else {
                this.insertWritingAnswer();
            }
        },
        insertSingleAnswer() {
            this.userAnswers.push({
                isTrue: this.currentUserAnswer.isTrue,
                correctAnswers: this.currentQuestion.answers.find(item => item.isTrue)
            });
        },
        insertMultipleAnswer() {
            const answer = this.currentUserAnswer.findIndex(item => !item.isTrue) === -1;
            this.userAnswers.push({
                isTrue: answer,
                correctAnswers: this.currentQuestion.answers.filter(item => item.isTrue)
            });
        },
        insertWritingAnswer() {
            this.userAnswers.push({
                isTrue: true
            });
        },
        calculateAnswers() {
            this.checkAnswer();
            // ExamService.saveResult(this.currentUserAnswer);

            this.finishExam = true;
        }
    },
    computed: {
        isLastQuestion() {
            return this.currentQuestionPosition === this.questions.length - 1;
        },
        result() {
            const currentAnswers = this.userAnswers;
            return currentAnswers.length;
        },
        isLucky() {
            const allQuestionsCount = this.userAnswers.length;
            const resultInPercent = this.userAnswers.filter(item => item.isTrue).length / allQuestionsCount;

            return resultInPercent * 100;
        }
    },
    watch: {
        'currentQuestionPosition': function (val) {
            this.currentQuestion = this.questions[val];
            this.currentUserAnswer = this.currentQuestion.type === this.examTypes.MULTIPLE ? [] : null;
        }
    }
}
</script>
<style scoped>
ul {
    list-style: none;
    display: flex;
    border: 1px solid #ccc;
    margin: 0;
    padding: 10px 15px;
    border-radius: 8px;
}

ul li {
    margin-left: 10px;
}

ul li:first-child {
    margin: 0;
}

.next--btn {
    margin-top: 10px;
}

.next--btn:hover {
    background-color: #3180cf !important;
}

textarea {
    border: 1px solid #ccc;
    border-radius: 8px;
}

textarea:focus-visible {
    outline: #1976d2;
}
</style>