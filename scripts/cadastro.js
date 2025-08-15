// cadastro.js - Responsável pelo cadastro de novos usuários

document.addEventListener('DOMContentLoaded', function() {
    // Configurar formulário de cadastro
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpar erros anteriores
            clearErrors();
            
            // Obter valores do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validar campos
            let isValid = true;
            
            if (nome.trim().length < 3) {
                showError('nome-error', 'O nome deve ter pelo menos 3 caracteres');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                showError('email-error', 'E-mail inválido');
                isValid = false;
            }
            
            if (!validatePassword(password)) {
                showError('password-error', 'A senha deve ter pelo menos 6 caracteres, incluindo letras e números');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                showError('confirm-password-error', 'As senhas não coincidem');
                isValid = false;
            }
            
            if (isValid) {
                // Verificar se o e-mail já está em uso
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const existingUser = users.find(u => u.email === email);
                
                if (existingUser) {
                    showError('email-error', 'Este e-mail já está em uso');
                } else {
                    // Criar novo usuário
                    const newUser = {
                        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                        nome: nome,
                        email: email,
                        password: password
                    };
                    
                    // Adicionar ao array de usuários
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    // Redirecionar para login
                    alert('Cadastro realizado com sucesso! Faça login para continuar.');
                    window.location.href = '/index.html';
                }
            }
        });
    }
    
    // Funções auxiliares
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        return re.test(password);
    }

});