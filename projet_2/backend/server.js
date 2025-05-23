const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();


const app = express();

let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:8080"],
    credentials: true
};

app.use(cors(corsOptions));

// analyser les requêtes de type de contenu - application/json
app.use(bodyParser.json());

// analyser les requêtes de type de contenu - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/** Swagger Initialization - START */
const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: {
        openapi: "3.0.2",
        info: {
            title: "TP EXPRESS JWT",
            version: "1.0.0",
            description:
                "API documentation",
            servers: [`http://localhost:${process.env.PORT || 3000}/`],
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        }
        ,
        security: [{
            jwt: []
        }],
    },
    apis: ["server.js", "./routes/*.js"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/** Swagger Initialization - END */

app.get("/", (req, res) => {
    res.json({ message: "Bienvenue dans l'application : Auth JWT" });
});

db.sequelize.sync().then(() => {
    console.log('Database synchronized successfully');
});

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// définir le port, écouter les requêtes
const PORT = process.env.PORT || 6543;
app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}.`);
});
