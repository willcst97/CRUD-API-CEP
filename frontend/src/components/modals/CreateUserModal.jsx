import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function CreateUserModal({ addUser }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = async () => {
    if (!nome.trim() || !email.trim()) {
      toast.error("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/", { nome, email });
      if (res.status === 201) {
        toast.success("Usuário criado com sucesso!");
        addUser(res.data);
        setNome("");
        setEmail("");
      }
    } catch (error) {
      toast.error("Erro ao criar o usuário!");
    }
  };

  return (
    <>
      <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#CreateUserModal">
        Criar Usuário
      </button>
      <div className="modal fade" id="CreateUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Preencha os dados</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-2" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleCreateUser} data-bs-dismiss="modal">Criar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUserModal;
