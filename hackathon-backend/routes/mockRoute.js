import {Router} from "express";
import Subscription from "../models/mockSchema1.js";

const dataRouter = Router();

dataRouter.get("/analysis", async (req, res) => {
  try {
    const [total, active, cancelled, expired, revenue, byCategory, byFrequency, upcomingRenewals] =
      await Promise.all([
        Subscription.countDocuments(),
        Subscription.countDocuments({ status: "active" }),
        Subscription.countDocuments({ status: "cancelled" }),
        Subscription.countDocuments({ status: "expired" }),
        Subscription.aggregate([
          { $match: { status: "active" } },
          { $group: { _id: null, total: { $sum: "$price" } } },
        ]),
        Subscription.aggregate([
          { $group: { _id: "$category", count: { $sum: 1 } } },
        ]),
        Subscription.aggregate([
          { $group: { _id: "$frequency", count: { $sum: 1 } } },
        ]),
        Subscription.find({
          renewalDate: {
            $gte: new Date(),
            $lte: new Date(new Date().setDate(new Date().getDate() + 7)), // Next 7 days
          },
        }),
      ]);

    res.json({
      stats: {
        total,
        active,
        cancelled,
        expired,
        revenue: revenue[0]?.total || 0,
        byCategory,
        byFrequency,
        upcomingRenewals: upcomingRenewals.length,
      },
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({ message: "Analysis fetch failed" });
  }
});


export default dataRouter;
