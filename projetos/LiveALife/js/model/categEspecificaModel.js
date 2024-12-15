const ShopModel = (() => {
    let produtos = [];

    // Carrega os produtos a partir de um arquivo JSON
    const carregarProdutos = () => {
        return fetch('produtos.json')
            .then(response => response.json())
            .then(data => {
                produtos = data;
                return produtos;
            })
            .catch(error => {
                console.error("Erro ao carregar produtos:", error);
            });
    };

    // Retorna os produtos agrupados por categoria
    const getProdutosPorCategoria = () => {
        const categorias = {};
        produtos.forEach(produto => {
            produto.categorias.forEach(categoria => {
                if (!categorias[categoria]) {
                    categorias[categoria] = [];
                }
                categorias[categoria].push(produto);
            });
        });
        return categorias;
    };

    // Retorna todos os produtos
    const getTodosProdutos = () => {
        return produtos;
    };

    return {
        carregarProdutos,
        getProdutosPorCategoria,
        getTodosProdutos
    };
})();
