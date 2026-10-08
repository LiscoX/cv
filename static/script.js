// DANE SERWERA (nie mamy serwera wiec jest lokalnie)
let address = "127.0.0.1";
let port = "8000";
// zeby dzialalo !! trzeba wlaczyc aplikacje serwera plikiem run.bat w folderze api


//przykladowy fetch
fetch("127.0.0.1:8000/", {
    method: "GET",
    headers: {
        'Access-Control-Allow-Origin':'*'
    }
}).then(response => {
    if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
}).then(data => {
    if(!data) {return;}
    else {console.log(data);}
})