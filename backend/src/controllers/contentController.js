const Content = require("../models/Content");

exports.uploadContent = async (req, res) => {
    try {
        const { title, subject, description, start_time, end_time } = req.body;

        if (!title || !subject) {
            return res.status(400).json({ msg: "Title & Subject required" });
        }

        if (!req.file) {
            return res.status(400).json({ msg: "File required" });
        }

        if (start_time && end_time) {
            const start = new Date(start_time);
            const end = new Date(end_time);

            if (isNaN(start) || isNaN(end)) {
                return res.status(400).json({ msg: "Invalid date format" });
            }

            if (start >= end) {
                return res.status(400).json({ msg: "start time must be before end time" });
            }
        }
        const normalizedSubject = subject.toLowerCase().trim();

        const content = await Content.create({
            title,
            subject: normalizedSubject,
            description,
            file_path: req.file.filename,
            file_type: req.file.mimetype,
            file_size: req.file.size,
            uploaded_by: req.user.id,
            start_time,
            end_time
        });

        res.json({
            msg: "Uploaded successfully (pending approval)",
            content
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMyContent = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = (page - 1) * limit;

        const { count, rows } = await Content.findAndCountAll({
            where: { uploaded_by: req.user.id },
            attributes: ["id", "title", "subject", "status", "rejection_reason", "createdAt"],
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