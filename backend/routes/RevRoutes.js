import express from "express";
import { getAllReviews, approveReview, seedReviewsSafe } from "../Controllers/RevController.js";
import ReviewItem from "../models/ReviewItem.js";

const router = express.Router();

const buildQuery = (queryParams) => {
  const query = {};
  
  if (queryParams.listing) {
    query.listingName = { $regex: new RegExp(queryParams.listing, "i") };
  }
  if (queryParams.type) {
    query.type = queryParams.type;
  }
  if (queryParams.channel) {
    query.channel = queryParams.channel;
  }
  if (queryParams.category) {
    query["reviewCategory.category"] = queryParams.category;
  }
  if (queryParams.minRating) {
    query.rating = { $gte: Number(queryParams.minRating) };
  }
  if (queryParams.maxRating) {
    query.rating = { ...(query.rating || {}), $lte: Number(queryParams.maxRating) };
  }
  if (queryParams.startDate) {
    query.submittedAt = { ...(query.submittedAt || {}), $gte: new Date(queryParams.startDate) };
  }
  if (queryParams.endDate) {
    query.submittedAt = { ...(query.submittedAt || {}), $lte: new Date(queryParams.endDate) };
  }

  return query;
};


router.get("/hostaway", getAllReviews);

router.post("/hostaway/seed", seedReviewsSafe);

router.patch("/hostaway/:id/approve", approveReview);

router.get("/hostaway/approved", async (req, res) => {
  try {
    const { listing } = req.query;
    const query = { isApproved: true };
    if (listing) query.listingName = { $regex: new RegExp(listing, "i") };

    const reviews = await ReviewItem.find(query).sort({ submittedAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching approved reviews:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/hostaway/stats/property", async (req, res) => {
  try {
    const stats = await ReviewItem.aggregate([
      {
        $group: {
          _id: "$listingName",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          approvedReviews: { $sum: { $cond: ["$isApproved", 1, 0] } }
        }
      },
      { $sort: { avgRating: -1 } }
    ]);
    res.status(200).json(stats);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/hostaway/stats", async (req, res) => {
  try {
    const query = buildQuery(req.query);

    const totalReviews = await ReviewItem.countDocuments(query);

    const globalAvgResult = await ReviewItem.aggregate([
      { $match: query },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const globalAvg = globalAvgResult[0]?.avgRating || 0;

    const avgByType = await ReviewItem.aggregate([
      { $match: query },
      { $group: { _id: "$type", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    const avgByCategory = await ReviewItem.aggregate([
      { $match: query },
      { $unwind: "$reviewCategory" },
      { $group: { _id: "$reviewCategory.category", avgRating: { $avg: "$reviewCategory.rating" }, count: { $sum: 1 } } }
    ]);

    const lowestReviews = await ReviewItem.find({ ...query, rating: { $lte: 6 } })
      .sort({ rating: 1 })
      .limit(5)
      .select("listingName guestName rating publicReview");

    const topReviews = await ReviewItem.find(query)
      .sort({ rating: -1 })
      .limit(5)
      .select("listingName guestName rating publicReview");

    res.status(200).json({
      totalReviews,
      globalAvg,
      avgByType,
      avgByCategory,
      lowestReviews,
      topReviews
    });
  } catch (err) {
    console.error("Error fetching global stats:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
