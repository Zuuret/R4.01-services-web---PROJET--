const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * @swagger
     * /auth/signup:
     *   post:
     *      description: Used to signup user
     *      tags:
     *          - users
     *      requestBody:
     *          required: true
     *          content:
     *             application/json:
     *                schema:
     *                    type: object
     *                    properties:
     *                        firstname:
     *                          type: string
     *                          minLength: 1
     *                          maxLength: 50
     *                          example: firstname
     *                        lastname:
     *                          type: string
     *                          minLength: 1
     *                          maxLength: 50
     *                          example: lastname
     *                        emailid:
     *                          type: string
     *                          minLength: 1
     *                          maxLength: 50
     *                          example: test@something.com
     *                        password:
     *                          type: string
     *                          minLength: 4
     *                          maxLength: 50
     *                          example: abcd
     *      security:
     *	       - jwt: []
     *      responses:
     *          '200':
     *              description: Resource added successfully
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    app.post(
        "/auth/signup",
        [
            verifySignUp.checkDuplicateUsername,
        ],
        controller.signup
    );

    /**
     * @swagger
     * /auth/signin:
     *   post:
     *      description: Used to sign in user
     *      tags:
     *          - users
     *      requestBody:
     *          required: true
     *          content:
     *             application/json:
     *                schema:
     *                    type: object
     *                    properties:
     *                        emailid:
     *                          type: string
     *                          minLength: 1
     *                          maxLength: 50
     *                          example: test@something.com
     *                        password:
     *                          type: string
     *                          minLength: 4
     *                          maxLength: 50
     *                          example: abcd
     *      security:
     *	       - jwt: []
     *      responses:
     *          '200':
     *              description: Resource added successfully
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    app.post("/auth/signin", controller.signin);

    /**
     * @swagger
     * /auth/refreshtoken:
     *   post:
     *      description: Used to refresh token
     *      tags:
     *          - users
     *      requestBody:
     *          required: true
     *          content:
     *             application/json:
     *                schema:
     *                    type: object
     *                    properties:
     *                        refreshToken:
     *                          type: string
     *                          minLength: 1
     *                          maxLength: 100
     *      security:
     *	       - jwt: []
     *      responses:
     *          '200':
     *              description: Resource added successfully
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    app.post("/auth/refreshtoken", controller.refreshToken);
};