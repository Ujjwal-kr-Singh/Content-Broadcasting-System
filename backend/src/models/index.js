const User = require("./User");
const Content = require("./Content");



User.hasMany(Content, { foreignKey: "uploaded_by", as: "contents" });
Content.belongsTo(User, { foreignKey: "uploaded_by", as: "uploader" });

Content.belongsTo(User, { foreignKey: "approved_by", as: "approver" });

module.exports = { User, Content };
