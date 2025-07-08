"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pet {
    constructor(nome, raca, genero, tipo) {
        this.nome = nome;
        this.raca = raca;
        this.genero = genero;
        this.tipo = tipo;
    }
    // Getters
    get getNome() { return this.nome; }
    get getRaca() { return this.raca; }
    get getGenero() { return this.genero; }
    get getTipo() { return this.tipo; }
    // Setters
    setNome(nome) {
        this.nome = nome;
    }
    setRaca(raca) {
        this.raca = raca;
    }
    setGenero(genero) {
        this.genero = genero;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Pet;
