const { PrismaClient } = require("@prisma/client");
const moment = require("moment-timezone");

const prisma = new PrismaClient();

// Nairobi time zone
// const NAIROBI_TIMEZONE = "Africa/Nairobi";

// // Middleware to handle time zone conversion
// prisma.$use(async (params, next) => {
//   // Handle 'create' and 'update' queries: Convert to UTC before saving
//   if (params.action === "create" || params.action === "update") {
//     const data = params.args.data;

//     if (data) {
//       Object.keys(data).forEach((key) => {
//         if (data[key] instanceof Date) {
//           // Convert Nairobi time to UTC before storing in the database
//           data[key] = moment.tz(data[key], NAIROBI_TIMEZONE).utc().toDate();
//         }
//       });
//     }
//   }

//   // Run the database query
//   const result = await next(params);

//   // Handle 'find' queries: Convert UTC dates to Nairobi time before returning
//   if (params.action.startsWith("find")) {
//     if (Array.isArray(result)) {
//       // Convert an array of results
//       result.forEach((item) => convertTimestampsToNairobi(item));
//     } else {
//       // Convert a single result
//       convertTimestampsToNairobi(result);
//     }
//   }

//   return result;
// });

// // Helper function to convert UTC timestamps to Nairobi time
// function convertTimestampsToNairobi(data) {
//   if (data && typeof data === "object") {
//     Object.keys(data).forEach((key) => {
//       if (data[key] instanceof Date) {
//         data[key] = moment.utc(data[key]).tz(NAIROBI_TIMEZONE).toDate();
//       }
//     });
//   }
// }

module.exports = prisma; // Use module.exports for CommonJS
