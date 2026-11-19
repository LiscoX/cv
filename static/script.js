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
    
    linkedin : document.getElementById("linkedin"),
    github : document.getElementById("github")
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

function PrintDocument()
{
    console.log(info.tytul.value);
    if(info.tytul.value == ""){
        alert("Uzupełnij pole tytułu")
        return;
    }
    window.location.href = "./templates/template1.html?project=" + info.tytul.value;
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
            info.github.value = data["github"];
            info.linkedin.value = data["linkedin"];
        }
    })
}

async function SaveData()
{
    const saveResponse = await fetch("/saveInfo", {
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
            experience : info.doswiadczenie.value,

            linkedin : info.linkedin.value,
            github : info.github.value
        })
    })

    if(!saveResponse.ok) {
        throw new Error(`Error: ${saveResponse.status}`);
    }

    const picture = document.getElementById("file").files[0];
    if(!picture) {
        return;
    }

    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("project", info.tytul.value);

    const uploadResponse = await fetch("/uploadNewPic", {
        method: "POST",
        body: formData
    })

    if(!uploadResponse.ok) {
        throw new Error(`Error: ${uploadResponse.status}`);
    }
}