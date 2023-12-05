document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('show');
});

if(window.location.pathname.includes('insurance-detail.html')){
    document.querySelector('.button-back').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    document.querySelector('.button-contact').addEventListener('click', function() {
        window.location.href = 'contact.html';
    });
}

var deleteButtons = document.querySelectorAll('.insurance-box');

deleteButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        window.location.href = 'insurance-detail.html';
    });
});

window.onload = function() {
    if(window.location.pathname.includes('contact.html')){
        obtainInsuranceTypes();
    }
};

function obtainInsuranceTypes() {
    fetch('assets/resources/get_insurance_types.php')
    .then(response => response.json())
    .then(data => {
        var select = document.getElementById('typeInsurance');
        data.forEach(function(tipo) {
            var option = document.createElement('option');
            option.value = tipo.TipoSeguroID;
            option.text = tipo.Descripcion;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

if(window.location.pathname.includes('contact.html')){
    document.getElementById('customerRegistration').onsubmit = function(event) {
        // Prevenir el envío del formulario de manera predeterminada
        event.preventDefault();

        // Validación de ejemplo, puedes añadir más según sea necesario
        var nombre = document.getElementById('name').value;
        var apellido = document.getElementById('lastName').value;
        var telefono = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        
        if(nombre === '' || apellido === '' || telefono === '' || email === '') {
            alert('Por favor, completa todos los campos.');
            return false;
        }
    
        // Si la validación es exitosa, enviar el formulario
        sendCustomerRegistration();
    };
}


function sendCustomerRegistration() {
    var formData = new FormData(document.getElementById('customerRegistration'));

    fetch('assets/resources/insert_customer.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then((text) => {
        let emailValidation = (text === 'duplicateEmail');
        let box = emailValidation ? 'warning' : 'infoAlert';
        let message = emailValidation ? 'El correo electrónico ya se encuentra registrado.' : text;

        document.getElementById(box).innerText = message;
        document.getElementById(box).classList.remove('hide');

        if(!emailValidation){
            document.getElementById("customerRegistration").reset();
        }
        
        setTimeout(function(){ 
            document.getElementById(box).classList.add('hide');
        }, 3000);
    })
    .catch(error => console.error('Error:', error));
}