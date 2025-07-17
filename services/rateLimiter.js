import rateLimit from 'express-rate-limit';
export const rateLimiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // Limit each IP to 100 requests per windowMs
message: {
status: 429,
message: "Too many requests. Please try again later."
},
standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});