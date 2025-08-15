document.addEventListener("DOMContentLoaded", () => {
  const usuarioEditando = JSON.parse(localStorage.getItem("usuarioEditando"));
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];

  if (!usuarioEditando) {
    alert("Nenhum usuário selecionado para edição.");
    window.location.href = "../pages/lista.html";
    return;
  }

  const form = document.getElementById("perfilForm");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const dataNascInput = document.getElementById("dataNasc");
  const fotoInput = document.getElementById("fotoPerfil");
  const fotoPreview = document.getElementById("foto-preview");

  // Preenche campos
  nomeInput.value = usuarioEditando.nome || "";
  emailInput.value = usuarioEditando.email || "";
  senhaInput.value = usuarioEditando.password || ""; // Corrigido: pode ser "password"
  dataNascInput.value = usuarioEditando.dataNasc || "";

  if (usuarioEditando.fotoBase64) {
    fotoPreview.src = usuarioEditando.fotoBase64;
  }

  fotoInput.addEventListener("change", () => {
    const file = fotoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result;
        fotoPreview.src = base64;
        usuarioEditando.fotoBase64 = base64;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      ...usuarioEditando,
      nome: nomeInput.value,
      password: senhaInput.value,
      dataNasc: dataNascInput.value,
    };

    if (usuarioEditando.fotoBase64) {
      dadosAtualizados.fotoBase64 = usuarioEditando.fotoBase64;
    }

    // Atualiza o usuário na lista
    const novosUsuarios = usuarios.map((u) =>
      u.email === usuarioEditando.email ? dadosAtualizados : u
    );

    localStorage.setItem("users", JSON.stringify(novosUsuarios));
    localStorage.removeItem("usuarioEditando");

    alert("Usuário atualizado com sucesso!");
    location.href = "../pages/lista.html";
  });
});
