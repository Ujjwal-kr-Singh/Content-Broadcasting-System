const Content = require("../models/Content");


exports.approveContent = async (req, res) => {
    try {
        const { id } = req.params;

        const content = await Content.findByPk(id);
        if (!content) {
            return res.status(404).json({ msg: "Content not found" });
        }

        content.status = "approved";
        content.approved_by = req.user.id;
        content.approved_at = new Date();

        await content.save();

        res.json({
            msg: "Content approved",
            content
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//  Reject Content
exports.rejectContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({ msg: "Rejection reason required" });
        }

        const content = await Content.findByPk(id);
        if (!content) {
            return res.status(404).json({ msg: "Content not found" });
        }

        content.status = "rejected";
        content.rejection_reason = reason;

        await content.save();

        res.json({
            msg: "Content rejected",
            content
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllContent = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = (page - 1) * limit;

        const { count, rows } = await Content.findAndCountAll({
            attributes: ["id", "title", "subject", "status", "rejection_reason", "uploaded_by", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit,
            offset
        });

        res.json({
            data: rows,
            pagination: {
                page,
                limit,
                totalItems: count,
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.getPendingContent = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = (page - 1) * limit;

        const { count, rows } = await Content.findAndCountAll({
            where: { status: "pending" },
            attributes: ["id", "title", "subject", "uploaded_by", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit,
            offset
        });

        res.json({
            data: rows,
            pagination: {
                page,
                limit,
                totalItems: count,
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};