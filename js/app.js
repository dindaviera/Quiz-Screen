const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBoX = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let answerList = [];
let totalScore = 0;

function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

function getNewQuestion() {
  questionNumber.innerHTML =
    "Question " + (questionCounter + 1) + " of " + quiz.length;

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
  optionContainer.innerHTML = "";
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

function answer(value, score) {
  answerList.push({
    ans: value,
    scr: score,
  });
  totalScore = totalScore + score;
  console.log(answerList);
  questionCounter++;
  console.log(score);
}

function unclickableOption() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next() {
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
  if (totalScore >= 0 && totalScore <= 3) {
    console.log("Stress Tingkat Rendah");
    resultBoX.querySelector(".description").innerHTML = "Stress Tingkat Rendah ";
  } else if (totalScore >= 4 && totalScore <= 6) {
    resultBoX.querySelector(".description").innerHTML = "Stress Tingkat Sedang";
    // } else (totalScore >= 7 && totalScore <= 10){
    //   resultBoX.querySelector(."description").innerHTML = "Stress Tingkat Tinggi"
  }
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