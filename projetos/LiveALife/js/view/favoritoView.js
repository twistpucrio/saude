// js/view/carrinhoView.js

const FavoritoView = (() => {
    const renderizarFavorito = (favorito) => {
        const container = document.getElementById('favorito-container');
        container.innerHTML = '';
        if (favorito.length === 0) {
            container.innerHTML = '<p>Você não tem favoritos.</p>';
            return;
        }

        const tabela = document.createElement('table');
        tabela.innerHTML = `
            <thead>
                <tr>
                    <td>Img</td>
                    <td>Produto</td>
                    <td>Preço</td>
                    <td>Remover</td>
                </tr>
            </thead>
            <tbody>
                ${favorito.map(item => `
                    <tr>
                        <td><img src="${item.imagem}" alt="${item.alt}"></td>
                        <td>${item.nome}</td>
                        <td>R$ ${item.preco}</td>
                        <td>
                            <button data-id="${item.id}" class="remover-button">
                               x
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

       
        container.appendChild(tabela);

        const limparButton = document.createElement('button');
        limparButton.textContent = 'Limpar Favoritos';
        limparButton.id = 'limpar-favorito';
        container.appendChild(limparButton);

        
    };

    return {
        renderizarFavorito
    };
})();