// importando bibliotecas, componentes funcionais para usá-los em uma tabela que mostrará dados do servidor
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

// criação do componente funcional principal que será passado para app.jsx
function Table() {
  // usando useState, useRef para variáveis de estado e ref para rastrear se a busca já foi tentada
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  // função useEffect assíncrona para buscar dados do servidor
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        // configurando o array vazio como um objeto json de usuários obtidos do servidor
        setUsers(response.data);

        // usando o useRef current que é o mesmo que inicializado até mudar
        if (!hasFetchedUsers.current) {
          toast.success("Dados buscados com sucesso");
          hasFetchedUsers.current = true; // define o ref para true após a primeira busca
        }
      } catch (error) {
        console.log("Ocorreu um erro ao buscar os usuários!", error);

        // se não buscamos, permanece como está
        if (!hasFetchedUsers.current) {
          toast.error("Erro ao buscar dados");
          hasFetchedUsers.current = true; // define o ref para true após a primeira tentativa de busca
        }
      }
    };

    // chamando a função aqui
    fetchUsers();
  }, []);

  // após adicionar ou criar um novo usuário, normalmente teríamos que recarregar a página manualmente, mas com esta função apenas adicionamos o usuário criado ao final do objeto json buscado, que salvamos como um array
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // usando componentes pré-construídos do Bootstrap e componentes de modal
  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">
          Tabela de Usuários
        </h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal />
        <DeleteUserModal />

        {users.length === 0 ? (
          <h3 id="h3">Nenhum usuário no banco de dados</h3>
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

// exportando o componente para usá-lo em app.jsx
export default Table;
