const pool = require("../dbConn.js");
const userQuery = require("./userQuery.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { resolveMx } = require("dns");
const hashPassword = (password) => {
  const hashedPass = bcrypt.hashSync(password, 10);
  return hashedPass;
};
const addUser = async (req, res) => {
  const {
    username,
    password,
    email,
    phone,
    role,
    address,
    firstName,
    lastName,
  } = req.body;
  // const id = generateRandomId(username);
  const id = crypto.randomBytes(3).toString("hex").toUpperCase();

  const userRole = role || "guest";
  const hashedPassword = hashPassword(password);
  try {
    const existingUser = await pool.query(userQuery.getUserEmail, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const result = await pool.query(userQuery.addUser, [
      id,
      username,
      hashedPassword,
      email,
      phone,
      userRole,
      address,
      firstName,
      lastName,
    ]);
 
      return res.status(201).json({ msg: "User added successfully" });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding user" });
  }
};
const getAllUsers = async (req, res) => {
  const result = await pool.query(userQuery.getUsers);
  if (result.rows.length > 0) {
    return res.status(200).json({ users: result.rows });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(userQuery.getUserByDetails, [id]);
    if (result.rows.length > 0) {
      return res.status(200).json({ user: result.rows[0] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching user" });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    if (result.rowCount > 0) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting user" });
  }
};

const login = async(req,res)=>{
  const {email,password} = req.body;
  try{
    const result = await pool.query(userQuery.getUserEmail,[email]);
    if(result.rows.length === 0){
      return res.status(404).json({message:"User not found"});
    }
    const user = result.rows[0];
    const isMatch = bcrypt.compareSync(password,user.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid password"});
    }
    return res.status(200).json({message:"Login successful",user});
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Error logging in"});
  }
}
// const generateRandomId = (username)=>{
//   const prefix = username.slice(0,3).toUpperCase();
//   const randomId = crypto.randomBytes(3).toString('hex').toUpperCase();

//   return `${prefix}-${randomId}`;
// }
module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  getSingleUser,
  login
};
