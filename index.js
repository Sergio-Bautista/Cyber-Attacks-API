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

    overlay.textContent  = "";

    const description = document.createElement("p");
    description.textContent = attack.description || "There is no description for this attack at this time"


    const closeBtn = document.createElement("button");
    closeBtn.textContent = "close";
    closeBtn.className = 'close-button';

    closeBtn.addEventListener('click', ()=>{
        overlay.style.display = 'none';
    })

    overlay.append(description, closeBtn);

    overlay.style.display = 'flex';

}

loadAttacks()
