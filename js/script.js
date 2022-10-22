const quizData = [
   {
      question: "С помощью какой клавиши можно переместить курсор на следующее поле при заполнении форм?",
      answer: ["Page Up", "Backspace", "Tab", "Caps Lock"],
      correct: 3,
   },
   {
      question: "Какая комбинация клавиш используется для быстрого перехода между открытыми окнами?",
      answer: ["Alt+Tab", "Alt+F4", "Ctrl+Alt+Del", "Shift+F12"],
      correct: 1,
   },
   {
      question: "Что из перечисленного может быть причиной ухудшения работы браузера?",
      answer: ["Плохой сигнал Интернет-соединения", "Большое кол-во работающих на компьютере фоновых программ", "Большой объём информации, сохранённый в кэше", "Всё вышеперечисленное"],
      correct: 4,
   },
   {
      question: "Какая клавиша переводит клавиатуру в режим печати букв в верхнем регистре?",
      answer: ["Page Up", "Enter", "Tab", "Caps Lock"],
      correct: 4,
   },
   {
      question: "С помощью какой комбинации клавиш можно выделить всё?",
      answer: ["Ctrl+V", "Ctrl+A", "Ctrl+C", "Ctrl+X"],
      correct: 2,
   },
   {
      question: "Что делает клавиша PrtSc?",
      answer: ["Даёт команду принтеру распечатать открытую страницу", "Делает снимок текущего состояния активного экрана", "Переводит компьютер в спящий режим", "Делает снимок текущего состояния всех подключённых экранов"],
      correct: 4,
   },
   {
      question: "В каком виде процессор обрабатывает информацию?",
      answer: ["в текстовом виде", "в двоичном коде", "на английском языке", "в виде документа"],
      correct: 2,
   },
   {
      question: "Что обязательно имеет компьютер, подключённый к интернету?",
      answer: ["web-сервер", "доменное имя", "ip-адрес", "bluetooth"],
      correct: 3,
   },
];
let score = 0;
let questionIndex = 0;

const headerCont = document.querySelector("#header");
const listCont = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");


clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;




function clearPage() {
   headerCont.innerHTML = '';
   listCont.innerHTML = '';
}

function showQuestion() {

   const headerTempl = `<h2 class="title">%title%</h2>`;
   const title = headerTempl.replace('%title%', quizData[questionIndex]['question']);
   headerCont.innerHTML = title;

   let answerNumber = 1;
   for (answerText of quizData[questionIndex]['answer']) {
      const questionTempl =
         `<li>
            <label>
               <input value="%number%" type="radio" class="answer" name="answer">
               <span>%answer%</span>
            </label>
         </li>`

      const answerHTML = questionTempl
         .replace("%answer%", answerText)
         .replace("%number%", answerNumber)


      listCont.innerHTML += answerHTML;
      answerNumber++;
   }
}

function checkAnswer() {
   const checkedRadio = listCont.querySelector('input:checked');

   if (!checkedRadio) {
      submitBtn.blur();
      return;
   }

   const userAnswer = parseInt(checkedRadio.value);

   if (userAnswer === quizData[questionIndex]['correct']) {
      score++;
   }

   if (questionIndex !== quizData.length - 1) {
      questionIndex++;
      clearPage();
      showQuestion();
      return;
   } else {
      clearPage();
      showResults();
   }

}

function showResults() {
   const resultsTempl = `
      <h2 class="title">%title%</h2>
      <h3 class="message">%message%</h3>
      <p class="result">%result%</p>
   `;
   let title, message;
   if (score === quizData.length) {
      title = "congratulations";
      message = "all answers are correct";
   } else if ((score * 100) / quizData.length >= 50) {
      title = "Close one";
      message = "you can do better";
   } else {
      title = "sad news for you";
      message = "unfortunately not even close :<";
   }

   let result = `${score} из ${quizData.length}`;
   const finalMessage = resultsTempl
      .replace("%title%", title)
      .replace("%message%", message)
      .replace("%result%", result)

   headerCont.innerHTML = finalMessage;

   submitBtn.blur();
   submitBtn.innerHTML = 'Начать заново';
   submitBtn.onclick = () => history.go();

}