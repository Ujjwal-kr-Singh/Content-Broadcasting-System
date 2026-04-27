const Content = require("../models/Content");

exports.getActiveContent = async (teacherId, subject = null) => {
    const now = new Date();

    let contents = await Content.findAll({
        where: {
            uploaded_by: teacherId,
            status: "approved"
        }
    });

    if (!contents || contents.length === 0) {
        return null;
    }

    if (subject) {
        const normalizedQuery = subject.toLowerCase().trim();

        contents = contents.filter(
            c => c.subject === normalizedQuery
        );

        if (contents.length === 0) {
            return null;
        }
    }

    contents = contents.filter(c => {
        if (!c.start_time || !c.end_time) return false;
        return now >= new Date(c.start_time) && now <= new Date(c.end_time);
    });

    if (contents.length === 0) {
        return null;
    }

    contents.sort((a, b) => a.id - b.id);

    const totalDuration = contents.reduce(
        (sum, c) => sum + c.duration * 60,
        0
    );

    if (totalDuration === 0) {
        return null;
    }

    const currentSeconds = Math.floor(Date.now() / 1000);
    const pointer = currentSeconds % totalDuration;

    let accumulated = 0;

    for (let content of contents) {
        const dur = content.duration * 60;

        if (pointer >= accumulated && pointer < accumulated + dur) {
            return content;
        }

        accumulated += dur;
    }

    return null;
};