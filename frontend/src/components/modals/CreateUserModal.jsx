import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function CreateUserModal({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleCepChange = async (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        setLogradouro(res.data.logradouro);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
        setEstado(res.data.uf);
        document.getElementById("numero").focus();
      } catch (error) {
        toast.error("Erro ao buscar endereço");
      }
    }
  };
  const handleLogradouroChange = (event) => setLogradouro(event.target.value);
  const handleBairroChange = (event) => setBairro(event.target.value);
  const handleCidadeChange = (event) => setCidade(event.target.value);
  const handleEstadoChange = (event) => setEstado(event.target.value);
  const handleNumeroChange = (event) => setNumero(event.target.value);

  const handleCreateUser = async () => {
    if (!name || !email || !cep || !logradouro || !bairro || !cidade || !estado || !numero) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/", {
        name, email, cep, logradouro, bairro, cidade, estado, numero
      });

      if (res.status === 201) {
        toast.success("Usuário criado com sucesso");
        addUser(res.data);
        setName("");
        setEmail("");
        setCep("");
        setLogradouro("");
        setBairro("");
        setCidade("");
        setEstado("");
        setNumero("");
      }
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      toast.error("Erro ao criar usuário");
    }
  };

  return (
    <>
      <button type="button" className="btn btn-success" data-bs-toggle="modal" id="button" data-bs-target="#CreateUserModal">
        <b>Criar Usuário</b>
      </button>

      <div className="modal fade" id="CreateUserModal" tabIndex="-1" aria-labelledby="CreateUserModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateUserModalLabel"><b>Digite os Dados do Usuário</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome:</label>
                <input type="text" className="form-control" id="name" placeholder="Ex: João Grilo" value={name} onChange={handleNameChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Ex: jao@gmail.com" value={email} onChange={handleEmailChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="cep" className="form-label">CEP (somente números):</label>
                <input type="text" className="form-control" id="cep" placeholder="Ex: 12345678" value={cep} onChange={handleCepChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="logradouro" className="form-label">Logradouro:</label>
                <input type="text" className="form-control" id="logradouro" placeholder="Ex: Rua das Flores" value={logradouro} onChange={handleLogradouroChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="bairro" className="form-label">Bairro:</label>
                <input type="text" className="form-control" id="bairro" placeholder="Ex: Centro" value={bairro} onChange={handleBairroChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="cidade" className="form-label">Cidade:</label>
                <input type="text" className="form-control" id="cidade" placeholder="Ex: São Paulo" value={cidade} onChange={handleCidadeChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado:</label>
                <input type="text" className="form-control" id="estado" placeholder="Ex: SP" value={estado} onChange={handleEstadoChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="numero" className="form-label">Número:</label>
                <input type="text" className="form-control" id="numero" placeholder="Ex: 123" value={numero} onChange={handleNumeroChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={handleCreateUser} data-bs-dismiss="modal"><b>Criar Usuário</b></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUserModal;
