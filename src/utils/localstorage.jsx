const employees = [];

const admin = [
  
];

// export const setlocalstorage = () => {
//   if (!localStorage.getItem("employee")) {
//     localStorage.setItem("employee", JSON.stringify(employees));
//   }

//   if (!localStorage.getItem("admin")) {
//     localStorage.setItem("admin", JSON.stringify(admin));
//   }
// };

export const getlocalstorage = () => {
  const employee = JSON.parse(localStorage.getItem("employee")) || [];
  const admin = JSON.parse(localStorage.getItem("admin")) || [];
  return { employee, admin };
};