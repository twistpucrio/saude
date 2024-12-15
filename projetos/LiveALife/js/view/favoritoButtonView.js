const FavoritoButtonView = (() => {
    const renderizarBotaoFavorito = (numeroDeItens) => {
        const botaoFavorito = document.querySelectorAll('.botao-favorito');


        // Verifica se há elementos encontrados
        if (botaoFavorito.length > 0) {
            // Itera sobre todos os elementos e atualiza o conteúdo
            botaoFavorito.forEach((botaoFavorito) => {
                botaoFavorito.innerHTML = `
                    <button id="ver-favorito">
                        <img src="img/icones/favorito.svg">
                        <div class="text_favorito">${numeroDeItens}</div> <!-- Mostra o número de itens -->
                    </button>
                `;
            });
        }
    };


    return {
        renderizarBotaoFavorito,
    };
})();

