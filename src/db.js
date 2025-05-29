import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "perrito1",
    database: "salon de belleza",
    port: "5432",
})

