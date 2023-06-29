import React, { useState } from 'react';

function App() {
  const [quantidade, setQuantidade] = useState('');
  const [codigo, setCodigo] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const handleQuantidadeChange = (event) => {
    setQuantidade(event.target.value);
    updateValorTotal(event.target.value, valorUnitario);
  };

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleValorUnitarioChange = (event) => {
    setValorUnitario(event.target.value);
    updateValorTotal(quantidade, event.target.value);
  };

  const handleIncluirClick = (event) => {
    event.preventDefault();
    const produto = {
      quantidade,
      codigo,
      nome: getNomeProduto(codigo),
      valorUnitario,
      valorTotal,
    };
    setProdutos([...produtos, produto]);
    setQuantidade('');
    setCodigo('');
    setValorUnitario('');
    setValorTotal('');
    calcularSubtotal([...produtos, produto]);
  };

  const handleRemoverClick = (index) => {
    const updatedProdutos = [...produtos];
    updatedProdutos.splice(index, 1);
    setProdutos(updatedProdutos);
    calcularSubtotal(updatedProdutos);
  };

  const handleCancelarClick = () => {
    setProdutos([]);
    setSubtotal(0);
  };

  const handleFinalizarClick = () => {
    alert('VENDA FINALIZADA COM SUCESSO');
    setProdutos([]);
    setSubtotal(0);
  };

  const updateValorTotal = (quantidade, valorUnitario) => {
    const total = quantidade * valorUnitario;
    setValorTotal(total.toFixed(2));
  };

  const getNomeProduto = (codigo) => {
    switch (codigo) {
      case '1':
        return 'Banana';
      case '2':
        return 'Macarrão';
      case '3':
        return 'Bergamota';
      case '4':
        return 'Mamão';
      case '5':
        return 'Limão';
      default:
        return '';
    }
  };

  const calcularSubtotal = (produtos) => {
    const subtotal = produtos.reduce((acc, produto) => {
      return acc + parseFloat(produto.valorTotal);
    }, 0);
    setSubtotal(subtotal.toFixed(2));
  };

  return (
    <>
      {/* NAV-BAR CABEÇALHO */}
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="../public/icone.png"
              alt="Logo"
              width="100"
              height="90"
              className="ms-2"
            />
            <span className="ms-5 fs-2 fw-semibold fst-italic text-white">
              Ponto de Vendas (PDV)
            </span>
          </a>
        </div>
      </nav>

      {/* ****** TUDO ******* */}
      <div className="row">
        {/* FORMULARIOS --> col-md-5*/}
        <div className="col-md-5 m-5 border border-2 border-primary-subtle p-5 rounded">
          <form>
            <div className="mb-3 me-5">
              <label htmlFor="codProduto" className="form-label fw-bold">
                Código do Produto:
              </label>
              <input
                type="number"
                className="form-control"
                id="codigo"
                value={codigo}
                onChange={handleCodigoChange}
              />
              <div id="codigo" className="form-text">
                Ex: 1, 2, 3, 4, 5
              </div>
            </div>
            <div className="row row-cols-lg-auto g-3 align-items-center">
              <div className="mb-3 me-2">
                <label htmlFor="quantidade" className="form-label fw-bold">
                  Quantidade:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quant"
                  value={quantidade}
                  onChange={handleQuantidadeChange}
                />
              </div>
              <div className="mb-3 me-2">
                <label htmlFor="valorUn" className="form-label fw-bold">
                  Valor unitário:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="valorUn"
                  value={valorUnitario}
                  onChange={handleValorUnitarioChange}
                />
              </div>
              <div className="mb-3 me-2">
                <label htmlFor="valorTot" className="form-label fw-bold">
                  Valor total:
                </label>
                <input
                  className="form-control"
                  id="valorTot"
                  value={valorTotal}
                  disabled
                />
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button
                type="submit"
                className="btn btn-primary btn-lg ps-5 pe-5"
                onClick={handleIncluirClick}
              >
                Incluir
              </button>
            </div>
          </form>
        </div>

        {/* LISTA E BOTOES --> col-md-6 + 2x row*/}
        <div className="col-md-6 mt-5">
          {/* TABELA*/}
          <div className="row">
            <div className="border border-2 border-primary-subtle rounded py-4">
              <table className="table p-2">
                <thead>
                  <tr>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Código</th>
                    <th scope="col">Produto</th>
                    <th scope="col">Valor Unitário</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto, index) => (
                    <tr key={index}>
                      <td>{produto.quantidade}</td>
                      <td>{produto.codigo}</td>
                      <td>{produto.nome}</td>
                      <td>{produto.valorUnitario}</td>
                      <td>{produto.valorTotal}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoverClick(index)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-2 border-primary-subtle rounded mb-5 mt-3 pt-2 ps-2">
            <p className="fs-2 p-1 fw-light">
              Subtotal: <span>R$ {subtotal}</span>
            </p>
          </div>

          {/* BOTOES */}
          <div className="row">
            <div className="col-sm-12 offset-md-6">
              <button
                className="btn btn-danger btn-lg px-5"
                type="button"
                onClick={handleCancelarClick}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success btn-lg ms-4 px-5"
                type="button"
                onClick={handleFinalizarClick}
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
