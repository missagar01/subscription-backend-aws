import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import subscriptionApprovalRoutes from "./routes/susbcriptionApprovalRoutes.js";
import subscriptionPaymentRoutes from "./routes/subscription-pyament.routes.js";
import renewalRoutes from "./routes/renewal.routes.js";
import mySubscriptionRoutes from "./routes/mySubscription.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import masterRoutes from "./routes/master.js";
import userRoutes1 from "./routes/user.js";



dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.use("/master", masterRoutes);
app.use("/users1", userRoutes1);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/subscription-approval", subscriptionApprovalRoutes);
app.use("/api/subscription-payment", subscriptionPaymentRoutes);
app.use("/api/subscription-renewal", renewalRoutes);
app.use("/api/mySubscriptions", mySubscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard-routes", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Repair System API Working 🚀");
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );

app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));

