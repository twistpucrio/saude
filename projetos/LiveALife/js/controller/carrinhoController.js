// js/controller/carrinhoController.js

const CarrinhoController = ((model, view) => {
    const init = () => {
        atualizarView();

        // Delegação de eventos para interações do carrinho
        const container = document.getElementById('carrinho-container');

        container.addEventListener('click', (event) => {
            if (event.target.closest('.remover-button')) {
                const produtoId = parseInt(event.target.getAttribute('data-id'));
                model.removerItem(produtoId);
                atualizarView();
            }

            if (event.target.id === 'limpar-carrinho') {
                model.limparCarrinho();
                atualizarView();
            }
        });

        container.addEventListener('input', (event) => {
            if (event.target.classList.contains('quantidade-input')) {
                const produtoId = parseInt(event.target.getAttribute('data-id'));
                const novaQuantidade = parseInt(event.target.value);
                if (!isNaN(novaQuantidade) && novaQuantidade > 0) {
                    model.atualizarQuantidade(produtoId, novaQuantidade);
                    atualizarView();
                }
            }
        });

    };


    const atualizarView = () => {
        const carrinho = model.getCarrinho();
        view.renderizarCarrinho(carrinho);
    };

    const finalizarCompra = () => {
        const container = document.getElementById('carrinho-container');
        const containerTotal = document.getElementById('total-container');
        const botaoVoltar = document.querySelector('.voltar_pagina'); // Seleciona o botão de voltar

        // Limpa o conteúdo da tela
        container.innerHTML = '';
        containerTotal.innerHTML = '';

        // Esconde o botão "Voltar"
        botaoVoltar.style.display = 'none';
    
        // Adiciona a mensagem de compra finalizada
        container.innerHTML = `
            <div class="mensagem-finalizacao">
                <h2>Compra Finalizada!</h2>
                <p>Obrigado por comprar conosco.</p>
                <button class="btn-voltar-home"><a href="index.html">Voltar para Home</a></button>
            </div>
        `;
    
        // (Opcional) Limpa o carrinho após finalizar a compra
        model.limparCarrinho();
    };
    
    // Adiciona o evento de clique ao botão de finalizar compra
    document.addEventListener('click', (event) => {
        if (event.target.textContent === 'Finalizar Compra') {
            finalizarCompra();
        }
    });

    return {
        init
    };
})(CarrinhoModel, CarrinhoView);