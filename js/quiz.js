
// initializes the user score and tracks number of questions answered
let score = 0;
let numberOfQuestions = 0;


// access the containers for the questions/options
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options");
const buttonNumber = document.querySelector("button");

// loads the main function
buttonNumber.addEventListener('click', loadQuiz);

// checks if the questions answered is equal to the questions the user wanted
function checkMaxQuestions(questionsNumber){
    // TODO
    // implement an overlay screen with score and questions wrong
    // console.log(questionsNumber)
    if(numberOfQuestions == questionsNumber){
        console.log("end quiz here");
    };
};

// clears question and option containers 
function clearScreen(){
    questionContainer.textContent = "";
    optionsContainer.textContent = "";
};

// Function to generate and return a random attack name
function getRandomQuestion(questionArray){
    // get the attacks name from the API
    const attacks = questionArray[0].attacks_quiz;

    // get only the name of the attack from the json file
    const attackKeys = Object.keys(attacks);

    // generate a random number to return a ransom name from the json file
    const randomAttackIndex = Math.floor(Math.random() * attackKeys.length);

    // get a random name from the attack list
    const randomAttack = attackKeys[randomAttackIndex];

    return randomAttack;
};
async function loadQuiz(){
    // get the number of questions the user wants 
    const questionsNumber = document.querySelector("input").value;

    // hides the input field and button
    buttonNumber.style.display = "none"
    document.querySelector("input").style.display = 'none'

    // calls the clear function every time to place the new question/options
    clearScreen()
    try{
        // Makes the request to the API server 
        const response = await fetch("http://localhost:8000/quiz");

        // Save the json response and converts it into an array
        const quizData = await response.json();
        const quizArray = Object.values(quizData);

        // get a random attack name
        const randomAttack = getRandomQuestion(quizArray);

        // get the questions array from the given random attack 
        const questions = quizArray[0].attacks_quiz[randomAttack].questions;

        // Chose a random question from the array of questions
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);

        // select a question from the array
        const randomQuestion = questions[randomQuestionIndex];

        // get the correct anser for the given question (just in case)
        const showCorrectAnswer = randomQuestion.answer;

        // creates an h2 element to place the question
        const showQuestion = document.createElement("h2");
        showQuestion.textContent = randomQuestion.question || "No Data";

        // get the correct answer for comparison
        const correctAnswer = randomQuestion.answer;

        // initializes the user option
        let userOption = "";

        // loops thorough the options of a given question 
        randomQuestion.options.forEach(option => {
            // and creates a button with each option in it
            const button = document.createElement("button");
            button.textContent = option;

            // adds an event listener to each button, and assigns the content of the button to the user's options
            button.addEventListener('click', function(){
                userOption = this.textContent || "no option";

                // calls the function to check if the user has reach the number of questions wanted
                checkAnswer(userOption, correctAnswer, questionsNumber);
            });
            // appends the buttons to the option container for display 
            optionsContainer.append(button);
        });
        // appends the questions to the question container for display
        questionContainer.append(showQuestion);
    }
    // logs if there is an error 
    catch(error){
        console.log("Error loading quiz: ", error);
    };
};

// keeps track of user score, checks if the questions limits has been reached, and loads the next question
function checkAnswer(userOption, correctAnswer, questionsNumber){
    // access the score of the user for display
    let showScore = document.getElementById("score");
    
    // checks if the user got the question correct and adds/subtracts pints from user score
    //  TODO: Implement a better score system
    if(userOption === correctAnswer){
        score+=10;
    }else{
        score-=1;
    };
    // adds one to the number of questions
    numberOfQuestions += 1;
    // shows the score in the scree
    showScore.textContent = score;
    // console.log("user #",Number(questionsNumber))
    // console.log("#Qs", numberOfQuestions)

    // check if the number of questions has been reached
    checkMaxQuestions(questionsNumber);
    // calls the main function to load a new question
    loadQuiz();
};