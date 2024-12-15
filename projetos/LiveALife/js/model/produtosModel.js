const ProdutosModel = (() => {
    let produtos = [];

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

    const buscarProdutos = (criterios) => {
        return produtos.filter(produto => {
            const matchesNome = criterios.nome ? produto.nome.toLowerCase().includes(criterios.nome.toLowerCase()) : true;
            const matchesCategoria = criterios.categoria ? produto.categorias.includes(criterios.categoria) : true;
            const matchesPrecoMin = !isNaN(criterios.precoMin) ? produto.preco >= criterios.precoMin : true;
            const matchesPrecoMax = !isNaN(criterios.precoMax) ? produto.preco <= criterios.precoMax : true;
            const matchesClassInd = criterios.classInd ? produto.classificacao === criterios.classInd : true;
    
            return matchesNome && matchesCategoria && matchesPrecoMin && matchesPrecoMax && matchesClassInd;
        })
    };

    // Função para ordenar produtos
    const ordenarProdutos = (produtos, criterio) => {
        return produtos.sort((a, b) => {
            if (criterio === 'avaliacao') {
                return b.avaliacao - a.avaliacao; // Ordena por avaliação de forma decrescente
            }
            if (criterio === 'precoAsc') {
                return a.preco - b.preco; // Ordena por preço de forma crescente
            }
            if (criterio === 'precoDesc') {
                return b.preco - a.preco; // Ordena por preço de forma decrescente
            }
            return 0; // Se não houver critério de ordenação, retorna na ordem original
        });
    };

    const getProdutos = () => {
        return produtos;
    };


    return {
        carregarProdutos,
        buscarProdutos,
        ordenarProdutos,
        getProdutos
    };
})();
