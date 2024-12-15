const ShopController = ((model, view) => {
    const init = (categoriaSelecionada = 'Romântico') => {
        model.carregarProdutos().then(() => {
            const produtosPorCategoria = model.getProdutosPorCategoria();

            // Filtrar produtos pela categoria passada como parâmetro
            filtrarPorCategoria(categoriaSelecionada, produtosPorCategoria);

            // Se precisar filtrar por avaliação também (definido como 5.0)
            const produtosFiltradosPorAvaliacao = filtrarProdutosPorAvaliacao(model.getTodosProdutos(), 5.0);
            const produtosAgrupadosPorAvaliacao = agruparProdutosPorAvaliacao(produtosFiltradosPorAvaliacao);
            
            // Renderizar produtos filtrados por avaliação no segundo container
            view.renderizarPorAvaliacao(produtosAgrupadosPorAvaliacao, adicionarAoCarrinho, adicionarAoFavorito);
        });
    };

    // Função para adicionar produto ao carrinho
    const adicionarAoCarrinho = (produto) => {
        CarrinhoModel.adicionarItem(produto);
    };

    // Função para adicionar produto aos favoritos
    const adicionarAoFavorito = (produto) => {
        FavoritoModel.adicionarItem(produto);
    };

    // Função para filtrar produtos por categoria
    const filtrarPorCategoria = (categoria, produtosPorCategoria) => {
        if (categoria === 'todos') {
            view.renderizarPorCategoria(produtosPorCategoria, adicionarAoCarrinho, adicionarAoFavorito);
        } else {
            const produtosFiltrados = {};
            if (produtosPorCategoria[categoria]) {
                produtosFiltrados[categoria] = produtosPorCategoria[categoria];
            }
            view.renderizarPorCategoria(produtosFiltrados, adicionarAoCarrinho, adicionarAoFavorito);
        }
    };

    // Função para filtrar produtos apenas por avaliação
    const filtrarProdutosPorAvaliacao = (produtos, avaliacaoFiltro) => {
        return produtos.filter(produto => produto.avaliacao === avaliacaoFiltro);
    };

    // Função para agrupar produtos por avaliação
    const agruparProdutosPorAvaliacao = (produtos) => {
        const produtosAgrupados = {};
        produtos.forEach(produto => {
            const avaliacao = produto.avaliacao.toString();
            if (!produtosAgrupados[avaliacao]) {
                produtosAgrupados[avaliacao] = [];
            }
            produtosAgrupados[avaliacao].push(produto);
        });
        return produtosAgrupados;
    };

    return {
        init
    };
})(ShopModel, ShopView);