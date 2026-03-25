// initializes the user score and tracks number of questions answered
let score = 0;
let numberOfQuestions = 0;
let reviewQuestions = [];

// access the containers for the questions/options
const showScore = document.getElementById("score");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options");
const buttonNumber = document.querySelector("button");
const reviewContainerQuestion = document.getElementById("review-container-question")
const overlay = document.getElementById("overlayInfo");
const closeBtn = document.createElement("button");

closeBtn.addEventListener('click', ()=>{
    clearEverything()
})
// loads the main function
buttonNumber.addEventListener('click', loadQuiz);

function clearEverything(){
    // console.log("everything cleared")
    reviewQuestions.length = 0;
    score = 0;
    numberOfQuestions = 0;const allButtons = document.querySelectorAll('#options button');
        // allButtons.forEach(btn => btn.disabled = true);
    buttonNumber.style.display = ""
    document.querySelector("input").style.display = ''
    document.querySelector("h1").style.display = ''
    questionContainer.textContent = "";
    optionsContainer.textContent = "";
    reviewContainerQuestion.textContent = "";
    overlay.style.display = 'none'
    document.body.classList.remove('no-scroll')
}

function displayQuestionsAndAnswers(questionsNumber){
    if(numberOfQuestions === Number(questionsNumber)){

        closeBtn.className = 'close-button';
        closeBtn.textContent = "close";
        reviewContainerQuestion.textContent = "";
        
        // iterates through the questions the user has answered
        reviewQuestions.forEach(question =>{
            // creates an h2 element to display the question answered for review and adds it to the container
            const showReviewQuestion = document.createElement('h2');
            showReviewQuestion.textContent = question.question;
            reviewContainerQuestion.append(showReviewQuestion)
        
            // iterates through each question's options 
            question.options.forEach(option =>{
                // creates a div element to display the options for each question
                const reviewOption = document.createElement('div')
                reviewOption.textContent = option

                // adds the options to the container
                reviewContainerQuestion.append(reviewOption)
            })
        });
        overlay.append(reviewContainerQuestion)
        overlay.append(showScore)
        overlay.append(closeBtn)
    };
}
// review the questions that your got wrong only (future)
// function retryWrongQuestionsOnly(){
//     console.log("These are the questions you got wrong")
//     const wrongReviewQuestions = reviewQuestions.filter(question =>{
//        return question.answerCorrectly !== true;    
//     })
//     console.log(wrongReviewQuestions)
//     clearEverything()

// }

// checks if the questions answered is equal to the questions the user wanted
function checkMaxQuestions(questionsNumber){
    // checks if the the questions answered is equal to the user's chosen number
    if(numberOfQuestions === Number(questionsNumber)){
        // prevents the background to scroll when overlay is displayed
        document.body.classList.add('no-scroll')
        closeBtn.className = 'close-button';
        closeBtn.textContent = "close";
        reviewContainerQuestion.textContent = "";
        
        // iterates through the questions the user has answered
        reviewQuestions.forEach(question =>{

            // creates a div to add each question/options
            const questionBox = document.createElement('div');
            questionBox.className = 'review-question-set'

            // creates an h2 element to display the question answered for review and adds it to the container
            const showReviewQuestion = document.createElement('h2');
            showReviewQuestion.textContent = question.question;

            // appends the div with question/option to the overlay
            questionBox.append(showReviewQuestion)
            
            // iterates through each question's options 
            question.options.forEach(option =>{
                // creates a div element to display the options for each question
                const reviewOption = document.createElement('div')
                reviewOption.textContent = option;
                reviewOption.className = "review-option-item";
                
                // adds a green border to the correct option 
                if (option === question.answer ){
                    reviewOption.classList.add("correctOption")    
                }                
                // checks for the flag and add the class to the element
                else if(question.answerCorrectly){
                    showReviewQuestion.classList.add("rightQuestion");
                }else{
                    showReviewQuestion.classList.add("wrongQuestion");
                    reviewOption.classList.add("wrongOption")
                    const optionIndex = question.options.indexOf(option);
                    
                    // adds a blue border to the option chosen if the answer is wrong
                    if (!question.answerCorrectly && optionIndex === question.userAnswerIndex) {
                        reviewOption.classList.add('userAnswer')
                        reviewOption.classList.toggle("wrongOption")
                    }
                };
                // adds the options to the container
                questionBox.append(reviewOption)
            })
            reviewContainerQuestion.append(questionBox)
        });
        overlay.append(reviewContainerQuestion)
        overlay.append(showScore)
        overlay.append(closeBtn)
        // allows the overlay to be showed 
        overlay.style.display = "flex"
    };
};

// clears question and option containers 
function clearScreen(){
    questionContainer.textContent = "";
    optionsContainer.textContent = "";
    buttonNumber.style.display = "none"
    document.querySelector("input").style.display = 'none'
    document.querySelector("h1").style.display = 'none'
};
// Function to generate and return a random attack name
function getRandomQuestion(questionArray){
    // get the attacks name from the API
    const attacks = questionArray[0].attacks_quiz;

    // get only the name of the attack from the json file
    const attackKeys = Object.keys(attacks);

    // generate a random number to return a random name from the json file
    const randomAttackIndex = Math.floor(Math.random() * attackKeys.length);

    // get a random name from the attack list
    const randomAttack = attackKeys[randomAttackIndex];

    return randomAttack;
};
async function loadQuiz(){
    // get the number of questions the user wants 
    clearScreen()
    const questionsNumber = document.querySelector("input").value;
    // console.log(questionsNumber)

    // hides the input field and button
    // buttonNumber.style.display = "none"
    // document.querySelector("input").style.display = 'none'

    // calls the clear function every time to place the new question/options
    try{
        // Makes the request to the API server locally 
        const response = await fetch("http://localhost:8000/quiz");
        // Makes the request to the API when is hosted in railways
        // const response = await fetch("https://cyber-attacks-api-production.up.railway.app/quiz")

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
        // const showCorrectAnswer = randomQuestion.answer;

        // creates an h2 element to place the question
        const showQuestion = document.createElement("h2");
        showQuestion.textContent = randomQuestion.question || "No Data";

        // get the correct answer for comparison
        // const correctAnswer = randomQuestion.answer;

        // loops thorough the options of a given question 
        randomQuestion.options.forEach((option, index) => {
            // and creates a button with each option in it
            const button = document.createElement("button");
            button.textContent = option;
            // console.log("option:", option)
            // console.log("option:", index)

            // adds an event listener to each button, and assigns the content of the button to the user's options
            button.addEventListener('click', function(){
                // adds content of the button to the user option and adds it to the question object 

                randomQuestion.userAnswerIndex = index;
                // const userOption = this.textContent || "no option";
                // randomQuestion.userAnswer = userOption

                // calls the function to check if the user has reach the number of questions wanted
                checkAnswer(index, questionsNumber, randomQuestion);
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
function checkAnswer(userIndex, questionsNumber, randomQuestion){
    
    // adds a boolean property value to the question object 
    const correctIndex = randomQuestion.options.indexOf(randomQuestion.answer)
    randomQuestion.answerCorrectly = userIndex === correctIndex;

    // checks if the answer is correct or not to add points
    if(randomQuestion.answerCorrectly){
        score+=10;
    }else{
        score-=1;
    };

    // pushes the question answered to the review question array
    reviewQuestions.push(randomQuestion)
    
    // adds one to the number of questions
    numberOfQuestions ++;
    // shows the score in the scree
    showScore.textContent = score;

    // check if the number of questions has been reached
    checkMaxQuestions(questionsNumber);
    // calls the main function to load a new question
    loadQuiz();
};