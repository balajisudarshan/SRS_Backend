const getUserEmail = "SELECT * from users WHERE email = $1";
const addUser = "INSERT INTO users(id,username,password,email,phone,role,address,first_name,last_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
const getUsers = "SELECT * FROM users";
const getUserByDetails = "SELECT * FROM users WHERE id = $1 ";

module.exports = {
  getUserEmail,
  addUser,
  getUsers,
  getUserByDetails
}