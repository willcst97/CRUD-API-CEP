import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

function Table() {
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setUsers(response.data);

        if (!hasFetchedUsers.current) {
          toast.success("Dados buscados com sucesso");
          hasFetchedUsers.current = true;
        }
      } catch (error) {
        console.log("Ocorreu um erro ao buscar os usuários!", error);
        if (!hasFetchedUsers.current) {
          toast.error("Erro ao buscar dados");
          hasFetchedUsers.current = true;
        }
      }
    };

    fetchUsers();
  }, []);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">Tabela de Usuários</h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal />
        <DeleteUserModal />

        {users.length === 0 ? (
          <h3 id="h3">Nenhum usuário no banco de dados</h3>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CEP</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Número</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cep}</td>
                  <td>{user.logradouro}</td>
                  <td>{user.bairro}</td>
                  <td>{user.cidade}</td>
                  <td>{user.estado}</td>
                  <td>{user.numero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// exportando o componente para usá-lo em app.jsx
export default Table;
