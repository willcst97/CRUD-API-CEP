function DeleteUserModal() {
  const [id, setId] = useState("");

  const handleDeleteUser = async () => {
    if (!id.trim()) {
      toast.error("O campo ID é obrigatório.");
      return;
    }

    try {
      const res = await axios.delete("http://localhost:3000/", { data: { id } });
      if (res.status === 200) {
        toast.success(`Usuário ID ${id} excluído com sucesso!`);
        setId("");
        setTimeout(() => location.reload(), 3000);
      }
    } catch (error) {
      toast.error("Erro ao excluir o usuário.");
    }
  };

  return (
    <>
      <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteUserModal">
        Excluir Usuário
      </button>
      <div className="modal fade" id="DeleteUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Informe o ID</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleDeleteUser} data-bs-dismiss="modal">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteUserModal;