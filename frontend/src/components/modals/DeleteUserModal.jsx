// importando bibliotecas necessárias para este modal, que excluirá usuários do banco de dados e será usado como um componente funcional para a tabela
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// início do componente funcional que excluirá usuários
function DeleteUserModal() {
  // usando variáveis de estado para acessar os campos de entrada
  const [id, setId] = useState("");

  // função para mudança dinâmica dos valores dos campos de entrada do campo id
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  // criação de uma função assíncrona que primeiro verifica se a entrada está preenchida, envia uma solicitação delete ao servidor usando axios e depois mostra uma mensagem toast se for bem-sucedida ou não
  const handleDeleteUser = async () => {
    // verificação de entrada
    if (!id || id === "") {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }
    try {
      // solicitação delete ao servidor com carga útil de dados
      const res = await axios.request({
        method: "delete",
        url: "http://localhost:3000",
        data: { id }
      });

      // em caso de sucesso
      if (res.status === 200) {
        console.log("Usuário excluído");
        toast.success(`Id ${id} excluído com sucesso || Recarregando para atualizar`);
      }

      setId(""); // esvazia os campos após a operação bem-sucedida

      // após 3 segundos, recarrega a página para os usuários visualizarem a exclusão
      setTimeout(() => {
        location.reload();
      }, 3000);

    } catch (error) {
      // em caso de erro
      console.error("Erro ao excluir usuário", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  // usando componentes pré-construídos do Bootstrap
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#DeleteUserModal"
      >
        <b>Excluir Usuário</b>
      </button>

      <div
        className="modal fade"
        id="DeleteUserModal"
        tabIndex="-1"
        aria-labelledby="DeleteUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="DeleteUserModal">
                <b>Digite o ID</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  Id:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Ex: 1"
                  value={id}
                  onChange={handleIdChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteUser}
                data-bs-dismiss="modal"
              >
                <b>Excluir Usuário</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// exportando a função criada
export default DeleteUserModal;
