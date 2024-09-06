import { createDirector, getDirectors } from "../controllers/director";
import { Router } from "express";

const router = Router();

router.get("/", getDirectors);
router.post("/", createDirector);

export default router;
