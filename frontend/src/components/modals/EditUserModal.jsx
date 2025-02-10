function EditUserModal() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleEditUser = async () => {
    if (!id.trim() || !nome.trim() || !email.trim()) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const res = await axios.put("http://localhost:3000/", { id, nome, email });
      if (res.status === 200) {
        toast.success("Usuário atualizado com sucesso!");
        setId("");
        setNome("");
        setEmail("");
        setTimeout(() => location.reload(), 3000);
      }
    } catch (error) {
      toast.error("Erro ao editar o usuário.");
    }
  };

  return (
    <>
      <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#EditUserModal">
        Editar Usuário
      </button>
      <div className="modal fade" id="EditUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Usuário</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-2" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
              <input type="text" className="form-control mb-2" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-warning" onClick={handleEditUser} data-bs-dismiss="modal">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserModal;