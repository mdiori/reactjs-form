const Button = ({ label, task }) => {
  return (
    <div className="btn add-user">
      <button onClick={task}>{label}</button>
    </div>
  );
};

export default Button;
