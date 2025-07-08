"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listagem_1 = __importDefault(require("./listagem"));
class ListagemServico extends listagem_1.default {
    constructor(servicos) {
        super();
        this.servicos = servicos;
    }
    listar() {
        console.log("\nLista de serviços:");
        if (this.servicos.length === 0) {
            console.log("Nenhum serviço cadastrado.");
            return;
        }
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome}`);
            console.log(`   Valor: R$ ${servico.getValor}`);
            console.log(`   Descrição: ${servico.getDescricao}`);
            console.log("--------------------------------------");
        });
    }
}
exports.default = ListagemServico;
