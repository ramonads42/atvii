"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class ExclusaoServico {
    constructor(servicos) {
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    excluir() {
        console.log("\nExclusão de serviço");
        if (this.servicos.length === 0) {
            console.log("\nNão há serviços cadastrados para excluir!");
            return;
        }
        console.log("\nServiços disponíveis:");
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome} (R$ ${servico.getValor})`);
        });
        let indiceServico = this.entrada.receberNumero("\nEscolha o número do serviço que deseja excluir: ") - 1;
        if (indiceServico >= 0 && indiceServico < this.servicos.length) {
            let servico = this.servicos[indiceServico];
            let confirmacao = this.entrada.receberTexto(`\nTem certeza que deseja excluir o serviço "${servico.getNome}"? (S/N): `);
            if (confirmacao.toUpperCase() === "S") {
                this.servicos.splice(indiceServico, 1);
                console.log("\nServiço excluído com sucesso!");
            }
            else {
                console.log("\nOperação cancelada.");
            }
        }
        else {
            console.log("\nNúmero de serviço inválido!");
        }
    }
}
exports.default = ExclusaoServico;
