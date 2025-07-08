"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const produto_1 = __importDefault(require("../modelo/produto"));
const cadastro_1 = __importDefault(require("./cadastro"));
class CadastroProduto extends cadastro_1.default {
    constructor(produtos) {
        super();
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log("\nCadastro de Produto");
        let nome = this.entrada.receberTexto("Digite o nome do produto: ");
        let valor = this.entrada.receberNumero("Digite o valor do produto: ");
        let descricao = this.entrada.receberTexto("Digite a descrição do produto: ");
        let produto = new produto_1.default(nome, valor, descricao);
        this.produtos.push(produto);
        console.log("\nProduto cadastrado com sucesso!");
    }
}
exports.default = CadastroProduto;
