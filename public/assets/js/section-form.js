document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Coleta os valores dos campos do formulário
    var name = document.getElementById('nameInput').value;
    var telephone = document.getElementById('telephoneInput').value;
    var email = document.getElementById('emailInput').value;
    var message = document.getElementById('mesageTextArea').value;

    var consent = document.getElementById('consentCheckbox').checked;

    if (!consent) {
        showNotification("Você precisa aceitar a Política de Privacidade para prosseguir.", "error");
        return;
    }

    // Verifica se os campos obrigatórios estão preenchidos
    if (name === "" || telephone === "" || email === "") {
        showNotification("Favor complete todos os campos de nome, whatsapp e e-mail!", "error");
        return;
    }

    // Cria os dados no formato URL-encoded
    var formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('telephone', telephone);
    formData.append('email', email);
    formData.append('message', message);

    // Envia os dados para o webhook usando a API Fetch com um cabeçalho de autenticação
    fetch('https://hook.us1.make.com/063qake1zvsamf24mlmiwo1omb7qti4x', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer SEU_TOKEN_DE_SEGURANÇA' // Substitua 'SEU_TOKEN_DE_SEGURANÇA' pelo token real
        },
        body: formData.toString()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status + ' ' + response.statusText);
            }
            return response.text(); // Corrige para tratar a resposta como texto
        })
        .then(data => {
            console.log('Resposta do servidor:', data); // Mostra a resposta para diagnóstico
            showNotification('Obrigado por se cadastrar, Em breve entraremos em contato!!!', "success");
            // Limpa os campos após o envio
            document.getElementById('nameInput').value = "";
            document.getElementById('telephoneInput').value = "";
            document.getElementById('emailInput').value = "";
            document.getElementById('mesageTextArea').value = "";
        })
        .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
            showNotification('Ocorreu um erro ao enviar o formulário. Tente novamente. Detalhes do erro: ' + error.message, "error");
        });
});

// Função para mostrar a notificação
function showNotification(message, type) {
    var notification = document.getElementById('notification');
    notification.innerText = message; // Define a mensagem da notificação
    notification.className = 'notification ' + type; // Define a classe de tipo (sucesso ou erro)
    notification.style.display = 'block'; // Mostra a notificação
    notification.style.top = '20px'; // Move a notificação para a tela

    // Esconde a notificação após 3 segundos
    setTimeout(function () {
        notification.style.top = '-50px'; // Move a notificação para fora da tela
        setTimeout(function () {
            notification.style.display = 'none'; // Esconde a notificação completamente após a animação
        }, 500); // Espera pela animação de saída
    }, 3000); // Tempo em milissegundos que a notificação permanece visível
}