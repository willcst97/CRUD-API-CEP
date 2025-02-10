// Importando hooks do React e outras bibliotecas necessárias
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

// Definição do componente funcional Table
function Table() {
  // Definindo o estado inicial dos usuários como um array vazio
  const [users, setUsers] = useState([]);
  // Utilizando useRef para rastrear se a busca de usuários já foi realizada
  const hasFetchedUsers = useRef(false);

  // Utilizando useEffect para buscar dados de usuários quando o componente é montado
  useEffect(() => {
    // Função assíncrona para buscar usuários do servidor
    const fetchUsers = async () => {
      try {
        // Realizando a requisição GET para obter os dados dos usuários
        const response = await axios.get("http://localhost:3000");
        // Atualizando o estado dos usuários com os dados obtidos do servidor
        setUsers(response.data);

        // Verificando se a busca de usuários já foi realizada
        if (!hasFetchedUsers.current) {
          // Exibindo uma mensagem de sucesso usando toast
          toast.success("Dados buscados com sucesso");
          // Marcando que a busca foi realizada
          hasFetchedUsers.current = true;
        }
      } catch (error) {
        // Exibindo uma mensagem de erro no console caso ocorra um problema
        console.log("Ocorreu um erro ao buscar os usuários!", error);
        // Verificando se a busca de usuários já foi realizada
        if (!hasFetchedUsers.current) {
          // Exibindo uma mensagem de erro usando toast
          toast.error("Erro ao buscar dados");
          // Marcando que a busca foi realizada
          hasFetchedUsers.current = true;
        }
      }
    };

    // Chamando a função de busca de usuários
    fetchUsers();
  }, []);

  // Função para adicionar um novo usuário ao estado
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Renderizando a tabela de usuários e os modais de criação, edição e exclusão de usuário
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
                <th>ID</th>
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

// Exportando o componente para ser usado em app.jsx
export default Table;
