"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Produto {
    constructor(nome, valor, descricao) {
        this.nome = nome;
        this.valor = valor;
        this.descricao = descricao;
    }
    get getNome() {
        return this.nome;
    }
    get getValor() {
        return this.valor;
    }
    get getDescricao() {
        return this.descricao;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setValor(valor) {
        this.valor = valor;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
}
exports.default = Produto;
