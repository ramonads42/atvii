import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pet from "../../modelo/pet"; 

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
    selecionarViewComItem: Function;
    pets: PetDataComCliente[]; 
    atualizarDados: Function; 
};

export default class ListaPets extends Component<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);

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
                                <tr key={`${pet.cpfCliente}-${pet.nome}-${index}`}> 
                                    <td>{pet.nome}</td>
                                    <td>{pet.tipo}</td>
                                    <td>{pet.raca}</td>
                                    <td>{pet.genero}</td>
                                    <td>{pet.cpfCliente}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={(e) => selecionarViewComItem('Atualizar Pet', pet, e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
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