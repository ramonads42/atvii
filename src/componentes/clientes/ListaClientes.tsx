import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from "../../modelo/cliente";

type Props = {
    tema: string;
    seletorView: Function;
    selecionarViewComItem: Function;
    clientes: Cliente[];
    atualizarDados: Function;
};

export default class ListaClientes extends Component<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
    }

    render() {
        const { tema, seletorView, selecionarViewComItem, clientes } = this.props;

        return (
            <div className="container-fluid">
                <h2>Lista de Clientes</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Nome Social</th>
                            <th>CPF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map(cliente => (
                                <tr key={cliente.getCpf.getValor}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nomeSocial}</td>
                                    <td>{cliente.getCpf.getValor}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={(e) => selecionarViewComItem('Atualizar Cliente', cliente, e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={(e) => selecionarViewComItem('Excluir Cliente', cliente, e)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum cliente cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastrar Cliente', e)}
                >
                    Cadastrar Novo Cliente
                </button>
            </div>
        );
    }
}