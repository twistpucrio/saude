const CarrinhoView = (() => {
    const renderizarCarrinho = (carrinho) => {
        const container = document.getElementById('carrinho-container');
        container.innerHTML = '';

        const container_total = document.getElementById("total-container");
        container_total.innerHTML = ''; // Limpa o container total para garantir que não tenha nada sobrando

        // Verificação se o carrinho está vazio
        if (carrinho.length === 0) {
            container.innerHTML = '<p>Seu carrinho está vazio.</p>';
            
            // Evita renderizar a seção de 'cart-add' (tabelas e totais) quando o carrinho estiver vazio
            return;
        }

        // Cálculo do total
        const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

        // Criação da tabela do carrinho
        const tabela = document.createElement('table');
        tabela.innerHTML = `
            <thead>
                <tr>
                    <td>Img</td>
                    <td>Produto</td>
                    <td>Preço</td>
                    <td>Quantidade</td>
                    <td>Subtotal</td>
                    <td>Remover</td>
                </tr>
            </thead>
            <tbody>
                ${carrinho.map(item => `
                    <tr>
                        <td><img src="${item.imagem}" alt="${item.alt}"></td>
                        <td>${item.nome}</td>
                        <td>R$ ${item.preco}</td>
                        <td>
                            <input type="number" min="1" value="${item.quantidade}" data-id="${item.id}" class="quantidade-input">
                        </td>
                        <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
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

        // Botão para limpar o carrinho
        const limparButton = document.createElement('button');
        limparButton.textContent = 'Limpar Carrinho';
        limparButton.id = 'limpar-carrinho';
        limparButton.className = "limpar-carrinho"
        container.appendChild(limparButton);

        // Atualizando o total e o botão de checkout
        const addCart = document.createElement('div');
        addCart.innerHTML = `
            <section id="cart-add" class="section-p1">
                <div id="coupon">
                    <h3>Aplicar Cupom de Desconto</h3>
                    <div>
                        <input type="text" placeholder="Enter Your Coupon">
                        <button class="normal">Apply</button>
                    </div>
                </div>

                <div id="subtotal">
                    <h3>Cart Totals</h3>
                    <table>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td><h3>R$ ${total.toFixed(2)}</h3></td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong><h3>R$ ${total.toFixed(2)}</h3></strong></td>
                        </tr>
                    </table>
                    <button class="">Finalizar Compra</button>
                </div>
            </section>
        `;
        container_total.appendChild(addCart);
    };

    return {
        renderizarCarrinho
    };
})();
