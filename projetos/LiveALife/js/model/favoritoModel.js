const FavoritoModel = (() => {
    let favorito = JSON.parse(localStorage.getItem('favorito')) || [];

    const salvarFavorito = () => {
        localStorage.setItem('favorito', JSON.stringify(favorito));
        const event = new Event('favoritoAtualizado');
        document.dispatchEvent(event);
    };

    const getFavorito = () => favorito;

    const adicionarItem = (produto) => {
        const itemExistente = favorito.find(item => item.id === produto.id);
        if (!itemExistente) {
            favorito.push({ ...produto, quantidade: 1 });
        }
        salvarFavorito();
    };

    const removerItem = (produtoId) => {
        favorito = favorito.filter(item => item.id !== produtoId);
        salvarFavorito();
    };

    const atualizarQuantidade = (produtoId, quantidade) => {
        const item = favorito.find(item => item.id === produtoId);
        if (item) {
            item.quantidade = quantidade;
            if (item.quantidade <= 0) {
                removerItem(produtoId);
            } else {
                salvarFavorito();
            }
        }
    };

    const getTotalItens = () => {
        return favorito.length; // Conta o número de itens únicos, não a quantidade
    };

    const limparFavorito = () => {
        favorito = [];
        salvarFavorito();
    };

    return {
        getFavorito,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparFavorito,
        getTotalItens
    };
})();
