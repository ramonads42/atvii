"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class RelatorioProdutosServicos {
    constructor(clientes, produtos, servicos) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    gerarRelatorioGeralMaisConsumidos() {
        console.log("\n=== PRODUTOS E SERVIÇOS MAIS CONSUMIDOS (GERAL) ===");
        const contagem = [];
        this.produtos.forEach(produto => {
            contagem.push({ nome: produto.getNome, tipo: 'Produto', quantidade: 0 });
        });
        this.servicos.forEach(servico => {
            contagem.push({ nome: servico.getNome, tipo: 'Serviço', quantidade: 0 });
        });
        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                const item = contagem.find(c => c.nome === produto.getNome && c.tipo === 'Produto');
                if (item) {
                    item.quantidade++;
                }
            });
            cliente.getServicosConsumidos.forEach(servico => {
                const item = contagem.find(c => c.nome === servico.getNome && c.tipo === 'Serviço');
                if (item) {
                    item.quantidade++;
                }
            });
        });
        const consumidos = contagem.filter(item => item.quantidade > 0);
        const ranking = consumidos.sort((a, b) => b.quantidade - a.quantidade);
        if (ranking.length === 0) {
            console.log("Nenhum consumo registrado.");
            this.entrada.receberTexto("\nPressione Enter para continuar...");
            return;
        }
        console.log("\nTipo     | Nome | Quantidade Total");
        console.log("---------|------|----------------");
        ranking.forEach(item => {
            console.log(`${item.tipo.padEnd(8)} | ${item.nome.padEnd(4)} | ${item.quantidade}`);
        });
        this.entrada.receberTexto("\nPressione Enter para continuar...");
    }
}
exports.default = RelatorioProdutosServicos;
