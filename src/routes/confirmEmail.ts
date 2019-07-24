import { Request, Response } from "express";
import { User } from "../entity/User";
import { redis } from "../cache";

export const confirmEmamil = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = await redis.get(id);
	if (userId) {
		await User.update({ id: userId }, { confirmed: true });
		await redis.del(id);
		res.send("ok");
	} else {
		res.send("Invalid");
	}
};