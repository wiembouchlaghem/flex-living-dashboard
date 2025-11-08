import ReviewItem from "../models/ReviewItem.js";
import { getMockedReviews } from "../services/ReviewService.js";

// Get all reviews with optional filters
export const getAllReviews = async (req, res) => {
  try {
    const { type, listing, minRating, maxRating, startDate, endDate, sortBy, order } = req.query;

    const query = { channel: "Hostaway" };

    if (type) query.type = type;
    if (listing) query.listingName = { $regex: new RegExp(listing, "i") };
    if (minRating || maxRating) query.rating = {};
    if (minRating) query.rating.$gte = Number(minRating);
    if (maxRating) query.rating.$lte = Number(maxRating);
    if (startDate || endDate) query.submittedAt = {};
    if (startDate) query.submittedAt.$gte = new Date(startDate);
    if (endDate) query.submittedAt.$lte = new Date(endDate);

    const sortField = sortBy || "submittedAt";
    const sortOrder = order === "asc" ? 1 : -1;

    let reviews = await ReviewItem.find(query).sort({ [sortField]: sortOrder });

    // Si la base est vide, insérer les mocks automatiquement
    if (reviews.length === 0) {
      console.log("⚙️ Database empty — seeding mock reviews...");
      const mockData = await getMockedReviews();
      await ReviewItem.insertMany(mockData);
      reviews = await ReviewItem.find(query).sort({ [sortField]: sortOrder });
    }

    res.status(200).json({
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Unable to fetch reviews." });
  }
};

export const seedReviewsSafe = async (req, res) => {
  try {
    const data = await getMockedReviews();

    for (const review of data) {
      // Upsert : si la review existe (listing + guest), on met à jour, sinon on crée
      await ReviewItem.findOneAndUpdate(
        { listingName: review.listingName, guestName: review.guestName },
        review,
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Mock reviews seeded safely" });
  } catch (err) {
    console.error("Error seeding reviews safely:", err);
    res.status(500).json({ error: "Unable to seed reviews." });
  }
};

// Approve a specific review
export const approveReview = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await ReviewItem.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review approved",
      review: updated,
    });
  } catch (error) {
    console.error("Error approving review:", error);
    res.status(500).json({ error: "Unable to approve review." });
  }
};

// Get statistics per property for dashboard
export const getStats = async (req, res) => {
  try {
    const stats = await ReviewItem.aggregate([
      {
        $group: {
          _id: "$listingName",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          approvedReviews: { $sum: { $cond: ["$isApproved", 1, 0] } },
        },
      },
      { $sort: { avgRating: -1 } },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: err.message });
  }
};
