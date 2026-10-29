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