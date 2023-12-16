let questions
let user
let accessToken
let round = 1
const questionEL = document.getElementById("question");
const answerButtonsEL = document.getElementById("answer-buttons");
const nextBtnEL = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const apiEndpoint =
  "https://qfhdl3ixb1.execute-api.us-east-1.amazonaws.com/test";


window.onload = async()=>{
    user = 'test';
    if(sessionStorage.getItem('user')){
        user = sessionStorage.getItem('user')
        accessToken = sessionStorage.getItem('access_token')
    }
    document.getElementById('userName').innerText = user

    response = await fetch(apiEndpoint + "/viewAll",{
        headers:{
            "Authorization": accessToken
        }
    })
    notesJSON = await response.json()
    notesJSON.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.NoteId;
        optionElement.textContent = option.NoteId;
        dropdown.appendChild(optionElement);
    });
};

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionEL.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.choices.forEach(option => {
        const button = createAnswerButton(option, currentQuestion.correct_answer == option);
        answerButtonsEL.appendChild(button);
    });
}

function createAnswerButton(text, isCorrect) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.classList.add("btn");
    if (isCorrect) {
        button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    return button;
}

function resetState() {
    nextBtnEL.style.visibility = "hidden";
    while (answerButtonsEL.firstChild) {
        answerButtonsEL.removeChild(answerButtonsEL.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonsEL.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtnEL.style.visibility = "visible";
}

function showScore() {
    resetState();
    questionEL.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtnEL.innerHTML = "Play Again";
    nextBtnEL.style.visibility = "visible";
    round = 2
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtnEL.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

 async function getMCQ(){
    document.getElementById('quizC').style.display = 'block'
    noteId = document.getElementById('dropdown').value
    try{
        response = await fetch("https://6va32u1p1g.execute-api.us-east-1.amazonaws.com/Mcq_stage1/mcq?id=" + noteId,{
            method: "POST"
        })
        questions = await response.json()
    } catch (e){
        questions = [
            {
              "choices": [
                "pakistanis",
                "iraqis",
                "Afghans",
                "somalis"
              ],
              "correct_answer": "Afghans",
              "question": "Militarily, the battle pitted the artillery and cavalry of the Marathas against the heavy cavalry and mounted artillery (zamburak and jezail) of the _______ and Rohillas led by Abdali and Najib-ud-Daulah, both ethnic Afghans."
            },
            {
              "choices": [
                "Deccan",
                "enugu",
                "wessex",
                "sultanates"
              ],
              "correct_answer": "Deccan",
              "question": "The main Maratha army was stationed in _______ with the Peshwa."
            },
            {
              "choices": [
                "second",
                "third",
                "fourth",
                "fifth"
              ],
              "correct_answer": "third",
              "question": "The Maratha army was led by Sadashivrao Bhau who was _______ in authority after the Chhatrapati (Maratha King) and the Peshwa (Maratha Prime Minister)."
            },
            {
              "choices": [
                "five",
                "four",
                "two",
                "three"
              ],
              "correct_answer": "two",
              "question": "The battle is considered one of the largest and most eventful fought in the 18th century,[10] and it has perhaps the largest number of fatalities in a single day reported in a classic formation battle between _______ armies."
            },
            {
              "choices": [
                "seljuq",
                "seljuk",
                "Maratha",
                "seleucid"
              ],
              "correct_answer": "Maratha",
              "question": "The forces led by Ahmad Shah Durrani came out victorious after destroying several _______ flanks."
            },
            {
              "choices": [
                "plassey",
                "Panipat",
                "stiklestad",
                "moh\u00e1cs"
              ],
              "correct_answer": "Panipat",
              "question": "Shejwalkar, whose monograph _______ 1761 is often regarded as the single best secondary source on the battle, says that 'not less than 100,000 Marathas (soldiers and non-combatants) perished during and after the battle.'"
            }
          ]
    } 
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtnEL.innerHTML = "Next";
    showQuestion();
}
