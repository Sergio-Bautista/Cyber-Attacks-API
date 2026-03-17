const questionContainer = document.getElementById("question-container");

const optionsContainer = document.getElementById("options");


let score = 0;


function clearScreen(){
    questionContainer.textContent = ""
    optionsContainer.textContent = ""
}


// Function to generate and return a random attack name
function getRandomQuestion(questionArray){
    // get the attacks name from the API
    const attacks = questionArray[0].attacks_quiz

    // get only the name of the attack from the json file
    const attackKeys = Object.keys(attacks)

    // generate a random number to return a ransom name from the json file
    const randomAttackIndex = Math.floor(Math.random() * attackKeys.length)

    // get a random name from the attack list
    const randomAttack = attackKeys[randomAttackIndex]

    return randomAttack
}
async function loadQuiz(){
    clearScreen()
    try{
        // Makes the request to the API server 
        const response = await fetch("http://localhost:8000/quiz");

        // Save the json response and converts it into an array
        const quizData = await response.json();
        const quizArray = Object.values(quizData)

        // get a random attack name
        const randomAttack = getRandomQuestion(quizArray)

        // get the questions array from the given random attack 
        const questions = quizArray[0].attacks_quiz[randomAttack].questions

        // Chose a random question from the array of questions
        const randomQuestionIndex = Math.floor(Math.random() * questions.length)

        // select a question from the array
        const randomQuestion = questions[randomQuestionIndex]

        // get the correct anser for the given question
        const showCorrectAnswer = randomQuestion.answer
        // const correctAnswer = quizArray[0].attacks_quiz[randomAttack].questions[randomQuestionIndex].answer

        const showQuestion = document.createElement("h2");
        showQuestion.textContent = randomQuestion.question || "No Data"

        // console.log(randomQuestion.options)

        const correctAnswer = randomQuestion.answer

        let userOption = ""
        randomQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option

            button.addEventListener('click', function(){
                userOption = this.textContent || "no option"
                // console.log(userOption)
                checkAnswer(userOption, correctAnswer)
            })

            optionsContainer.append(button)
        })
        questionContainer.append(showQuestion)

        console.log(userOption)
        // console.log(randomQuestion)
        // console.log(randomQuestion.question)
        // console.log(randomQuestion.answer)
        // console.log(randomQuestion.options)
        // console.log(correctAnswer)
    }
    catch(error){
        console.log("Error loading quiz: ", error)
    }
}

function checkAnswer(userOption, correctAnswer){
    console.log("user",userOption, "correct",correctAnswer)
    let showScore = document.getElementById("score");    
    if(userOption === correctAnswer){
        score+=10
    }else{
        score-=1
    }
    showScore.textContent = score
    loadQuiz()
}


loadQuiz()