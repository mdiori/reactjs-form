import { AiOutlineSearch } from "react-icons/ai";

const Input = ({ filter, label, mode, name, type, error }) => {
  const inputSearchButton = () => {
    if (mode === "search") {
      return (
        <button onClick={filter} className="search-button">
          <AiOutlineSearch />
        </button>
      );
    }
    return;
  };

  const formError = () => {
    if (mode === "form" && error) {
      return <small className="error">*{error}</small>;
    }
  };

  return (
    <div className={`input ${name}`}>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input type={type} className={`${mode}-input`} name={name} />
      {inputSearchButton()}
      {formError()}
    </div>
  );
};

export default Input;
