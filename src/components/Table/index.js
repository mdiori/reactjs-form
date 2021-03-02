const Table = ({ tableData }) => {
  const verifyUserData = (data) => {
    return data ? data : "Não cadastrado";
  };

  const usersTable = (users) => {
    if (users) {
      return users.map((user, index) => {
        const { name, email, cpf, phone } = user;
        return (
          <tr key={index}>
            <td data-label="Nome">{verifyUserData(name)}</td>
            <td data-label="Email">{verifyUserData(email)}</td>
            <td data-label="CPF">{verifyUserData(cpf)}</td>
            <td data-label="Telefone">{verifyUserData(phone)}</td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>{usersTable(tableData)}</tbody>
      </table>
    </div>
  );
};

export default Table;
