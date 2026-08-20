import { Router } from "express";
import { makeGetProfile } from "../../factories/authMakers";
const router = Router();
const controllers = makeGetProfile();
router.get("/profile", async (req, res) => {
    const rsp = await controllers.ver(req);
    res.status(rsp.status).json(rsp.message);
});
export default router;
