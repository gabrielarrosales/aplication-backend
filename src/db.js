import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "perrito1",
    database: "salon_de_belleza",
    port: "5432",
})

