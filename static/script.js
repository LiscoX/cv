// zeby dzialalo !! trzeba wlaczyc aplikacje serwera plikiem run.bat w folderze api


//przykladowy fetch
fetch("/", {
    method: "GET"
}).then(response => {
    if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
}).then(data => {
    if(!data) {return;}
    else {console.log(data);}
})