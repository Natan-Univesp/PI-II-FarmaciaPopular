

const togglePassword = document.querySelector('#togglePassword');
const senhaInput = document.querySelector('#senha');

togglePassword.addEventListener('click', function (e) {

    const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';


    senhaInput.setAttribute('type', type);

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});