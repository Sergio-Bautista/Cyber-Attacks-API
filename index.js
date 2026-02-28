document.addEventListener("DOMContentLoaded", () =>{
    loadAttacks();
});

// if search function is implemented 
function slugify (text){
  return text
    .toLowerCase()      // "SQL Attack" -> "sql attack"
    .trim()             // Removes accidental spaces at the ends
    .split(' ')         // Splits into an array: ["sql", "attack"]
    .filter(word => word !== "") // Removes extra spaces in between words
    .join('-');         // Joins them back: "sql-attack"
};


async function loadAttacks(){
    // makes a fetch request to the server  
    try{
        const response = await fetch("http://localhost:8000/attacks");
        const attacksData = await response.json();

        // converts the json response to an array 
        const attacksArray = Object.values(attacksData)

        const container = document.getElementById('button-container');

        // clears container content 
        container.textContent = "";
    
        // creates a button for each attack there is in the response file and displays its name
        attacksArray.forEach(attack =>{
            const button = document.createElement('button')
            button.textContent = attack.name  
             
            // calls the function to display the attack information
            button.addEventListener('click', ()=>{
                showAttackInfo(attack);
            });
        
            // appends the button to the container
            container.append(button);
        });
        

    } catch(error) {
        console.log('Error Loading attack:', error)
    }

}

function showAttackInfo(attack){
    const overlay = document.getElementById("overlayInfo");

    const placeHolder = "There is no information for this at the moment";

    // clears the overlay screen is there is any errors
    overlay.textContent  = "";

    // display the different information from the attack and adds it to the overlay container
    const name = document.createElement("h1");
    name.textContent = attack.name || placeHolder

    const category = document.createElement("p");
    category.textContent = attack.category || placeHolder

    const risk = document.createElement("span");
    risk.textContent = `Risk: \n${attack.risk || placeHolder}`

    const description = document.createElement("p");
    description.style.whiteSpace = "pre-wrap";
    description.textContent = `Description: \n${attack.description || placeHolder}`

    const impact = document.createElement("p");
    impact.textContent = attack.impact || placeHolder

    const myOwnWords = document.createElement("p");
    myOwnWords.textContent = attack["in simple words"] || "hello"

    const cweID = document.createElement("span");
    cweID.textContent = attack.cwe_id || placeHolder

    const remediation = document.createElement("span");
    remediation.textContent = attack.remediation || placeHolder

    const references = document.createElement("span");
    references.textContent = attack.references || placeHolder

    const learnMore = document.createElement("span");
    learnMore.textContent = attack["learn more"] || placeHolder


    // creates a close button for the overlay container
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "close";
    closeBtn.className = 'close-button';

    closeBtn.addEventListener('click', ()=>{
        overlay.style.display = 'none';
    })

    // appends the information to the overlay screen
    overlay.append(name, category, risk, description, impact, myOwnWords, cweID, remediation, references, learnMore, closeBtn);

    // set the style of the overlay screen to display the buttons
    overlay.style.display = 'flex';

}

// calls the function
loadAttacks()
