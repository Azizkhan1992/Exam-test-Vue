<template>
<div class="exam-container">
    <div>
        <label for="type">Savol turi: </label>
        <select id="type" v-model="question.type">
            <option :value="types.SINGLE">Single</option>
            <option :value="types.MULTIPLE">Multiple</option>
            <option :value="types.WRITING">Writing</option>
        </select>
    </div>
    <div>
        <label for="question">Savol: </label>
        <input id="question" type="text" v-model="question.question" />
    </div>
    <div v-if="question.type == types.SINGLE || question.type == types.MULTIPLE" class="variant-input">
        <label>Variantlar:</label>
        <div>
            <input type="checkbox" v-model="variant.isTrue" />
            <input type="text" v-model="variant.answer">
            <button @click="addVariant">+</button>
        </div>
        <variants :answers="question.answers" @edit="editVariant" @delete="deleteVariant"></variants>
    </div>
    <div>
        <button @click="save">Saqlash</button>
    </div>
</div>
</template>

<script>
import {
    examTypes
} from '@/static/enums';
import Variants from './components/Variants';
import ExamService from '@/services/ExamService';
export default {
    name: 'add-edit-exam',
    components: {Variants},
    data() {
        return {
            questionId: null,
            isEdit: false,
            types: examTypes,
            question: {
                type: examTypes.SINGLE,
                question: null,
                answers: []
            },
            variant: {
                isTrue: false,
                answer: null
            }
        }
    },
    mounted() {
        this.getQuestionId();
        this.getQuestion();
    },
    methods: {
        getQuestionId() {
            this.questionId = this.$route.params.id;

            if (this.questionId) {
                this.isEdit = true;
            }

        },
        getQuestion(){
            if(this.isEdit){
                this.question = ExamService.getQuestion(this.questionId)
            }
        },
        save() {
            ExamService.saveQuestion(this.question, this.isEdit);

            this.question.question = null;
            this.question.answers = [];
            this.variant.answer = null;
            this.variant.isTrue = false;
        },
        addVariant() {
            if (!this.validateAndCorrectVariant()) return;

            this.question.answers.push({
                ...this.variant
            });
            this.variant.answer = null;
            this.variant.isTrue = false;
        },
        validateAndCorrectVariant() {
            if (!this.question.answers &&
                (this.question.type === this.types.SINGLE ||
                    this.question.type === this.types.MULTIPLE)) {
                this.question.answers = [];
            }

            if (this.question.type === this.types.SINGLE &&
                this.question.answers.findIndex(item => item.isTrue === true) > -1 &&
                this.variant.isTrue) {
                alert('Single type savolda faqat bitta to\'g\'ri javob bo\'ladi');
                return false;
            }

            return true;
        },
        editVariant(index) {
            this.variant = JSON.parse(JSON.stringify(this.question.answers[index]));
            this.deleteVariant(index)
        },
        deleteVariant(index) {
            const deletingItem = this.question.answers[index];

            if (deletingItem) {
                this.question.answers.splice(index, 1);
            }
        }
    }
}
</script>
<style scoped>
.exam-container label {
    font-weight: 600;
    font-size: 16px;
}

.exam-container select,
.exam-container input {
    font-size: 14px;
    font-style: italic;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px 10px;
}
.exam-container select:focus-visible,
.exam-container input:focus-visible {
    outline: #d42d2d;
    border-color: #8e8a8a;
}

.exam-container input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
}

.variant-input {
    margin-top: 15px;
}

.exam-container > div {
    margin-bottom: 15px;
}

.variant-input button {
    margin-left: 5px;
    height: 30px;
    min-width: 30px;
}
.variants-container {
    margin-top: 15px;
}
</style>