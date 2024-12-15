const ProdutosController = ((model, view, carrinhoController, favoritoController) => {
    let produtosFiltrados = []; // Variável para armazenar produtos filtrados

    const getURLParameter = (name) => {
        return new URLSearchParams(window.location.search).get(name);
    };

    const init = () => {
        model.carregarProdutos().then(() => {
            const produtos = model.getProdutos();
            const categoriaURL = getURLParameter('categoria');
            const categoriaSelectElement = document.getElementById('categoriaSelect');

            if (categoriaURL && categoriaSelectElement) {
                categoriaSelectElement.value = categoriaURL; 
                const criterios = { categoria: categoriaURL };
                produtosFiltrados = model.buscarProdutos(criterios);
                view.renderizarProdutos(produtosFiltrados, adicionarAoCarrinho, adicionarAoFavorito);
            } else {
                produtosFiltrados = produtos; // Armazena todos os produtos na lista filtrada
                view.renderizarProdutos(produtos, adicionarAoCarrinho, adicionarAoFavorito);
            }

            configurarBusca(); 
            configurarOrdenacao(); 
        });
    };

    const adicionarAoCarrinho = (produto) => {
        CarrinhoModel.adicionarItem(produto);        
    };

    const adicionarAoFavorito = (produto) => {
        FavoritoModel.adicionarItem(produto);        
    };

    const configurarBusca = () => {
        const botaoBuscar = document.getElementById('botao-buscar');

        if (!botaoBuscar) {
            console.error('Botão de busca não encontrado!'); 
            return;
        }
       
        botaoBuscar.addEventListener('click', () => {
            const criterios = coletarCriterios();
            
            if (criterios.precoMax < criterios.precoMin) {
                alert("Erro: O preço máximo não pode ser menor que o preço mínimo.");
                document.getElementById('busca-preco-min').value = '';
                document.getElementById('busca-preco-max').value = '';
                return;
            }

            // Aplica a filtragem e a busca
            produtosFiltrados = model.buscarProdutos(criterios);
            view.renderizarProdutos(produtosFiltrados, adicionarAoCarrinho, adicionarAoFavorito);
        });
    };

    const configurarOrdenacao = () => {
        const botaoOrdenar = document.getElementById('botao-ordenar');

        if (!botaoOrdenar) {
            console.error('Botão de ordenação não encontrado!'); 
            return;
        }

        botaoOrdenar.addEventListener('click', () => {
            const criterios = coletarCriterios();
            
            // Realiza a ordenação diretamente em produtosFiltrados
            if (produtosFiltrados.length === 0) {
                alert("Por favor, busque produtos primeiro antes de ordenar.");
                return;
            }

            const produtosOrdenados = model.ordenarProdutos(produtosFiltrados, criterios.ordenacao);
            view.renderizarProdutos(produtosOrdenados, adicionarAoCarrinho, adicionarAoFavorito);
        });
    };

    const coletarCriterios = () => {
        const nome = document.getElementById('busca-nome').value.trim();
        let precoMin = parseFloat(document.getElementById('busca-preco-min').value);
        let precoMax = parseFloat(document.getElementById('busca-preco-max').value);
        const classInd = document.getElementById('indicativa').value;
        const categoriaSelecionada = document.getElementById('categoriaSelect').value;
        const ordenacaoSelecionada = document.getElementById('ordenacao').value; 
    
        const criterios = {};
        
        if (nome) criterios.nome = nome;
        if (categoriaSelecionada && categoriaSelecionada !== 'todos') criterios.categoria = categoriaSelecionada;
        if (!isNaN(precoMin)) criterios.precoMin = precoMin;
        if (!isNaN(precoMax)) criterios.precoMax = precoMax;
        if (classInd && classInd !== 'Todas') criterios.classInd = classInd; // Verifica se não é "todos"
        if (ordenacaoSelecionada) criterios.ordenacao = ordenacaoSelecionada; 
    
        return criterios;
    };

    return {
        init
    };
})(ProdutosModel, ProdutosView, CarrinhoModel, FavoritoModel);
