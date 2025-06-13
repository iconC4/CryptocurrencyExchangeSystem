import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import transferRoutes from "./routes/transfer.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/transfers", transferRoutes);
app.use('/api/wallets', walletRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});