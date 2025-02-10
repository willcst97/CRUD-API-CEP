import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function DeleteUserModal() {
  const [id, setId] = useState("");
  const [user, setUser] = useState(null);

  const handleIdChange = async (event) => {
    const userId = event.target.value;
    setId(userId);

    if (userId) {
      try {
        const res = await axios.get(`http://localhost:3000/${userId}`);
        const userData = res.data;
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        toast.error("Erro ao buscar dados do usuário");
        setUser(null);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!id) {
      toast.error("ID é obrigatório");
      return;
    }
    try {
      const res = await axios.delete("http://localhost:3000", { data: { id } });

      if (res.status === 200) {
        toast.success(`Usuário com ID ${id} removido com sucesso`);
        setId("");
        setUser(null);

        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      toast.error("Erro ao deletar usuário");
    }
  };

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

// exportando a função criada
export default DeleteUserModal;
