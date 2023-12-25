var quiz = {
  questions: [
    {
      text: "Сколько комнат должно быть в квартире?",
      answerTypeIsMulti: true,
      responses: [
        { text: "Студия", image: "./studia.svg" },
        { text: "1 комнатная", image: "./1room.svg" },
        { text: "2 комнатная", image: "./2room.svg" },
        { text: "3 комнатная", image: "./3room.svg" },
        { text: "4 комнатная", image: "./4room.svg" },
      ],
    },

    {
      text: "Какой бюджет на покупку квартиры?",
      responses: [
        { text: "до 5 млн" },
        { text: "7 млн" },
        { text: "12 млн" },
        { text: "20 млн и более" },
      ],
    },

    {
      text: "Какой способ оплаты предпочтительнее?",
      responses: [
        { text: "Наличные" },
        { text: "Рассрочка" },
        { text: "IT-ипотека" },
        { text: "Ипотека с гос.поддержкой" },
        { text: "Военная ипотека" },
      ],
    },
    {
      text: "Когда планируете покупать?",
      responses: [
        { text: "1  мес." },
        { text: "3 мес." },
        { text: "6 мес. и более" },
      ],
    },
    {
      text: "Готовы приехать на показ?",
      responses: [{ text: "Да" }, { text: "Нет" }],
    },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  var phoneInput = document.getElementById("phone");
  var phoneMask = new IMask(phoneInput, {
    mask: "+0 (000) 000-00-00",
  });
});
var app = new Vue({
  el: "#app",
  data: {
    quiz: quiz,
    questionIndex: 0,
    userResponses: Array.from({ length: quiz.questions.length }, () => []),
    isQuizStarted: false, // Флаг для отслеживания старта викторины
    isQuizFinished: false, // Флаг для отслеживания завершения викторины
    formData: {
      name: "",
      phone: "",
    },
    submitted: false,
  },

  computed: {
    isNextButtonDisabled: function () {
      return !this.areResponsesSelected();
    },
  },

  methods: {
    restart: function () {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },

    validatePhone: function () {
      const numericPhone = this.formData.phone.replace(/\D/g, "");
      if (numericPhone[0] == "8" || numericPhone[0] == "7") {
        this.formData.phone = "+7" + numericPhone.slice(1, 11);
        console.log("numericPhone[0]");
        if (numericPhone[1] == "8" || numericPhone[1] == "7")
          this.formData.phone = "+7" + numericPhone.slice(2, 11);
        console.log("numericPhone[1]");
      } else {
        this.formData.phone = "+7" + numericPhone;
        console.log("111");
      }
    },

    // Если номер начинается с +7 и вторая цифра не 8

    // submit() {
    //   const selectedResponses = this.userResponses.map(
    //     (responses, questionIndex) => {
    //       const question = this.quiz.questions[questionIndex];

    //       if (question.answerTypeIsMulti) {
    //         return question.responses
    //           .filter((response, index) => responses.includes(index))
    //           .map((response) => response.text);
    //       } else {
    //         const selectedResponseIndex = responses[0];
    //         const selectedResponse =
    //           selectedResponseIndex !== undefined
    //             ? question.responses[selectedResponseIndex]
    //             : null;
    //         return selectedResponse ? selectedResponse.text : null;
    //       }
    //     }
    //   );

    //   console.log("Selected responses:", selectedResponses);
    //   // Добавьте другую логику для отправки, навигации и т.д.
    // },

    questionHasImage(question) {
      // Вернуть true, если в вопросе есть изображение, иначе false
      return question.image !== undefined && question.image !== null;
    },

    isResponseSelected(index) {
      return (
        Array.isArray(this.userResponses[this.questionIndex]) &&
        this.userResponses[this.questionIndex].includes(index)
      );
    },

    selectOption: function (index) {
      // Проверяем, определен ли массив ответов для текущего вопроса
      if (!Array.isArray(this.userResponses[this.questionIndex])) {
        // Если не определено, создаем новый массив
        Vue.set(this.userResponses, this.questionIndex, []);
      }

      // Теперь работаем с массивом ответов
      const selectedArray = this.userResponses[this.questionIndex];

      // Если ответ не выбран, устанавливаем выбранный ответ
      if (selectedArray.indexOf(index) === -1) {
        Vue.set(selectedArray, 0, index);
      } else {
        // Если ответ уже выбран, снимаем выбор
        Vue.set(selectedArray, 0, null);
      }
    },
    next: function () {
      if (this.areResponsesSelected()) {
        if (this.questionIndex < this.quiz.questions.length) {
          // Переход к следующему вопросу только если выбран хотя бы один ответ
          this.questionIndex++;
        }
        if (window.innerWidth <= 768) {
          window.scrollTo(0, 0);
        }
      }
    },

    prev: function () {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },

    areResponsesSelected() {
      const responses = this.userResponses[this.questionIndex];

      if (Array.isArray(responses)) {
        // Для вопросов с множественным выбором
        return responses.length > 0;
      } else {
        // Для вопросов с одиночным выбором
        return responses !== null;
      }
    },
    // Добавленный метод для переключения видимости блока
    startQuiz: function () {
      this.isQuizStarted = true; // Функция для запуска викторины

      if (window.innerWidth <= 768) {
        window.scrollTo(0, 0);
      }
    },
    finishQuiz: function () {
      this.isQuizFinished = true; // Функция для завершения викторины
    },

    submitForm() {
      // Вместо вывода в консоль, здесь можно отправить данные на сервер
      console.log("Отправлено:", this.formData);
      this.submitted = true;
    },
  },
});
