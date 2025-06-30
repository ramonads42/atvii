import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Pet from '../../modelo/pet'; // Importar o modelo Pet

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
    pet: PetDataComCliente; // O pet a ser excluído será passado via props
    excluirPet: (cpfCliente: string, nomePet: string) => void; // Função de exclusão do service
    atualizarDados: Function; // Para notificar o Roteador sobre a mudança
};

export default class ConfirmacaoExclusaoPet extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleExcluir = this.handleExcluir.bind(this);
    }

    handleExcluir(event: React.MouseEvent) {
        event.preventDefault();
        if (!this.props.pet) {
            alert("Nenhum pet selecionado para exclusão.");
            return;
        }

        const { pet } = this.props;

        // Chamada ao método do EmpresaService
        this.props.excluirPet(pet.cpfCliente, pet.nome);

        // Notificar o Roteador para atualizar os dados globais
        this.props.atualizarDados();

        alert(`Pet "${pet.nome}" do cliente ${pet.cpfCliente} excluído com sucesso!`);
        this.props.seletorView('Pets', event); // Voltar para a lista de pets
    }

    render() {
        const { tema, seletorView, pet } = this.props;

        if (!pet) {
            return (
                <div className="container-fluid">
                    <h2>Excluir Pet</h2>
                    <p className="alert alert-warning">Nenhum pet selecionado para exclusão. Por favor, volte para a lista de pets e selecione um.</p>
                    <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Voltar</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <h2>Confirmar Exclusão de Pet</h2>
                <div className="alert alert-warning" role="alert">
                    Você tem certeza que deseja excluir o pet: <strong>{pet.nome}</strong> (Tipo: {pet.tipo}, Raça: {pet.raca}) do cliente com CPF: {pet.cpfCliente}?
                </div>
                <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={this.handleExcluir}
                >
                    Sim, Excluir
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e) => seletorView('Pets', e)}
                >
                    Cancelar
                </button>
            </div>
        );
    }
}