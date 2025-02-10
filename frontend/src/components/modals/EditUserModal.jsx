// importando bibliotecas necessárias para este modal, que editará usuários no banco de dados e será usado como um componente funcional para a tabela
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

// início do componente funcional que edita o usuário no banco de dados
function EditUserModal() {
  // usando variáveis de estado para acessar os campos de entrada
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // função para mudança dinâmica dos valores dos campos de entrada do campo id
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  // função para mudança dinâmica dos valores dos campos de entrada do campo nome
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // função para mudança dinâmica dos valores dos campos de entrada do campo email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // criação de uma função assíncrona que primeiro verifica se todas as entradas estão preenchidas, envia uma solicitação post ao servidor usando axios e depois mostra uma mensagem toast se for bem-sucedida ou não
  const handleEditUser = async () => {
    // verificação de entrada
    if (!id || !name || !email || id === "" || name === "" || email === "") {
      toast.error("Todos os campos são obrigatórios");
      return;
    }
    try {
      // solicitação put ao servidor
      const res = await axios.put(`http://localhost:3000`, {
        id,
        name,
        email
      });

      // em caso de sucesso
      if (res.status === 200) {
        toast.success("Usuário editado || Recarregando para atualizar");
        setId(""); // esvazia os campos após a operação bem-sucedida
        setName(""); // esvazia os campos após a operação bem-sucedida
        setEmail(""); // esvazia os campos após a operação bem-sucedida

        // após 3 segundos, recarrega a página para os usuários visualizarem a edição
        setTimeout(() => {
          location.reload();
        }, 3000);

      }
    } catch (error) {
      // em caso de erro
      console.error("Erro ao editar usuário", error);
      toast.error("Erro ao editar usuário");
    }
  };
// usando componentes pré-construídos do Bootstrap
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#editUserModal"
      >
        <b>Editar Usuário</b>
      </button>

      <div
        className="modal fade"
        id="editUserModal"
        tabIndex="-1"
        aria-labelledby="EditUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditUserModal">
                <b>Digite o ID, Nome e Email</b>
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
                  ID:
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
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Novo Nome:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ex: João Carlos"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Novo Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ex: joao@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleEditUser}
                data-bs-dismiss="modal"
              >
                <b>Editar Usuário</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// exportando a função criada
export default EditUserModal;
