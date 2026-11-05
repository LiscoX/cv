// zeby dzialalo !! trzeba wlaczyc aplikacje serwera plikiem run.bat w folderze api


function WczytajProjekty()
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
            select.innerHTML = "<option value='new'>(Nowy projekt)</option>";
            data.forEach(e => {
                select.innerHTML += "<option value='" + e + "'> " + e + " </option";
            });
        }
    })
}

function ZapiszDane()
{
    let tytul = document.getElementById("tytul").value;

    let imie = document.getElementById("nazwisko").value;
    let dataUrodzenia = (document.getElementById("dataUrodzenia").value).toString();

    let wyksztalcenie = document.getElementById("tytul").value;
    let szkola = document.getElementById("szkola").value;

    let opis = document.getElementById("opis").value;
    let doswiadczenie = document.getElementById("doswiadczenie").value;

    fetch("/saveInfo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : imie,
            title : tytul,
            birthday : dataUrodzenia,

            education : wyksztalcenie,
            school : szkola,

            about : opis,
            experience : doswiadczenie
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