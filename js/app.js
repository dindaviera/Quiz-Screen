const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBoX = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let answerList = [];
let totalScore = 0;
let answered = false;

function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

function getNewQuestion() {
  questionNumber.innerHTML =
    "Pertanyaan " + (questionCounter + 1) + " dari " + quiz.length;

  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);

  const optionLen = currentQuestion.options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  let animationDelay = 0.15;
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[i];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}

function answer(value, score, id) {
  if (answered) {
    document.getElementById("option1").style.backgroundColor = "#E5E5E5";
    document.getElementById("option2").style.backgroundColor = "#E5E5E5";
    document.getElementById("option3").style.backgroundColor = "#E5E5E5";
    document.getElementById("option4").style.backgroundColor = "#E5E5E5";

    answerList.splice(
      answerList.findIndex((element) => {
        element.value == value;
      }, 1)
    );

    document.getElementById(id).style.backgroundColor = "green";

    answerList.push({
      ans: value,
      scr: score,
    });
  } else {
    console.log(id);
    document.getElementById("option1");
    document.getElementById(id).style.backgroundColor = "green";
    answerList.push({
      ans: value,
      scr: score,
    });
    totalScore = totalScore + score;
    questionCounter++;
    answered = true;
  }

  console.log(answerList);
}

function next() {
  answered = false;
  document.getElementById("option1").style.backgroundColor = "#E5E5E5";
  document.getElementById("option2").style.backgroundColor = "#E5E5E5";
  document.getElementById("option3").style.backgroundColor = "#E5E5E5";
  document.getElementById("option4").style.backgroundColor = "#E5E5E5";

  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  quizBox.classList.add("hide");
  resultBoX.classList.remove("hide");
  quizResult();
}

function quizResult() {
  resultBoX.querySelector(".total-question").innerHTML = quiz.length;
  resultBoX.querySelector(".total-score").innerHTML = totalScore + " / " + 10;
  console.log(totalScore);
  if (totalScore >= 0 && totalScore <= 3.5) {
    console.log("rendah");
    resultBoX.querySelector(".description").innerHTML = "Stress Tingkat Rendah";
  } else if (totalScore >= 4 && totalScore <= 6.5) {
    resultBoX.querySelector(".description").innerHTML = "Stress Tingkat Sedang";
  } else if (totalScore >= 7 && totalScore <= 10) {
    resultBoX.querySelector(".description").innerHTML = "Stress Tingkat Tinggi";
  }
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}

function tryAgainqUIZ() {
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuIZ();
}

function goToHome() {
  resultBoX.classList.add("hide");
  homeBox.classList.remove("hide");
  resetQuiz();
}

// ### STARTING POINT ####
function startQuiz() {
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();
}
