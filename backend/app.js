const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error.field);
});

const user = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const groupRoutes = require("./routes/groupRoute");

app.use("/user", user);
app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
// app.use("/products", productRoutes);
// app.use("/categories", categoryRoutes);
// app.use("/cart", cartRoutes);
// app.use("/shippingtypes", shippingTypeRoutes);
// app.use("/reviews", reviewRoutes);
// app.use("/addresses", addressRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/orders", orderRoutes);
// app.use("/groups", groupRoutes);
// app.use("/subcategories", subcategoryRoutes);
// app.use("/search", searchRoutes);
// app.use("/companies", companyRoutes);

app.use(errorMiddleware);

module.exports = app;
