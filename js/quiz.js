

function getRandomQuestion(questionArray){
    const attacks = questionArray[0].attacks_quiz

    const attackKeys = Object.keys(attacks)

    const randomAttackIndex = Math.floor(Math.random() * attackKeys.length)

    const randomAttack = attackKeys[randomAttackIndex]

    const attack = attacks[randomAttack]

    const questions = attack.questions
    const randomQuestionIndex = Math.floor(Math.random() * questions.length)

    const randomQuestion = questions[randomQuestionIndex];

    return randomQuestion
}


async function loadQuiz(){
    try{
        const response = await fetch("http://localhost:8000/quiz");
        const quizData = await response.json();
        const quizArray = Object.values(quizData)
        // console.log(quizArray[0].attacks_quiz)


        const randomQuestion = getRandomQuestion(quizArray)

       console.log(randomQuestion)


    }
    catch(error){
        console.log("Error loading quiz: ", error)
    }
}

loadQuiz()