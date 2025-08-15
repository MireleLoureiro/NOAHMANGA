const loginScreen = document.getElementById("login-screen");
    const recoveryScreen = document.getElementById("recovery-screen");
    const linkToRecovery = document.getElementById("link-to-recovery");
    const backToLogin = document.getElementById("back-to-login");

   
    linkToRecovery.addEventListener("click", function(event) {
      event.preventDefault();
      loginScreen.classList.add("hidden");
      recoveryScreen.classList.remove("hidden");
    });

   
    backToLogin.addEventListener("click", function(event) {
      event.preventDefault();
      recoveryScreen.classList.add("hidden");
      loginScreen.classList.remove("hidden");
     
      document.getElementById("nova-senha").innerText = "";
      
      document.getElementById("nome").value = "";
      document.getElementById("email-recuperacao").value = "";
    });

  
    document.getElementById("login-form").addEventListener("submit", function(event) {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;

      if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValido) {
        alert("Digite um e-mail válido.");
        return;
      }

     
      // Pega os usuários cadastrados no localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Busca o usuário pelo email
      const usuario = users.find(u => u.email === email);

      if (!usuario) {
        alert("Usuário não encontrado. Cadastre-se antes.");
        return;
      }

      if (usuario.password !== senha) {
        alert("Senha incorreta.");
        return;
      }

      // Se chegou aqui, usuário e senha estão corretos
      alert("Login realizado com sucesso!");
      
      // Pode salvar o usuário logado (opcional)
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      location.href = "../pages/lista.html";
});

   
document.getElementById("recovery-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email-recuperacao").value.trim();

  if (!nome || !email) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  if (!usuarioSalvo) {
    alert("Nenhum usuário cadastrado. Cadastre-se antes.");
    return;
  }

  if (usuarioSalvo.nome !== nome || usuarioSalvo.email !== email) {
    alert("Nome ou e-mail incorretos.");
    return;
  }

  const novaSenha = Math.floor(100000 + Math.random() * 900000).toString();

  usuarioSalvo.senha = novaSenha;
  localStorage.setItem("usuario", JSON.stringify(usuarioSalvo));

  document.getElementById("nova-senha").innerText = "Sua nova senha é: " + novaSenha;
});