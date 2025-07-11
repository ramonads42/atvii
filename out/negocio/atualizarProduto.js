"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class AtualizacaoProduto {
    constructor(produtos) {
        this.produtos = produtos;
        this.entrada = new entrada_1.default();
    }
    atualizar() {
        console.log("\nAtualização de produto");
        if (this.produtos.length === 0) {
            console.log("\nNão há produtos cadastrados para atualizar!");
            return;
        }
        console.log("\nProdutos disponíveis:");
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1} - ${produto.getNome} (R$ ${produto.getValor})`);
        });
        let indiceProduto = this.entrada.receberNumero("\nEscolha o número do produto que deseja atualizar: ") - 1;
        if (indiceProduto >= 0 && indiceProduto < this.produtos.length) {
            let produto = this.produtos[indiceProduto];
            console.log(`\nAtualizando o produto: ${produto.getNome}`);
            console.log(`Valor atual: R$ ${produto.getValor}`);
            console.log(`Descrição atual: ${produto.getDescricao}`);
            let novoNome = this.entrada.receberTexto("\nDigite o novo nome (deixe em branco para manter o atual): ");
            if (novoNome.length > 0) {
                produto.setNome(novoNome);
            }
            let novoValorTexto = this.entrada.receberTexto("Digite o novo valor (deixe em branco para manter o atual): ");
            if (novoValorTexto.length > 0) {
                let novoValor = parseFloat(novoValorTexto);
                if (!isNaN(novoValor) && novoValor >= 0) {
                    produto.setValor(novoValor);
                }
                else {
                    console.log("\nValor inválido! O valor não foi atualizado.");
                }
            }
            let novaDescricao = this.entrada.receberTexto("Digite a nova descrição (deixe em branco para manter a atual): ");
            if (novaDescricao.length > 0) {
                produto.setDescricao(novaDescricao);
            }
            console.log("\nProduto atualizado com sucesso!");
        }
        else {
            console.log("\nNúmero de produto inválido!");
        }
    }
}
exports.default = AtualizacaoProduto;
