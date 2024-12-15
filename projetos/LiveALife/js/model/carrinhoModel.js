// js/model/carrinhoModel.js

const CarrinhoModel = (() => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const salvarCarrinho = () => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        const event = new Event('carrinhoAtualizado');
        document.dispatchEvent(event);
    };

    const getCarrinho = () => carrinho;

    const adicionarItem = (produto, quantidade = 1) => {
        console.log('Adicionando produto:', produto);
        const itemExistente = carrinho.find(item => item.id === produto.id);
    
        if (itemExistente) {
            itemExistente.quantidade += quantidade;  // Atualiza a quantidade com o valor passado
        } else {
            carrinho.push({ ...produto, quantidade });  // Adiciona o produto com a quantidade especificada
        }
        salvarCarrinho();
    };
    

    const removerItem = (produtoId) => {
        carrinho = carrinho.filter(item => item.id !== produtoId);
        console.log(carrinho); // Verifique o novo estado do carrinho
        salvarCarrinho();
    };

    const atualizarQuantidade = (produtoId, quantidade) => {
        const item = carrinho.find(item => item.id === produtoId);
        if (item) {
            item.quantidade = quantidade;
            if (item.quantidade <= 0) {
                removerItem(produtoId);
            } else {
                salvarCarrinho();
            }
        }
    };

    const getTotalItens = () => {
        return carrinho.reduce((total, item) => total + item.quantidade, 0);
    };

    const limparCarrinho = () => {
        carrinho = [];
        salvarCarrinho();
    };

    return {
        getCarrinho,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        getTotalItens
    };
})();