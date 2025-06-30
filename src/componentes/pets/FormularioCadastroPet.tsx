import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';

type Props = {
    tema: string;
    seletorView: Function;
    cadastrarPet: (cpfCliente: string, nome: string, tipo: string, raca: string, genero: string) => void;
    clientes: Cliente[];
    atualizarDados: Function;
};

type State = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    cpfCliente: string;
};

export default class FormularioCadastroPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: '',
            tipo: '',
            raca: '',
            genero: '',
            cpfCliente: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const { nome, tipo, raca, genero, cpfCliente } = this.state;

        if (!nome || !tipo || !raca || !genero || !cpfCliente) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const clienteExiste = this.props.clientes.some(c => c.getCpf.getValor === cpfCliente);
        if (!clienteExiste) {
            alert(`Cliente com CPF ${cpfCliente} não encontrado. Cadastre o cliente primeiro.`);
            return;
        }

        this.props.cadastrarPet(cpfCliente, nome, tipo, raca, genero);
        this.props.atualizarDados();

        // REMOVIDO: alert(`Pet "${nome}" cadastrado com sucesso para o cliente ${cpfCliente}!`);
        this.props.seletorView('Pets', event); // Voltar para a lista de pets
    }

    render() {
        const { tema, seletorView, clientes } = this.props;
        const { nome, tipo, raca, genero, cpfCliente } = this.state;

        return (
            <div className="container-fluid">
                <h2>Cadastro de Pet</h2>
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
                        <label htmlFor="cpfCliente" className="form-label">CPF do Cliente Dono</label>
                        <select
                            className="form-select"
                            id="cpfCliente"
                            name="cpfCliente"
                            value={cpfCliente}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Selecione o dono...</option>
                            {clientes.map(cliente => (
                                <option key={cliente.getCpf.getValor} value={cliente.getCpf.getValor}>
                                    {cliente.nome} ({cliente.getCpf.getValor})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success me-2">Cadastrar</button>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Voltar</button>
                </form>
            </div>
        );
    }
}