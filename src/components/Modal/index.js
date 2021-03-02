import { Button, Input } from "../index";
import { AiOutlineClose } from "react-icons/ai";
import validateCpf from "../../utils/verifyCpf";
import { useState } from "react";
import api from "../../services/api";

const Modal = ({ closeModal, updateTable }) => {
  const [formErrors, setFormErrors] = useState([]);

  const verifyFormData = () => {
    const inputsValue = document.querySelectorAll(".modal .form-input");

    const formatedFormData = {
      name: inputsValue[0].value,
      cpf: inputsValue[1].value,
      phone: inputsValue[2].value,
      email: inputsValue[3].value,
      email2: inputsValue[4].value,
      password: inputsValue[5].value,
      password2: inputsValue[6].value,
    };

    const errors = [];

    const {
      name,
      cpf,
      phone,
      email,
      email2,
      password,
      password2,
    } = formatedFormData;

    errors[0] = verifyName(name);
    errors[1] = verifyCpf(cpf);
    errors[2] = verifyPhone(phone);
    errors[3] = verifyEmail(email);
    errors[4] = verifyEmail2(email, email2);
    errors[5] = verifyPassword(password);
    errors[6] = verifyPassword2(password, password2);

    setFormErrors(errors);

    delete formatedFormData.email2;
    delete formatedFormData.password2;
    registerNewUser(errors, formatedFormData);
  };

  const verifyName = (name) => {
    if (name.length < 2) {
      return "Preencher um nome com no mínimo 2 caracteres.";
    }
    return "";
  };

  const verifyCpf = (cpf) => {
    if (!validateCpf(cpf)) {
      return "Preencher com um cpf válido.";
    }
    return "";
  };

  const verifyPhone = (phone) => {
    if (phone.length < 11) {
      return "Preencher o número no formato (xx)xxxxx-xxxx.";
    }
    return "";
  };

  const verifyEmail = (email) => {
    if (email.length < 5) {
      return "Preencher com um email válido.";
    }
    return "";
  };

  const verifyEmail2 = (email, email2) => {
    if (email !== email2) {
      return "Os emails não coincidem.";
    }
    return "";
  };

  const verifyPassword = (password) => {
    if (password.length < 8) {
      return "Digitar uma senha com no mínimo 8 caracteres.";
    }
    return "";
  };

  const verifyPassword2 = (password, password2) => {
    if (password !== password2) {
      return "As senhas não coincidem.";
    }
    return "";
  };

  const registerNewUser = (err, data) => {
    let isTheFormValid = true;
    err.forEach((error) => {
      if (error.length) {
        isTheFormValid = false;
      }
    });
    if (isTheFormValid) {
      try {
        api.post("/user", data);
        closeModal();
        updateTable();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="modal">
      <h1>Cadastrar usuário</h1>
      <AiOutlineClose className="icon" onClick={() => closeModal()} />
      <Input
        type="text"
        name="name"
        label="Nome"
        mode="form"
        error={formErrors[0]}
      ></Input>
      <Input
        type="number"
        name="cpf"
        label="CPF"
        mode="form"
        error={formErrors[1]}
      ></Input>
      <Input
        type="number"
        name="phone"
        label="Telefone"
        mode="form"
        error={formErrors[2]}
      ></Input>
      <Input
        type="email"
        name="email"
        label="Email"
        mode="form"
        error={formErrors[3]}
      ></Input>
      <Input
        type="email"
        name="email2"
        label="Confirmar email"
        mode="form"
        error={formErrors[4]}
      ></Input>
      <Input
        type="password"
        name="password"
        label="Senha"
        mode="form"
        error={formErrors[5]}
      ></Input>
      <Input
        type="password"
        name="password2"
        label="Confirmar senha"
        mode="form"
        error={formErrors[6]}
      ></Input>
      <Button label="Cadastrar" task={verifyFormData}></Button>
    </div>
  );
};

export default Modal;
