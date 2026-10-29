// zeby dzialalo !! trzeba wlaczyc aplikacje serwera plikiem run.bat w folderze api

fetch("/info", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name : "leos",
        age : "16"
    })
}).then(response => {
    if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
}).then(data => {
    if(!data) {return;}
    else {console.log(data);}
})