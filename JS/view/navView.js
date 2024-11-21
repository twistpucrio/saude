var expanded = false;

function showCheckboxes(){
    var checkboxes = document.getElementById("checkboxes");
    if(!expanded){
        checkboxes.style.display = "block";
        expanded = true;
    }
    else{
        checkboxes.style.display = "none";
        expanded = false;
    }
}

const navView = (() => {
   
    const displayError = (message) => {
        document.getElementById('details').innerHTML = `<p>${message}</p>`;
    };

    const displayHospitalsNav = (hospitals) => {
        hospitals.forEach(hospital =>{
            alert("OI");
            document.getElementById('displayHospitaisEncontrados').innerHTML = `
            <h2>${hospital.nome}</h2>
            <p><strong>Endereço:</strong> ${hospital.endereco}</p>
            `; 
        })
        
    };
    


    return {
        displayHospitalsNav,
        displayError
    };
})();