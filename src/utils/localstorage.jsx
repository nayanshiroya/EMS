const employees = [];

const admin = [
  
];



export const getlocalstorage = () => {
  const employee = JSON.parse(localStorage.getItem("employee")) || [];
  const admin = JSON.parse(localStorage.getItem("admin")) || [];
  return { employee, admin };
};