const form = document.getElementById('signup-form');
const toast = document.getElementById('toast');

const showToast = (message, isError = false) => {
  toast.textContent = message;
  toast.style.background = isError ? '#dc2626' : '#22c55e';
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 3500);
};

const setError = (name, message) => {
  const error = document.querySelector(`[data-error-for="${name}"]`);
  if (error) {
    error.textContent = message;
  }
};

const clearErrors = () => {
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
};

const validateForm = (data) => {
  clearErrors();
  let isValid = true;

  if (!data.name.trim()) {
    setError('name', 'Informe o nome completo.');
    isValid = false;
  }

  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    setError('email', 'Digite um e-mail válido.');
    isValid = false;
  }

  if (!data.phone.trim()) {
    setError('phone', 'Informe um telefone para contato.');
    isValid = false;
  }

  if (data.password.length < 6) {
    setError('password', 'A senha deve ter ao menos 6 caracteres.');
    isValid = false;
  }

  if (data.password !== data.confirm) {
    setError('confirm', 'As senhas precisam ser iguais.');
    isValid = false;
  }

  if (!form.terms.checked) {
    showToast('Você precisa aceitar os termos para continuar.', true);
    isValid = false;
  }

  return isValid;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(form).entries());

  if (!validateForm(formData)) return;

  form.reset();
  showToast('Cadastro realizado com sucesso!');
});
