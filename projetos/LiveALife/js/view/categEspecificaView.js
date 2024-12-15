const ShopView = (() => {
    const renderizarPorCategoria = (produtosPorCategoria, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback) => {
        const container = document.getElementById('prodEspecifico-container-2');
        renderizarEmContainer(container, produtosPorCategoria, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback);
    };

    const renderizarPorCategoria2 = (produtosPorCategoria, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback) => {
        const container = document.getElementById('prodEspecifico-container-3');
        renderizarEmContainer(container, produtosPorCategoria, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback);
    };

    const renderizarPorAvaliacao = (produtosPorAvaliacao, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback) => {
        const container = document.getElementById('prodEspecifico-container');
        renderizarEmContainer(container, produtosPorAvaliacao, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback);
    };

    const renderizarEmContainer = (container, produtosPorCategoriaOuAvaliacao, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback) => {
        if (!container) return;
        container.innerHTML = '';  // Limpa o container

        Object.keys(produtosPorCategoriaOuAvaliacao).forEach(key => {
            const categoriaOuAvaliacaoDiv = document.createElement('div');
            categoriaOuAvaliacaoDiv.classList.add('categoria');

            const produtos = produtosPorCategoriaOuAvaliacao[key];

            produtos.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');
                produtoDiv.innerHTML = `
                    <div id="produtoExibido-${produto.id}" tabindex="0" aria-labelledby="nome-${produto.id} preco-${produto.id} descricao-${produto.id}">
                        <img class="img_pro" src="${produto.imagem}" alt="${produto.alt}">
                        <div class="des">
                            <span id="categorias-${produto.id}">${produto.categorias.join(', ')}</span>
                            <h5 id="nome-${produto.id}">${produto.nome}</h5>
                            <p class="estrelaAvaliacao">&#9733;</p>
                            <h3 id="avaliacao-${produto.id}">${produto.avaliacao}</h3>
                            <h4 id="preco-${produto.id}">R$ ${produto.preco}</h4>
                        </div>
                        <button data-id="${produto.id}" class="adicionar-carrinho-button"><img src="img/icones/sacola_compra.png" alt=""></button>
                        <button data-id="${produto.id}" class="adicionar-favorito-button"><img src="img/icones/favorito.svg" alt=""></button>
                    </div>
                `;

                // Adiciona o evento de clique na imagem para salvar o produto no localStorage e redirecionar
                const imagemProduto = produtoDiv.querySelector('.img_pro');
                imagemProduto.addEventListener('click', () => {
                    if (produto.id && produto.nome && produto.preco && produto.imagem && produto.descricao) {
                        // Salva as informações do produto no localStorage
                        const produtoInfo = {
                            id: produto.id,
                            nome: produto.nome,
                            preco: produto.preco,
                            imagem: produto.imagem,
                            alt: produto.alt,
                            descricao: produto.descricao,
                            categorias: produto.categorias
                        };

                        localStorage.setItem('produtoSelecionado', JSON.stringify(produtoInfo));
                    }
                    window.location.href = 'desc_prod.html';        
                });

                categoriaOuAvaliacaoDiv.appendChild(produtoDiv); // Adiciona cada produto à categoria ou avaliação
            });

            container.appendChild(categoriaOuAvaliacaoDiv); // Adiciona a categoria ou avaliação ao container
        });

        // Eventos de clique para adicionar ao carrinho e favoritos
        const botoesAdicionarCarrinho = container.querySelectorAll('.adicionar-carrinho-button');
        botoesAdicionarCarrinho.forEach(botao => {
            botao.addEventListener('click', (event) => {
                const produtoId = parseInt(event.currentTarget.getAttribute('data-id'));
                Object.keys(produtosPorCategoriaOuAvaliacao).forEach(key => {
                    const produtoBusca = produtosPorCategoriaOuAvaliacao[key].find(p => p.id === produtoId);
                    if (produtoBusca) {
                        adicionarAoCarrinhoCallback(produtoBusca);
                    }
                });
            });
        });

        const botoesAdicionarFavorito = container.querySelectorAll('.adicionar-favorito-button');
        botoesAdicionarFavorito.forEach(botao => {
            botao.addEventListener('click', (event) => {
                const produtoId = parseInt(event.currentTarget.getAttribute('data-id'));
                Object.keys(produtosPorCategoriaOuAvaliacao).forEach(key => {
                    const produtoBusca = produtosPorCategoriaOuAvaliacao[key].find(p => p.id === produtoId);
                    if (produtoBusca) {
                        adicionarAoFavoritoCallback(produtoBusca);
                    }
                });
            });
        });
    };

    return {
        renderizarPorCategoria,
        renderizarPorAvaliacao,
        renderizarPorCategoria2
    };
})();
