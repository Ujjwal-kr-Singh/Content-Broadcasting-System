const { getActiveContent } = require("../services/schedulingService");

exports.getLiveContent = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { subject } = req.query;

        const content = await getActiveContent(teacherId, subject);

        if (!content) {
            return res.json({ msg: "No content available" });
        }

        res.json({
            id: content.id,
            title: content.title,
            subject: content.subject,
            file: content.file_path,
            current_time: new Date()
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};