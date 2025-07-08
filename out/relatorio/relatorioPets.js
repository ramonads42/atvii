"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
class RelatorioPorTipoRaca {
    constructor(clientes, produtos, servicos) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new entrada_1.default();
    }
    gerarRelatorioPorTipoRaca() {
        console.log("\n=== PRODUTOS E SERVIÇOS MAIS CONSUMIDOS POR TIPO E RAÇA DE PETS ===");
        const resultados = [];
        this.clientes.forEach(cliente => {
            const pets = cliente.getPets;
            if (pets.length === 0)
                return;
            pets.forEach(pet => {
                const tipoRaca = `${pet.getTipo} - ${pet.getRaca}`;
                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === produto.getNome);
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipoRaca, nome: produto.getNome, tipo: 'Produto', quantidade: 1 });
                    }
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    const nome = servico.getNome;
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === nome);
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipoRaca, nome, tipo: 'Serviço', quantidade: 1 });
                    }
                });
            });
        });
        if (resultados.length === 0) {
            console.log("Nenhum consumo registrado.");
            this.entrada.receberTexto("\nPressione Enter para continuar...");
            return;
        }
        const tiposRacaUnicos = [...new Set(resultados.map(r => r.tipoRaca))];
        tiposRacaUnicos.sort();
        tiposRacaUnicos.forEach(tipoRaca => {
            console.log(`\n--- ${tipoRaca.toUpperCase()} ---`);
            const itensDoGrupo = resultados
                .filter(r => r.tipoRaca === tipoRaca)
                .sort((a, b) => b.quantidade - a.quantidade);
            console.log("Tipo     | Nome | Quantidade");
            console.log("---------|------|----------");
            itensDoGrupo.forEach(item => {
                console.log(`${item.tipo.padEnd(8)} | ${item.nome.padEnd(4)} | ${item.quantidade}`);
            });
        });
        this.entrada.receberTexto("\nPressione Enter para continuar...");
    }
    gerarRelatorioPorTipo() {
        console.log("\n=== PRODUTOS E SERVIÇOS MAIS CONSUMIDOS POR TIPO DE PET ===");
        const resultados = [];
        this.clientes.forEach(cliente => {
            const pets = cliente.getPets;
            if (pets.length === 0)
                return;
            pets.forEach(pet => {
                const tipo = pet.getTipo;
                cliente.getProdutosConsumidos.forEach(produto => {
                    const nome = produto.getNome;
                    let encontrado = resultados.find(r => r.tipo === tipo && r.nome === nome);
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipo, nome, tipoItem: 'Produto', quantidade: 1 });
                    }
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    const nome = servico.getNome;
                    let encontrado = resultados.find(r => r.tipo === tipo && r.nome === nome);
                    if (encontrado) {
                        encontrado.quantidade++;
                    }
                    else {
                        resultados.push({ tipo, nome, tipoItem: 'Serviço', quantidade: 1 });
                    }
                });
            });
        });
        if (resultados.length === 0) {
            console.log("Nenhum consumo registrado.");
            this.entrada.receberTexto("\nPressione Enter para continuar...");
            return;
        }
        const tiposUnicos = [...new Set(resultados.map(r => r.tipo))];
        tiposUnicos.sort();
        tiposUnicos.forEach(tipo => {
            console.log(`\n--- ${tipo.toUpperCase()} ---`);
            const itensDoTipo = resultados
                .filter(r => r.tipo === tipo)
                .sort((a, b) => b.quantidade - a.quantidade);
            console.log("Tipo     | Nome | Quantidade");
            console.log("---------|------|----------");
            itensDoTipo.forEach(item => {
                console.log(`${item.tipoItem.padEnd(8)} | ${item.nome.padEnd(4)} | ${item.quantidade}`);
            });
        });
        this.entrada.receberTexto("\nPressione Enter para continuar...");
    }
}
exports.default = RelatorioPorTipoRaca;
