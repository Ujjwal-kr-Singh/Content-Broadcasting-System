const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const approvalRoutes = require("./routes/approvalRoutes");
const publicRoutes = require("./routes/publicRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/approval", approvalRoutes);
// app.use("/api/content", contentRoutes);
// app.use("/api/content", publicRoutes);
app.use("/api/public", publicRoutes);


app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

const sequelize = require("./config/db");

const { User, Content } = require("./models");

sequelize.authenticate()
    .then(() => console.log("DB Connected"))
    .catch(err => console.error("DB Connection Unseccessful ", err));

sequelize.sync({ alter: true })
    .then(() => console.log("Tables synced"));


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
