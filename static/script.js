// zeby dzialalo !! trzeba wlaczyc aplikacje serwera plikiem run.bat

var info = {
    tytul : document.getElementById("tytul"),

    imie : document.getElementById("nazwisko"),
    tel : document.getElementById("telefon"),
    dataUrodzenia : (document.getElementById("dataUrodzenia")),

    wyksztalcenie : document.getElementById("wyksztalcenie"),
    szkola : document.getElementById("szkola"),

    opis : document.getElementById("opis"),
    doswiadczenie : document.getElementById("doswiadczenie"),
}


function LoadProjects()
{
    let select = document.getElementById("projekty");

    fetch("/getSaved", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        if(!data) {return;}
        else {
            select.innerHTML = "<option value='__create__new'>(Nowy projekt)</option>";
            data.forEach(e => {
                select.innerHTML += "<option value='" + e + "'> " + e + " </option";
            });
        }
    })
}

function LoadData(){
    let projectName = document.getElementById("projekty").value;

    if(projectName == "__create__new"){ return; }

    fetch("/getInfo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title : projectName,
        })
    }).then(response => {
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        if(!data) {return;}
        else {
            info.tytul.value = projectName;
            
            info.imie.value = data["name"];
            info.imie.tel = data["phone"];
            info.dataUrodzenia.value = data["birthday"];
            info.wyksztalcenie.value = data["education"];
            info.szkola.value = data["school"];
            info.opis.value = data["about"];
            info.doswiadczenie.value = data["experience"];
        }
    })
}

function SaveData()
{
    fetch("/saveInfo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : info.imie.value,
            title : info.tytul.value,
            phone : info.tel.value,
            birthday : info.dataUrodzenia.value,

            education : info.wyksztalcenie.value,
            school : info.szkola.value,

            about : info.opis.value,
            experience : info.doswiadczenie.value
        })
    }).then(response => {
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        if(!data) {return;}
        else {
            console.log(data);
        }
    })
}

/* 

// Get elements
const templateSelect = document.getElementById('template');
const modal = document.getElementById('templateModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];

// Show modal when a template is selected
templateSelect.addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const imgSrc = selectedOption.getAttribute('data-img');
    
    if (imgSrc) {
        modal.style.display = "block";
        modalImg.src = imgSrc;
    }
});

// Close modal when clicking the "X" button
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking anywhere outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

*/