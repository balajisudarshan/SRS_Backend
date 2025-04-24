const {Router} = require('express');
const router = Router();

const controller = require('./medicineController.js');
router.get('/',controller.getAllMedicines);
router.post('/',controller.addMedicines);
router.get('/:id',controller.getMedicineById);
router.delete('/:id',controller.deleteMedicine)
module.exports = router;