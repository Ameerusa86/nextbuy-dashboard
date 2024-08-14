// utils/cors.ts

import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin:
    "https://nextbuy-dashboard-1j2f48yfz-ameerusa86s-projects.vercel.app/users", // Replace with your actual frontend URL
});

// Helper function to run the middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };
