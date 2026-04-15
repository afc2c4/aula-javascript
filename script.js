document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MANIPULAÇÃO DO DOM E EVENTOS DE TECLADO (INTERATIVIDADE)
    // =========================================================
    const htmlElement = document.documentElement; // Captura a tag <html>

    // Ouve qualquer tecla pressionada na página
    document.addEventListener('keydown', (evento) => {
        // Ignora se o usuário estiver digitando dentro de um input
        if (evento.target.tagName === 'INPUT') return; 

        if (evento.key.toLowerCase() === 'd') {
            htmlElement.setAttribute('data-bs-theme', 'dark'); // Aplica o Dark Mode
        } else if (evento.key.toLowerCase() === 'l') {
            htmlElement.setAttribute('data-bs-theme', 'light'); // Aplica o Light Mode
        }
    });

    // =========================================================
    // 2. TEMPORIZADORES (SETINTERVAL) E MANIPULAÇÃO DE STRING
    // =========================================================
    let tempoEmSegundos = 300; // 5 minutos = 300 segundos
    const elementoContador = document.getElementById('contadorRegressivo');

    // Executa essa função repetidamente a cada 1000 milissegundos (1 segundo)
    const intervaloContador = setInterval(() => {
        if (tempoEmSegundos <= 0) {
            clearInterval(intervaloContador); // Para o relógio
            elementoContador.textContent = "Expirado!";
            elementoContador.parentElement.classList.replace('alert-warning', 'alert-danger');
            return;
        }

        tempoEmSegundos--;

        // Lógica de formatação para MM:SS (Clean Code em vez de múltiplos Ifs)
        const minutos = String(Math.floor(tempoEmSegundos / 60)).padStart(2, '0');
        const segundos = String(tempoEmSegundos % 60).padStart(2, '0');
        
        // Manipula o DOM atualizando apenas o texto do elemento
        elementoContador.textContent = `${minutos}:${segundos}`;
    }, 1000);

    // =========================================================
    // 3. EXECUÇÕES ASSÍNCRONAS (PROMISES E ASYNC/AWAIT)
    // =========================================================
    const formContato = document.getElementById('formContato');
    const btnEnviar = document.getElementById('btnEnviar');
    const spinnerLoading = document.getElementById('spinnerLoading');
    const textoBotao = document.getElementById('textoBotao');
    const elementoToast = document.getElementById('notificacaoToast');
    const toastDeSucesso = new bootstrap.Toast(elementoToast, { delay: 4000 });

    // Função que simula um atraso de rede (Mock API)
    function simularEnvioParaServidor() {
        return new Promise((resolve) => {
            // setTimeout aqui simula a latência de 2 segundos da internet
            setTimeout(() => {
                resolve({ status: 200, mensagem: "OK" });
            }, 2000); 
        });
    }

    // O "async" indica que esta função contém operações que levam tempo (await)
    formContato.addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Impede o reload da página

        // 1. Muda o estado visual da interface (Prepara para aguardar)
        btnEnviar.disabled = true; // Impede duplo clique
        spinnerLoading.classList.remove('d-none'); // Mostra a rodinha girando
        textoBotao.textContent = "Enviando..."; // Muda o texto

        try {
            // 2. O código "pausa" aqui e espera a Promise ser resolvida (A chamada assíncrona)
            const resposta = await simularEnvioParaServidor();
            
            // 3. Sucesso! Mostra notificação e limpa formulário
            if(resposta.status === 200) {
                toastDeSucesso.show();
                formContato.reset();
            }
        } catch (erro) {
            console.error("Erro ao enviar:", erro);
            // Em um sistema real, mostraríamos um Toast de erro aqui
        } finally {
            // 4. Independente de sucesso ou erro, restaura a interface ao normal
            btnEnviar.disabled = false;
            spinnerLoading.classList.add('d-none');
            textoBotao.textContent = "Enviar Pergunta";
        }
    });

});