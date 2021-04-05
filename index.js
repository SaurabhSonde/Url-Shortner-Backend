const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

//connection to database
connectDB();
//cors
app.use(cors());
//allowing to pass json data
app.use(express.json({ extented: false }));

//Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
