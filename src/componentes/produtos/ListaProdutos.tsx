/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Produto from "../../modelo/produto"; // Importar o modelo Produto

type Props = {
    tema: string;
    seletorView: Function;
    selecionarViewComItem: Function;
    produtos: Produto[]; // A lista de produtos agora vem via props do Roteador
    atualizarDados: Function; // Função para pedir ao Roteador para atualizar os dados
};

export default class ListaProdutos extends Component<Props> {
    constructor(props: Props | Readonly<Props>) {
        super(props);
        // O estado 'produtos' foi movido para o Roteador, então este componente não precisa mais dele aqui.
        // Ele apenas renderiza o que recebe via props.
    }

    render() {
        const { tema, seletorView, selecionarViewComItem, produtos } = this.props;

        return (
            <div className="container-fluid">
                <h2>Lista de Produtos</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.length > 0 ? (
                            produtos.map((produto, index) => (
                                <tr key={`${produto.getNome}-${index}`}> {/* Usar nome e index para chave única temporária */}
                                    <td>{produto.getNome}</td>
                                    <td>R$ {produto.getValor.toFixed(2)}</td>
                                    <td>{produto.getDescricao}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            // Passa o produto completo para a tela de atualização
                                            onClick={(e) => selecionarViewComItem('Atualizar Produto', produto, e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            // Passa o produto completo para a tela de exclusão
                                            onClick={(e) => selecionarViewComItem('Excluir Produto', produto, e)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum produto cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastrar Produto', e)}
                >
                    Cadastrar Novo Produto
                </button>
            </div>
        );
    }
}