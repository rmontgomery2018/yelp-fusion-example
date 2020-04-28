"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");
const yelp = require("yelp-fusion").client(process.env.YELP_FUSTION_API_KEY);

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: {
      cors: true,
    },
  });

  server.route({
    method: "GET",
    path: "/businesses/top",
    options: {
      validate: {
        query: Joi.object({
          location: Joi.string().required(),
          businessType: Joi.string().required(),
          limit: Joi.number().min(1).max(50).default(5),
          sortBy: Joi.string()
            .valid("best_match", "rating", "review_count")
            .default("rating"),
        }),
      },
    },
    handler: async (request, h) => {
      const { location, businessType, limit, sortBy } = request.query;

      const {
        jsonBody: { businesses },
      } = await yelp.search({
        term: businessType,
        location,
        limit,
        sort_by: sortBy,
      });

      const result = await Promise.all(businesses.map(async business => {
          const { jsonBody: { reviews: [review] } } = await yelp.reviews(business.id) || []
          return {
            id: business.id,
            name: business.name,
            address: business.location,
            imageUrl: business.image_url,
            review: {
                excerpt: review.text,
                user: review.user.name
            }
        }
      }))

      return result;
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
