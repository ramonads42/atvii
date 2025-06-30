/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pet from "../../modelo/pet"; // Importar o modelo Pet

type PetDataComCliente = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    cpfCliente: string; // Adicionado para identificar o dono do pet
};

type Props = {
    tema: string;
    seletorView: Function;
    selecionarViewComItem: Function;
    pets: PetDataComCliente[]; // A lista de pets agora vem via props do Roteador
    atualizarDados: Function; // Função para pedir ao Roteador para atualizar os dados
};

export default class ListaPets extends Component<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
        // O estado 'pets' foi movido para o Roteador, então este componente não precisa mais dele aqui.
        // Ele apenas renderiza o que recebe via props.
    }

    render() {
        const { tema, seletorView, selecionarViewComItem, pets } = this.props;

        return (
            <div className="container-fluid">
                <h2>Lista de Pets</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Raça</th>
                            <th>Gênero</th>
                            <th>CPF do Dono</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.length > 0 ? (
                            pets.map((pet, index) => (
                                <tr key={`${pet.cpfCliente}-${pet.nome}-${index}`}> {/* Chave única mais robusta */}
                                    <td>{pet.nome}</td>
                                    <td>{pet.tipo}</td>
                                    <td>{pet.raca}</td>
                                    <td>{pet.genero}</td>
                                    <td>{pet.cpfCliente}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            // Passa o pet completo para a tela de atualização
                                            onClick={(e) => selecionarViewComItem('Atualizar Pet', pet, e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            // Passa o pet completo para a tela de exclusão
                                            onClick={(e) => selecionarViewComItem('Excluir Pet', pet, e)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>Nenhum pet cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastrar Pet', e)}
                >
                    Cadastrar Novo Pet
                </button>
            </div>
        );
    }
}