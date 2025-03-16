import Notice from '../models/Notice.js';

export const createNotice = async (req, res) => {
    const { title, content } = req.body;
    const notice = await Notice.create({ title, content, createdBy: req.user._id });
    res.status(201).json(notice);
};

export const getNotices = async (req, res) => {
    const notices = await Notice.find().populate('createdBy', 'fullName').sort({ createdAt: -1 });
    res.json(notices);
};

export const deleteNotice = async (req, res) => {
    const notice = await Notice.findById(req.params.id);

    if (!notice) return res.status(404).json({ message: "Notice not found" });

    if (req.user.role === 'admin' || notice.createdBy.toString() === req.user._id.toString()) {
        await notice.deleteOne();
        res.json({ message: "Notice deleted" });
    } else {
        res.status(403).json({ message: "Unauthorized action" });
    }
};
