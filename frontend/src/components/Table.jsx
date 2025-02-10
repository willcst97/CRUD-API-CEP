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
          toast.success("Dados carregados com sucesso!");
          hasFetchedUsers.current = true;
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);

        if (!hasFetchedUsers.current) {
          toast.error("Erro ao buscar dados!");
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
        <h1 className="mb-4">Usuários cadastrados</h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal />
        <DeleteUserModal />

        {users.length === 0 ? (
          <h3>Nenhum usuário cadastrado</h3>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Table;
