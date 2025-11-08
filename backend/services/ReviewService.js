 import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const getMockedReviews = async () => {
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);
  const dataPath = join(currentDir, "../data/mockedReviews.json");

  const fileContent = fs.readFileSync(dataPath, "utf-8");
  const parsedData = JSON.parse(fileContent);

  return parsedData.result.map((review) => {
    let computedRating = review.rating;

    if (!computedRating && review.reviewCategory?.length) {
      const total = review.reviewCategory.reduce((acc, cat) => acc + cat.rating, 0);
      computedRating = total / review.reviewCategory.length;
    }

    return {
      listingName: review.listingName,
      guestName: review.guestName,
      rating: computedRating,
      reviewCategory: review.reviewCategory || [],
      type: review.type,
      submittedAt: review.submittedAt,
      publicReview: review.publicReview,
      channel: "Hostaway",
      isApproved: false,
    };
  });
};
