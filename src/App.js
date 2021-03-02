import { useState, useEffect } from "react";
import { Button, Input, Modal, Table } from "./components";
import api from "./services/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiUsers, setApiUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  const fetchAndSetUsers = async () => {
    try {
      const resp = await api.get(`/users`);
      setApiUsers(resp.data);
      setUsers(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterTable = async (inputName) => {
    const inputValue = document.querySelector(
      `.input.${inputName} .search-input`
    );
    let filteredUsers = [];

    if (inputName === "name") {
      filteredUsers = apiUsers.filter((user) => {
        if (
          user.name.includes(inputValue.value) ||
          user.name.toLowerCase().includes(inputValue.value)
        ) {
          return user;
        }
        return false;
      });
    } else if (inputName === "cpf") {
      filteredUsers = apiUsers.filter((user) => {
        if (
          user.cpf.includes(inputValue.value) ||
          user.cpf.toLowerCase().includes(inputValue.value)
        ) {
          return user;
        }
        return false;
      });
    }

    setUsers(filteredUsers);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="page">
        <div className="actions">
          <div className="actions__add">
            <Button label="Adicionar Usuário" task={() => openModal()}></Button>
          </div>
          <div className="actions__search">
            <Input
              name="cpf"
              label="CPF"
              mode="search"
              filter={() => filterTable("cpf")}
              type="number"
            ></Input>
            <Input
              name="name"
              label="Nome"
              mode="search"
              filter={() => filterTable("name")}
              type="text"
            ></Input>
          </div>
        </div>
        <Table tableData={users}></Table>
        {isModalOpen ? (
          <>
            <Modal
              closeModal={() => closeModal()}
              updateTable={() => fetchAndSetUsers()}
            ></Modal>
            <div className="overlay"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
