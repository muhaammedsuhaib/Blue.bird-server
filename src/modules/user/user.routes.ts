import { Router } from "express";
import {  getusers, registrar, userdeletebyId, userfindbyId, userupdatebyId } from "./user.controller";
import tryCatch from "../../middleware/tryCatch";

const router =Router();

router.get('/',tryCatch(getusers));
router.post('/',tryCatch(registrar));
router.get('/:id',tryCatch(userfindbyId));
router.put('/:id',tryCatch(userupdatebyId));
router.delete('/:id',tryCatch(userdeletebyId));

export default router;