


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

    // const attack = attacks[randomAttack]

    // const questions = attack.questions
    // const randomQuestionIndex = Math.floor(Math.random() * questions.length)

    // const randomQuestion = questions[randomQuestionIndex];

    // return the attack name
    return randomAttack
}


async function loadQuiz(){
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
        const correctAnswer = quizArray[0].attacks_quiz[randomAttack].questions[randomQuestionIndex].answer

        // console.log(questions)
        // console.log(randomQuestionIndex)
        // console.log(randomQuestion)
        // console.log(correctAnswer)


    //    console.log(quizArray[0].attacks_quiz[randomAttack].questions[0].answer)

    //   console.log(quizArray[0].attacks_quiz[randomAttack].questions)

    }
    catch(error){
        console.log("Error loading quiz: ", error)
    }
}

loadQuiz()