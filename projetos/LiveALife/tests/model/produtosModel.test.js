// tests/model/produtosModel.test.js

import ProdutosModel from '../../js/model/produtosModel.js';

describe('ProdutosModel', () => {
  describe('buscarProdutos', () => {
    it('should return all products when no criteria are provided', () => {
      const produtos = ProdutosModel.buscarProdutos({});
      expect(produtos.length).toBe(3); // Assuming there are 3 products
    });

    it('should filter products by name', () => {
      const produtos = ProdutosModel.buscarProdutos({ nome: 'Produto A' });
      expect(produtos).toEqual([
        { id: 1, nome: 'Produto A', preco: 100 },
      ]);
    });

    it('should filter products by price range', () => {
      const produtos = ProdutosModel.buscarProdutos({ precoMin: 100, precoMax: 150 });
      expect(produtos).toEqual([
        { id: 1, nome: 'Produto A', preco: 100 },
        { id: 2, nome: 'Produto B', preco: 150 },
      ]);
    });

    it('should filter products by name and price range', () => {
      const produtos = ProdutosModel.buscarProdutos({ nome: 'Produto C', precoMin: 150 });
      expect(produtos).toEqual([
        { id: 3, nome: 'Produto C', preco: 200 },
      ]);
    });
  });
});
