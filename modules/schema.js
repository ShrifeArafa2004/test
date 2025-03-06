const mongoose = require("mongoose");
const schema = new  mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
});
const connnect = mongoose.connect(
  "mongodb+srv://shrafa298:shefo2004@cluster0.e6xn0.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
);
connnect
  .then(() => {
    console.log("connected sucssefully");
  })
  .catch((err) => {
    console.log(err);
  });
const Data = mongoose.model("Data", schema);
module.exports = Data;
