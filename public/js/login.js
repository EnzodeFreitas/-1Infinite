const btn_login = document.querySelector("#login");
const btn_cadastro = document.querySelector("#cadastro");
const btn_entrar = document.querySelector("#entrar");
const btn_registro = document.querySelector("#register");
const form_login = document.querySelector(".login-form");
const form_registro = document.querySelector(".register-form");

btn_login.addEventListener('click', () => {
  mudarParaLogin()
})

btn_registro.addEventListener('click', () => {

  btn_login.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  btn_registro.style.backgroundColor = "#21264D";

  form_login.style.left = "150%";
  form_registro.style.left = "50%";

  form_login.style.opacity = 0;
  form_registro.style.opacity = 1;

  document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";

})

btn_cadastro.addEventListener('click', () => {
  var nome = nomeCadastro.value;
  var email = emailCadastro.value;
  var senha = senhaCadastro.value;
  var confirmarSenha = confirmarSenhaCadastro.value;

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nome,
      senhaServer: senha,
      emailServer: email
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
        mudarParaLogin()

        document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";

        limparFormularioCadastro()
        // finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`ERRO: ${resposta}`);
      // finalizarAguardar();
    });

  return false;

})

btn_entrar.addEventListener('click', () => {
  var email = emailEntrar.value;
  var senha = senhaEntrar.value;

  if (email == "" || senha == "") {
    alert("Por favor, preencha os campos de login.");
    return;
  }

  console.log("FORM LOGIN: ", email);
  console.log("FORM SENHA: ", senha);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: email,
      senhaServer: senha
    })
  }).then(function (resposta) {
    if (resposta.ok) {
      alert("Login realizado com sucesso!\nRedirecionando para seu diário de bordo...");

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;

        setTimeout(function () {
          window.location = "../map.html";
        }, 1000); // apenas para exibir o loading
      });

    } else {
      alert("Houve um erro ao tentar realizar o login!");
      console.log("Houve um erro ao tentar realizar o login!");
      resposta.text().then(texto => {
        console.error(texto);
        // finalizarAguardar(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;


})



function mudarParaLogin() {
  btn_login.style.backgroundColor = "#21264D";
  btn_registro.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

  form_login.style.left = "50%";
  form_registro.style.left = "-50%";

  form_login.style.opacity = 1;
  form_registro.style.opacity = 0;

  document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
}

function limparFormularioCadastro() {
  document.querySelector("#nomeCadastro").value = "";
  document.querySelector("#emailCadastro").value = "";
  document.querySelector("#senhaCadastro").value = "";
  document.querySelector("#confirmarSenhaCadastro").value = "";
}
