function extractReviewsFromHTML() {
  const htmlString = document.querySelector(
    ".jdgm-rev-widg__reviews"
  ).innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const reviewElements = doc.querySelectorAll(".jdgm-rev");

  const reviews = [];

  reviewElements.forEach((el) => {
    const _id = el.dataset.reviewId || "";
    const productId = "naturenap-ortopedisk-nackkudde";
    const customer =
      el.querySelector(".jdgm-rev__author")?.textContent?.trim() || "";
    const title =
      el.querySelector(".jdgm-rev__title")?.textContent?.trim() ||
      "Ingen titel";
    const body = el.querySelector(".jdgm-rev__body")?.textContent?.trim() || "";
    const rating = parseInt(
      el.querySelector(".jdgm-rev__rating")?.getAttribute("data-score") || "0"
    );
    const isVerified = el.dataset.verifiedBuyer === "true";
    const country =
      el.querySelector(".jdgm-rev__location")?.textContent?.trim() || "";
    const createdAt =
      el.querySelector(".jdgm-rev__timestamp")?.getAttribute("data-content") ||
      "";
    const liked = parseInt(el.dataset.thumbUpCount || "0");
    const purchaseVerified = true; // you may adjust if there's a more precise flag
    const images = [];
    const videos = [];
    const reply = undefined;
    const repliedAt = undefined;

    // Optional: extract any images if added via <img> in review body
    el.querySelectorAll(".jdgm-rev__body img").forEach((img) => {
      images.push(img.src);
    });

    // Optional: extract videos if embedded
    el.querySelectorAll(
      '.jdgm-rev__body video, iframe[src*="youtube"], iframe[src*="vimeo"]'
    ).forEach((vid) => {
      if (vid.src) videos.push(vid.src);
    });

    reviews.push({
      _id,
      productId,
      customer,
      title,
      body,
      rating,
      images,
      videos,
      reply,
      repliedAt,
      isVerified,
      country: country || "SV",
      liked,
      purchaseVerified,
      createdAt,
    });
  });
  console.log(reviews);
  return reviews;
}
