"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("./listagem"));
class ListagemProdutos extends listagem_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
    }
    listar() {
        console.log("\nLista de Produtos:");
        if (this.produtos.length === 0) {
            console.log("\nNenhum produto cadastrado!");
            return;
        }
        for (let i = 0; i < this.produtos.length; i++) {
            let produto = this.produtos[i];
            console.log(`Nome: ${produto.getNome}`);
            console.log(`Valor: R$ ${produto.getValor}`);
            console.log(`Descrição: ${produto.getDescricao}`);
            console.log("--------------------------------------");
        }
    }
}
exports.default = ListagemProdutos;
