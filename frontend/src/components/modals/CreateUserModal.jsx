// importando bibliotecas necessárias para este modal, que adicionará usuários ao banco de dados e será usado como um componente funcional para a tabela
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

// início do componente funcional que recebe um argumento para adicionar o usuário ao array de usuários para exibição dinâmica sem recarregar
function CreateUserModal({ addUser }) {
  // usando variáveis de estado para acesso aos campos de entrada
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // função para mudança dinâmica dos valores dos campos de entrada do campo nome
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // função para mudança dinâmica dos valores dos campos de entrada do campo email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // criação de uma função assíncrona que primeiro verifica se todos os campos estão preenchidos, envia uma solicitação post ao servidor usando axios e depois mostra uma mensagem toast se for bem-sucedido ou não
  const handleCreateUser = async () => {
    // verificação de entrada
    if (!name || !email || name === "" || email === "") {
      toast.error("Todos os campos são obrigatórios");
      return;
    }

    try {
      // solicitação post ao servidor
      const res = await axios.post("http://localhost:3000/", {
        name,
        email
      });

      // em caso de sucesso
      if (res.status === 201) {
        toast.success("Usuário criado com sucesso");
        addUser(res.data); // adiciona o novo usuário à lista
        setName(""); // esvazia os campos após a operação bem-sucedida
        setEmail(""); // esvazia os campos após a operação bem-sucedida
      }
    } catch (error) {
      // em caso de erro
      console.error("Erro ao criar usuário: ", error);
      toast.error("Erro ao criar usuário");
    }
  };

  // usando componentes pré-construídos do Bootstrap
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#CreateUserModal"
      >
        <b>Criar Usuário</b>
      </button>

      <div
        className="modal fade"
        id="CreateUserModal"
        tabIndex="-1"
        aria-labelledby="CreateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateUserModalLabel">
                <b>Digite o Nome e o Email</b>
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
                <label htmlFor="name" className="form-label">
                  Nome:
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
                  Email:
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
                className="btn btn-success"
                onClick={handleCreateUser}
                data-bs-dismiss="modal"
              >
                <b>Criar Usuário</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// exportando a função criada
export default CreateUserModal;
