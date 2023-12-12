'use strict'

window.onload = function (){
    let addBtn = document.querySelector("#add");

    addBtn.onclick = function (){
        addNewEntry();
    }

    let showAllEntries = document.querySelector("#showAll");
    showAllEntries.onclick = function (){
        showAll();
    }

    let filterBtn = document.querySelector("#filter");
    filterBtn.onclick = function (){
        filterEntries();
    };

    let showOpen = document.querySelector("#showOpen");
    showOpen.onclick = function (){
        showOpenTasks();
    };

    let deleteClosed = document.querySelector("#deleteClosed");
    deleteClosed.onclick = function (){
        deleteClosedTasks();
    }
}


let number = 1;

function addNewEntry(){
    let title = document.querySelector("#titleInput").value;
    let author = document.querySelector("#authorInput").value;
    let description = document.querySelector("#descriptionInput").value;
    let listOfBugs = document.querySelector("div#listOfBugs");

    if(title !== "" && author !== ""){

            let div_newEntry = document.createElement("div");
            div_newEntry.classList.add("bugEntry", "not_checked");

            // Radio Button offen
            let radio1 = document.createElement("input");
            radio1.type = 'radio';
            radio1.name = "status" + number;
            radio1.value = 'offen';
            radio1.checked = true;
            radio1.addEventListener("change", updateTaskStatus);

            // radio button geschlossen
        let radio2 = document.createElement("input");
            radio2.type = 'radio';
            radio2.name ="status" + number;
            radio2.value = "erledigt";
            radio2.addEventListener("change", updateTaskStatus);

            number++;

        //label erstellen
            let LabelOpen = document.createElement("label");
            LabelOpen.textContent = "Offen";

            let LabelClosed = document.createElement("label");
            LabelClosed.textContent = "Erledigt";

            // radio buttons hinzufügen
            div_newEntry.appendChild(radio1);
            div_newEntry.appendChild(LabelOpen);
            div_newEntry.appendChild(radio2);
            div_newEntry.appendChild(LabelClosed);



            let p_title = document.createElement("p");
            listOfBugs.appendChild(div_newEntry);
            div_newEntry.appendChild(p_title);
            p_title.classList.add("inline");

            // erstellten Elemente hinzufügen
            let text_title = document.createTextNode(" Task: " + title + " | Person: " + author);
            p_title.appendChild(text_title);
            let p_description = document.createElement("p");
            div_newEntry.appendChild(p_description);
            let description_text = document.createTextNode(description);
            p_description.appendChild(description_text);


        // Hilfestellung fürs Filtern später
        let selectName = document.querySelector("#selectName");
        let selectedPerson = selectName.value;

        //Überprüfe, ob die Person schon bereits hinzugefügt wurde zu den Optionen
        let personOption = selectName.querySelector(`option[value="${author}"]`);
        if(!personOption){
            //neue Person hinzufügen
            let newOption = document.createElement("option");
            newOption.value = author;
            newOption.textContent = author;
            selectName.appendChild(newOption);
        }

        // farblich ändern wenn sich der status ändert
        function updateTaskStatus(event) {
            let radio = event.target;
            let taskEntry = radio.parentNode;

            if (radio.value === "erledigt") {
                taskEntry.classList.remove("not_checked");
                taskEntry.classList.add("checked");
            } else {
                taskEntry.classList.remove("checked");
                taskEntry.classList.add("not_checked");
            }
        }
        }else{
        //Fehlermeldung
        alert("Please enter a title and an author!");
    }
    }

// alle Einträge anzeigen
function showAll(){
    let hiddenEntry = document.querySelectorAll("div#listOfBugs div.bugEntry");
    for(let i of hiddenEntry) {
        if (i.style.display === "none") {
            i.style.display = "block";
        }
    }
}

// alle offenen Einträge anzeigen
function showOpenTasks(){
        let allTasks = document.querySelectorAll(".bugEntry");
        allTasks.forEach(task => {
            if (task.classList.contains("checked")) {
                task.style.display = "none"; // Verstecke erledigte Aufgaben
            } else {
                task.style.display = "block"; // Zeige offene Aufgaben
            }
        });
}

// alle geschlossenen Einträge löschen
function deleteClosedTasks(){
    let closedTasks = document.querySelectorAll(".bugEntry.checked");
    closedTasks.forEach(task => {
        task.remove(); // Entferne die geschlossene Aufgabe aus dem DOM-Baum
    });
}


//************ ZUSATZAUFGABE****************

// Einträge nach author filtern
function filterEntries(){
    let selectedPerson = document.querySelector("#selectName").value;
    let taskEntries = document.querySelectorAll(".bugEntry");

    taskEntries.forEach(entry => {
        let author = entry.querySelector("p.inline").textContent;
        if (selectedPerson === "" || author.includes(selectedPerson)) {
            entry.style.display = "block"; // Zeigt die Aufgabe an, wenn keine Person ausgewählt ist oder der Autor übereinstimmt
        } else {
            entry.style.display = "none"; // Verstecke die Aufgabe
        }
    });
}
