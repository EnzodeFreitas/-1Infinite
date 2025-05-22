const btn_login = document.querySelector("#login");
const btn_cadastro = document.querySelector("#cadastro");
const btn_registro = document.querySelector("#register");
const form_login = document.querySelector(".login-form");
const form_registro = document.querySelector(".register-form");

btn_login.addEventListener('click', () => {
    btn_login.style.backgroundColor = "#21264D";
    btn_registro.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    form_login.style.left = "50%";
    form_registro.style.left = "-50%";

    form_login.style.opacity = 1;
    form_registro.style.opacity = 0;

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
    
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

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nome,
        senhaServer: senha,
        emailServer: email
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
        

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          // limparFormulario();
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

