import { Router } from "express";
import { getPrivateData } from "../controllers/private.js";

const router = Router();

router.route("/").get(getPrivateData);

export default router;
