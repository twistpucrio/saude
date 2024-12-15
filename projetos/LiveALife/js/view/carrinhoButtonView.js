const CarrinhoButtonView = (() => {
    const renderizarBotaoCarrinho = (numeroDeItens) => {
        // Seleciona todos os elementos com a classe "botao-carrinho"
        const botoesCarrinho = document.querySelectorAll('.botao-carrinho');


        // Verifica se há elementos encontrados
        if (botoesCarrinho.length > 0) {
            // Itera sobre todos os elementos e atualiza o conteúdo
            botoesCarrinho.forEach((botaoCarrinho) => {
                botaoCarrinho.innerHTML = `
                    <button id="ver-carrinho">
                        <img  src="img/icones/sacola_compra.png">
                        <div class="text_carrinho">${numeroDeItens}</div>
                    </button>
                `;
            });
        }
    };


    return {
        renderizarBotaoCarrinho,
    };
})();

