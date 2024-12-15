const FavoritoButtonController = ((model, view) => {
    const init = () => {
        atualizarView();


        // Adicionar evento de clique para ir à página do carrinho
        document.addEventListener('click', (event) => {
           


            if (event.target && event.target.id === 'ver-favorito') {
                // window.location.href = 'favorito.html';
                const favoritoContainer = document.getElementById('favorito-container');
                favoritoContainer.style.display = favoritoContainer.style.display === 'none' ? 'block' : 'none';
            }


        });


        // Escutar mudanças no carrinho para atualizar o número de itens
        document.addEventListener('favoritoAtualizado', atualizarView);
    };


    const atualizarView = () => {
        const totalItens = model.getTotalItens();
        view.renderizarBotaoFavorito(totalItens); // Passa o número total de itens para o view
    };


    return {
        init,
    };
})(FavoritoModel, FavoritoButtonView);

