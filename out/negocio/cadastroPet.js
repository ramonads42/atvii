"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("../io/entrada"));
const pet_1 = __importDefault(require("../modelo/pet"));
const cadastro_1 = __importDefault(require("./cadastro"));
class CadastroPet extends cadastro_1.default {
    constructor(clientes) {
        super();
        this.clientes = clientes;
        this.entrada = new entrada_1.default();
    }
    cadastrar() {
        console.log("\nInício do cadastro de pet");
        let cpf = this.entrada.receberTexto("Digite o CPF do cliente proprietário do pet: ");
        let clienteEncontrado = false;
        for (let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i];
            if (cliente.getCpf.getValor === cpf) {
                clienteEncontrado = true;
                console.log("\nCliente encontrado: " + cliente.nome);
                let nome = this.entrada.receberTexto("Digite o nome do pet: ");
                let tipo = this.entrada.receberTexto("Digite o tipo do pet (ex: cachorro, gato): ");
                let raca = this.entrada.receberTexto("Digite a raça do pet: ");
                let genero = this.entrada.receberTexto("Digite o gênero do pet (M/F): ");
                let pet = new pet_1.default(nome, raca, genero, tipo);
                cliente.getPets.push(pet);
                console.log("\nPet cadastrado com sucesso!");
                break;
            }
        }
        if (!clienteEncontrado) {
            console.log("\nCliente não encontrado!");
        }
    }
}
exports.default = CadastroPet;
