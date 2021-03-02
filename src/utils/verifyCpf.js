const validateCpf = (strCPF) => {
  let sum;
  let remainder;
  sum = 0;
  strCPF = strCPF.replace(/[.-]/g, "");

  if (strCPF.split("").every((char) => char === strCPF[0])) {
    return false;
  }
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(strCPF.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(strCPF.substring(10, 11))) {
    return false;
  }
  return true;
};

export default validateCpf;
