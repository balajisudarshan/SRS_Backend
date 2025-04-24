const pool = require('../dbConn.js');
const medicineQuery  = require('./medicineQuery.js');
const crypto = require('crypto');
const getAllMedicines = (req, res) => {
  pool.query(medicineQuery.getAllMedicinesQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving medicines");
    } else {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
      } else {
        res.status(200).json({ message: "No medicines found" });
      }
    }
  });
};

const addMedicines = (req, res) => {
  const { medname, expirydate, use, dosage,price, description } = req.body;
  const id = generateRandomId(medname);
  pool.query(
    medicineQuery.addMedicinesQuery,
    [id,medname, expirydate, use,dosage, price, description],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding medicines");
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
};
const generateRandomId = (medName)=>{
  const prefix = medName.slice(0,3).toUpperCase();
  const randomId = crypto.randomBytes(3).toString('hex').toUpperCase();

  return `${prefix}-${randomId}`;
}
const getMedicineById = (req,res)=>{
  const id = req.params.id.toUpperCase();
  pool.query(medicineQuery.getMedicineByIdQuery,[id],(err,result)=>{
    if(err){
      console.log(err);
      res.status(500).json({message:"Error retrieving medicine"});
    }else{
      if(result.rows.length > 0){
        res.status(200).json(result.rows[0]);
      }
      else{
        res.status(404).json({message:"Medicine not found"});
      }
    }
  })
}
const deleteMedicine = (req, res) => {
  const id = req.params.id.toUpperCase();  // Get id from URL parameters
  pool.query(medicineQuery.deleteMedicineQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error deleting medicine' });
    } else {
      if (result.rowCount > 0) {  // Check if any rows were deleted
        res.status(200).json({ message: 'Medicine deleted successfully' });
      } else {
        res.status(404).json({ message: 'Medicine not found' });
      }
    }
  });
};

module.exports = {
  getAllMedicines,
  addMedicines,
  getMedicineById,
  deleteMedicine
};
