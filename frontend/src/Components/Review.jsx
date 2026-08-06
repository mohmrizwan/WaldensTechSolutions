import { useEffect, useState } from "react";
import { fetchReviews } from "../api/reviewApi";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch {
        setError("Unable to load client reviews right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <div className="reviews-wrapper mx-auto px-7 mt-24">
      <div className="reviews-inner">
        <div className="reviews-head">
          <h3 className="text-3xl tracking-wider text-center font-space text-[#F4C95D]">
            CLIENT REVIEWS
          </h3>
        </div>
        <div className="reviews-title mt-4">
          <h2 className="text-6xl font-bold text-white font-space text-center">
            Trusted by teams who <br /> care about the details.
          </h2>
        </div>

        {isLoading ? (
          <div className="mt-14 text-center text-white">Loading reviews...</div>
        ) : error ? (
          <div className="mt-14 text-center text-yellow-200">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="mt-14 text-center text-[#B8C0D0]">
            No client testimonials are available at the moment.
          </div>
        ) : (
          <div className="reviews-grid mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review._id || review.id}
                className="group relative overflow-hidden rounded-3xl border border-[#24304A] bg-gradient-to-br from-[#101827] to-[#0B1220] p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#F4C95D] hover:shadow-[0_25px_60px_rgba(244,201,93,0.15)]"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#F4C95D]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

                <i className="fa-solid fa-quote-left text-2xl text-[#F4C95D]/40"></i>

                <div className="mt-4 flex gap-1 text-[#F4C95D] text-sm">
                  {Array.from({ length: review.rating || 5 }).map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                  ))}
                </div>

                <p className="mt-4 text-[#B8C0D0] text-lg leading-8">
                  {review.quote}
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-[#24304A] pt-6">
                  <img
                    src={review.avatarUrl || "https://via.placeholder.com/48"}
                    alt={review.clientName || "Client"}
                    className="h-12 w-12 rounded-full object-cover bg-[#24304A]"
                  />
                  <div>
                    <h4 className="text-white font-space font-semibold">
                      {review.clientName || "Client"}
                    </h4>
                    <p className="text-[#B8C0D0] text-sm">
                      {review.role || "Client"}
                      {review.company ? `, ${review.company}` : ""}
                    </p>
                  </div>
                </div>

                <div className="mt-8 h-[2px] w-12 bg-[#F4C95D] transition-all duration-500 group-hover:w-28"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;