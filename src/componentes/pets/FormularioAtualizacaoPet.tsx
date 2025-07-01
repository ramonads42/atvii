import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Pet from '../../modelo/pet';

type PetDataComCliente = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    cpfCliente: string;
};

type Props = {
    tema: string;
    seletorView: Function;
    pet: PetDataComCliente;
    atualizarPet: (cpfClienteOriginal: string, nomePetOriginal: string, novoNome: string, novoTipo: string, novaRaca: string, novoGenero: string) => void;
    atualizarDados: Function;
};

type State = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

export default class FormularioAtualizacaoPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.pet ? props.pet.nome : '',
            tipo: props.pet ? props.pet.tipo : '',
            raca: props.pet ? props.pet.raca : '',
            genero: props.pet ? props.pet.genero : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.pet !== this.props.pet && this.props.pet) {
            this.setState({
                nome: this.props.pet.nome,
                tipo: this.props.pet.tipo,
                raca: this.props.pet.raca,
                genero: this.props.pet.genero,
            });
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!this.props.pet) {
            alert("Nenhum pet selecionado para atualização.");
            return;
        }

        const { nome, tipo, raca, genero } = this.state;
        const { pet } = this.props;

        this.props.atualizarPet(pet.cpfCliente, pet.nome, nome, tipo, raca, genero);
        this.props.atualizarDados();

        this.props.seletorView('Pets', event); 
    }

    render() {
        const { tema, seletorView, pet } = this.props;
        const { nome, tipo, raca, genero } = this.state;

        if (!pet) {
            return (
                <div className="container-fluid">
                    <h2>Atualizar Pet</h2>
                    <p className="alert alert-warning">Nenhum pet selecionado para atualização. Por favor, volte para a lista de pets e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Atualizar Pet: {pet.nome}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome do Pet</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipo" className="form-label">Tipo (Ex: Cachorro, Gato)</label>
                        <input type="text" className="form-control" id="tipo" name="tipo" value={tipo} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="raca" className="form-label">Raça</label>
                        <input type="text" className="form-control" id="raca" name="raca" value={raca} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="genero" className="form-label">Gênero</label>
                        <select className="form-select" id="genero" name="genero" value={genero} onChange={this.handleChange} required>
                            <option value="">Selecione...</option>
                            <option value="Macho">Macho</option>
                            <option value="Fêmea">Fêmea</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpfCliente" className="form-label">CPF do Cliente Dono (Não Editável)</label>
                        <input type="text" className="form-control" id="cpfCliente" name="cpfCliente" value={pet.cpfCliente} readOnly disabled />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Cancelar</button>
                </form>
            </div>
        );
    }
}