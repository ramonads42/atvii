import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type props = {
    tema: string,
    seletorView: Function
}

type state = {
    botoes: string[]
}

export default class BarraNavegacao extends Component<props, state>{
    constructor(props: props | Readonly<props>) {
        super(props);
        this.state = {
            botoes: ['Clientes', 'Pets', 'Produtos', 'Serviços', 'Consumo', 'Relatórios']
        };
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this);
    }

    gerarListaBotoes() {
        return this.state.botoes.map(valor => (
            <li key={valor} className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a>
            </li>
        ));
    }

    render() {
        let tema = this.props.tema;
        return (
            <>
                <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, marginBottom: 10 }}>
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">PetLovers</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}