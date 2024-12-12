/* VERSION DESARROLLADOR */

import cors from "cors";

const ACCEPTED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:59777",
];

const corsOptions = {
    origin: "*"//(origin, callback) => {
    //     if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
    //         return callback(null, true);
    //     }
    //     callback(new Error("Not allowed by CORS"));
    // }
    ,
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;


/* VERSION DESARROLLADOR */

// import cors from "cors";

// const ACCEPTED_ORIGINS = [
//     "http://localhost:8080",
//     "http://localhost:59777",
// ];

// const corsMiddleware = (ORIGINS=ACCEPTED_ORIGINS) => { cors({
//     origin: (origin, callback) => {
//         if (!origin || ORIGINS.includes(origin)) {
//             return callback(null, true);
//         }
//         callback(new Error("Not allowed by CORS"));
//     }
//     ,
//     methods: "GET,POST,PUT,PATCH,DELETE",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     optionsSuccessStatus: 204,
// })}


// export default corsMiddleware;