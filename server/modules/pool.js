const pg = require('pg');
let pool;

// const config = {
//     database: 'weekend-to-do-app', 
//     host: 'localhost', 
//     port: 5432, 
//     max: 10, 
//     idleTimeoutMillis: 30000 
// };

//const pool = new pg.Pool(config);

if (process.env.DATABASE_URL){
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectionUnauthorized: false
        }
    });
}

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

module.exports = pool;