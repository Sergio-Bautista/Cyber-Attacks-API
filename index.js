document.addEventListener("DOMContentLoaded", () =>{
    loadAttacks();
});

async function loadAttacks(){
    try{
        const response = await fetch("http://localhost:8000/attacks");
        const attacksData = await response.json();

        const attacksArray = Object.values(attacksData)
        // console.log(attacksArray)

        const container = document.getElementById('button-container');

        container.textContent = "";
        
        attacksArray.forEach(attack =>{
            const button = document.createElement('button')
            button.textContent = attack.name  
            
            
            button.addEventListener('click', ()=>{
                showAttackInfo(attack);
            });
        
            container.append(button);
        });
        

    } catch(error) {
        console.log('Error Loading attack:', error)
    }

}

function showAttackInfo(attack){
    const overlay = document.getElementById("overlayInfo");

    const placeHolder = "There is no information for this at the moment";

    overlay.textContent  = "";
    // console.log(attack["in simple words"])

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


    const closeBtn = document.createElement("button");
    closeBtn.textContent = "close";
    closeBtn.className = 'close-button';

    closeBtn.addEventListener('click', ()=>{
        overlay.style.display = 'none';
    })

    overlay.append(name, category, risk, description, impact, myOwnWords, cweID, remediation, references, learnMore, closeBtn);

    overlay.style.display = 'flex';

}

loadAttacks()
