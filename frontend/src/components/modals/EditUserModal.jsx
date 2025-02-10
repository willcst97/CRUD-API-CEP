// Importando hooks do React e outras bibliotecas necessárias
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

// Definição do componente funcional EditUserModal
function EditUserModal() {
  // Definindo estados para armazenar os valores dos campos do formulário
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");

  // Função para lidar com a mudança do campo ID e buscar os dados do usuário
  const handleIdChange = async (event) => {
    const userId = event.target.value;
    setId(userId);

    // Verifica se um ID foi digitado
    if (userId) {
      try {
        // Faz uma requisição GET para buscar os dados do usuário pelo ID
        const res = await axios.get(`http://localhost:3000/${userId}`);
        const userData = res.data;
        // Se os dados do usuário foram encontrados, atualiza os estados com os valores obtidos
        if (userData) {
          setName(userData.name);
          setEmail(userData.email);
          setCep(userData.cep);
          setLogradouro(userData.logradouro);
          setBairro(userData.bairro);
          setCidade(userData.cidade);
          setEstado(userData.estado);
          setNumero(userData.numero);
        }
      } catch (error) {
        // Exibe uma mensagem de erro em caso de falha na busca dos dados do usuário
        toast.error("Erro ao buscar dados do usuário");
      }
    }
  };

  // Funções para atualizar os estados conforme os valores dos campos do formulário mudam
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  // Função para atualizar o estado do CEP e buscar os dados de endereço automaticamente
  const handleCepChange = async (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    // Verifica se o CEP tem 8 dígitos
    if (newCep.length === 8) {
      try {
        // Faz uma requisição GET para a API ViaCEP para buscar o endereço pelo CEP
        const res = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        // Atualiza os estados com os valores obtidos da API
        setLogradouro(res.data.logradouro);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
        setEstado(res.data.uf);
        // Move o foco para o campo de número
        document.getElementById("numero").focus();
      } catch (error) {
        // Exibe uma mensagem de erro em caso de falha na busca
        toast.error("Erro ao buscar endereço");
      }
    }
  };

  const handleLogradouroChange = (event) => setLogradouro(event.target.value);
  const handleBairroChange = (event) => setBairro(event.target.value);
  const handleCidadeChange = (event) => setCidade(event.target.value);
  const handleEstadoChange = (event) => setEstado(event.target.value);
  const handleNumeroChange = (event) => setNumero(event.target.value);

  // Função para lidar com a edição do usuário
  const handleEditUser = async () => {
    // Verifica se todos os campos são obrigatórios estão preenchidos
    if (!id || !name || !email || !cep || !logradouro || !bairro || !cidade || !estado || !numero) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }
    try {
      // Faz uma requisição PUT para editar os dados do usuário no servidor
      const res = await axios.put(`http://localhost:3000`, {
        id, name, email, cep, logradouro, bairro, cidade, estado, numero
      });

      // Verifica se a requisição foi bem-sucedida
      if (res.status === 200) {
        toast.success("Usuário editado || Recarregando para atualizar");
        // Limpa os campos do formulário
        setId("");
        setName("");
        setEmail("");
        setCep("");
        setLogradouro("");
        setBairro("");
        setCidade("");
        setEstado("");
        setNumero("");

        // Recarrega a página após 3 segundos
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error) {
      // Exibe uma mensagem de erro em caso de falha na edição do usuário
      console.error("Erro ao editar usuário", error);
      toast.error("Erro ao editar usuário");
    }
  };

  // Renderizando o modal de edição de usuário
  return (
    <>
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" id="button" data-bs-target="#editUserModal">
        <b>Editar Usuário</b>
      </button>

      <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="EditUserModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditUserModal"><b>Digite o ID e modifique os dados necessários</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="id" className="form-label">ID:</label>
                <input type="text" className="form-control" id="id" placeholder="Ex: 12" value={id} onChange={handleIdChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Novo Nome:</label>
                <input type="text" className="form-control" id="name" placeholder="Ex: João Grilo" value={name} onChange={handleNameChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Novo Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Ex: jao@gmail.com" value={email} onChange={handleEmailChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="cep" className="form-label">CEP:</label>
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
                <label htmlFor="numero" className="form-label">Número (+ Complemento se houver):</label>
                <input type="text" className="form-control" id="numero" placeholder="Ex: 123" value={numero} onChange={handleNumeroChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" onClick={handleEditUser} data-bs-dismiss="modal"><b>Editar Usuário</b></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Exportando o componente para ser usado em outros arquivos
export default EditUserModal;
