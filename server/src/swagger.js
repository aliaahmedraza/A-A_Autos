// import swaggerJsDoc from "swagger-jsdoc";
// import path from "path";
// import fs from "fs";

// const routesPath = path.resolve("src/routes"); 

// if (!fs.existsSync(routesPath)) {
//   console.error(`Error: Routes directory not found at ${routesPath}`);
//   process.exit(1);
// }

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "A&A Autos API",
//       version: "1.0.0",
//       description: "API documentation for A&A Autos",
//     },
//     servers: [{ url: "http://localhost:3003" }],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//           description: 'Enter your JWT token in the format: Bearer <token>'
//         }
//       }
//     },
//     security: [{
//       bearerAuth: []
//     }]
//   },
//   apis: [path.join(routesPath, "*.js")], 
// };

// const swaggerSpecs = swaggerJsDoc(options);
// export default swaggerSpecs;
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";

const routesPath = path.resolve("src/routes");

if (!fs.existsSync(routesPath)) {
  console.error(`Error: Routes directory not found at ${routesPath}`);
  process.exit(1);
}

// console.log(`Swagger is scanning files in: ${routesPath}`);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A&A Autos API",
      version: "1.0.0",
      description: "API documentation for A&A Autos",
    },
    servers: [{ url: "http://localhost:3003" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(routesPath, "**", "*.js")], // Scan all subdirectories too
};

const swaggerSpecs = swaggerJsDoc(options);

// console.log("Swagger specs generated:", swaggerSpecs.paths); 

export default swaggerSpecs;
