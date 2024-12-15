const ProdutosView = (() => {
    const renderizarProdutos = (produtos, adicionarAoCarrinhoCallback, adicionarAoFavoritoCallback) => {
        const container = document.querySelectorAll('.pro-container');

        // Verifica se há elementos encontrados
        if (container.length > 0) {
            // Itera sobre todos os elementos e atualiza o conteúdo
            container.forEach((container) => {
                // Limpa o conteúdo atual do container
                container.innerHTML = ''; 

                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.classList.add('pro');

                    // Define o HTML do produto
                    produtoDiv.innerHTML = `
                        <div id="produtoExibido-${produto.id}" tabindex="0" aria-labelledby="nome-${produto.id} preco-${produto.id} descricao-${produto.id}">
                            <img class="img_pro" src="${produto.imagem}" alt="${produto.alt}">
                            <div class="des">
                                <span id="categorias-${produto.id}">${produto.categorias}</span>
                                <h5 id="nome-${produto.id}">${produto.nome}</h5>
                                <p class="estrelaAvaliacao">&#9733;</p>
                                <h3 id="avalicao-${produto.id}">${produto.avaliacao}</h3>
                                <h4 id="preco-${produto.id}">R$ ${produto.preco}</h4>
                            </div>
                            <button data-id="${produto.id}" class="adicionar-carrinho-button"><img src="img/icones/sacola_compra.png" alt=""></button>
                            <button data-id="${produto.id}" class="adicionar-favorito-button"><img src="img/icones/favorito.svg" alt=""></button>
                        </div>
                    `;

                    // Selecionar a imagem com a classe "img_pro"
                    const imagemProduto = produtoDiv.querySelector('.img_pro');

                    // Adiciona o evento de clique na imagem
                    imagemProduto.addEventListener('click', () => {
                        if (produto.id && produto.nome && produto.preco && produto.imagem && produto.descricao) {
                            // Salva as informações do produto no localStorage
                            const produtoInfo = {
                                id: produto.id,
                                nome: produto.nome,
                                preco: produto.preco,
                                imagem: produto.imagem,
                                alt: produto.alt,
                                descricao: produto.descricao, // Certifique-se que a descrição está presente
                                categorias: produto.categorias
                            };

                            // Armazenar no localStorage como uma string JSON
                            localStorage.setItem('produtoSelecionado', JSON.stringify(produtoInfo));
                        }
                        window.location.href = 'desc_prod.html';        
                    });

                    // Adiciona o produto ao container
                    container.appendChild(produtoDiv);

                    // Adicionar eventos de clique para os botões de cada produto
                    const botaoCarrinho = produtoDiv.querySelector('.adicionar-carrinho-button');
                    const botaoFavorito = produtoDiv.querySelector('.adicionar-favorito-button');

                    botaoCarrinho.addEventListener('click', () => {
                        adicionarAoCarrinhoCallback(produto);
                    });

                    botaoFavorito.addEventListener('click', () => {
                        adicionarAoFavoritoCallback(produto);
                    });
                });
            });
        }
    
        
    
    };

    return {
        renderizarProdutos
    };
})();
