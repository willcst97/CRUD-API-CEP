// Importando hooks do React e outras bibliotecas necessárias
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Definição do componente funcional DeleteUserModal
function DeleteUserModal() {
  // Definindo estados para armazenar o ID e os dados do usuário
  const [id, setId] = useState("");
  const [user, setUser] = useState(null);

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
        // Se os dados do usuário foram encontrados, atualiza o estado do usuário
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        // Exibe uma mensagem de erro em caso de falha na busca dos dados do usuário
        toast.error("Erro ao buscar dados do usuário");
        setUser(null);
      }
    }
  };

  // Função para lidar com a exclusão do usuário
  const handleDeleteUser = async () => {
    // Verifica se um ID foi digitado
    if (!id) {
      toast.error("ID é obrigatório");
      return;
    }
    try {
      // Faz uma requisição DELETE para excluir o usuário pelo ID
      const res = await axios.delete("http://localhost:3000", { data: { id } });

      // Verifica se a exclusão foi bem-sucedida
      if (res.status === 200) {
        toast.success(`Usuário com ID ${id} removido com sucesso`);
        // Limpa o estado do ID e do usuário
        setId("");
        setUser(null);

        // Recarrega a página após 3 segundos
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error) {
      // Exibe uma mensagem de erro em caso de falha na exclusão do usuário
      console.error("Erro ao deletar usuário", error);
      toast.error("Erro ao deletar usuário");
    }
  };

  // Renderizando o modal de exclusão de usuário
  return (
    <>
      <button type="button" className="btn btn-danger" data-bs-toggle="modal" id="button" data-bs-target="#DeleteUserModal">
        <b>Excluir Usuário</b>
      </button>

      <div className="modal fade" id="DeleteUserModal" tabIndex="-1" aria-labelledby="DeleteUserModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="DeleteUserModal"><b>Digite o ID do Usuário a ser excluído</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="id" className="form-label">ID:</label>
                <input type="text" className="form-control" id="id" placeholder="Ex: 12" value={id} onChange={handleIdChange} />
              </div>
              {user && (
                <div className="user-details">
                  <p><b>Nome:</b> {user.name}</p>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>CEP:</b> {user.cep}</p>
                  <p><b>Logradouro:</b> {user.logradouro}</p>
                  <p><b>Bairro:</b> {user.bairro}</p>
                  <p><b>Cidade:</b> {user.cidade}</p>
                  <p><b>Estado:</b> {user.estado}</p>
                  <p><b>Número:</b> {user.numero}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDeleteUser} data-bs-dismiss="modal">
                <b>Excluir Usuário</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Exportando o componente para ser usado em outros arquivos
export default DeleteUserModal;
