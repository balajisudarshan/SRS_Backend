const getAllMedicinesQuery = "SELECT * FROM medicines";
const addMedicinesQuery = "INSERT INTO medicines (id,medname,expirydate,use,dosage,price,description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
const getMedicineByIdQuery = "SELECT * FROM medicines WHERE id = $1";
const deleteMedicineQuery = "DELETE FROM medicines WHERE id = $1 RETURNING *";
module.exports = {
  getAllMedicinesQuery,
  addMedicinesQuery,
  getMedicineByIdQuery,
  deleteMedicineQuery
}