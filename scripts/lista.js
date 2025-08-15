document.getElementById("btn-manga").addEventListener("click", () => {
    window.location.href = "../pages/manga.html";
  });

let usuarios = [];

if (localStorage.getItem("users")) {
    usuarios = JSON.parse(localStorage.getItem("users"))
}

usuarios.forEach((e, indice) => {
    
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdAcoes = document.createElement("td");

    // define os data-label para o CSS responsivo (mostra o nome da coluna em mobile)
    tdId.setAttribute('data-label', 'ID');
    tdNome.setAttribute('data-label', 'Nome');
    tdAcoes.setAttribute('data-label', 'Ações');

    let btnDlt = document.createElement("button");
    let btnEdt = document.createElement("button");
    tdAcoes.append(btnDlt, btnEdt);

    tdId.innerHTML = `${indice + 1}`;
    tdNome.innerHTML = `${e.nome}`;
    btnDlt.innerHTML = "Deletar";
    btnEdt.innerHTML = "Editar";

    tr.append(tdId, tdNome, tdAcoes);

    deletar(btnDlt, indice);
    btnEdt.onclick = () => {
        // Salva o usuário no localStorage
        localStorage.setItem("usuarioEditando", JSON.stringify(e));
        location.href = "../pages/perfil.html";
    };




    document.querySelector(".tabela").append(tr);
});

function deletar(btnDlt, indice) {
    btnDlt.addEventListener('click', () => {
        usuarios.splice(indice, 1);
        localStorage.setItem("users", JSON.stringify(usuarios));
        location.reload();
    })
}