import Log from "../models/Log/Log.model.js";

export const saveLog = async (req, res) => {
    try {
        const { message, level } = req.body;
        const log = new Log({ message, level });
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}