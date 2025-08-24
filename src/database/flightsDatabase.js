/*require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'postulaciones',               
    password: 'post123456',
    database: 'airline',
    
}).promise();
module.exports = pool;*/
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    waitForConnections: true,
}).promise();

async function getFlights() {
    const [rows] = await pool.query('SELECT * FROM flight');
    return rows;
}

async function getFlightById(id) {
    const [rows] = await pool.query('SELECT * FROM flight WHERE flight_id = ? LIMIT 1',[id]);
    return rows[0] || null;
}

async function getFlightWithPassengers(flightId) {
    const [fRows] = await pool.query(
        `SELECT
        flight_id        AS flightId,
        takeoff_date_time AS takeoffDateTime,
        takeoff_airport   AS takeoffAirport,
        landing_date_time AS landingDateTime,
        landing_airport   AS landingAirport,
        airplane_id       AS airplaneId
        FROM flight
        WHERE flight_id = ?`,
    [flightId]
);
    const flight = fRows[0];
    if (!flight) return null;

    const [passengers] = await pool.query(
        `SELECT
        p.passenger_id        AS passengerId,
        p.dni,
        p.name,
        p.age,
        p.country,
        bp.boarding_pass_id   AS boardingPassId,
        bp.purchase_id        AS purchaseId,
        s.seat_type_id        AS seatTypeId,
        s.seat_id             AS seatId
        FROM boarding_pass bp
        JOIN passenger    p ON p.passenger_id = bp.passenger_id
        JOIN seat         s ON s.seat_id      = bp.seat_id
        WHERE bp.flight_id = ?`,
    [flightId]
);

    return { ...flight, passengers };
}

module.exports = {
    pool,
    getFlights,
    getFlightById,
    getFlightWithPassengers,
};

    /*if (require.main === module) { //TEST
        (async () => {
    try {
        const arg = process.argv[2] ?? 1;
        const one = await getFlightById(arg);
        console.log('getFlightById ->', one);

        const agg = await getFlightWithPassengers(arg);
        console.log('getFlightWithPassengers ->', agg);

        const list = await getFlights();
        console.log('getFlights (primeros 3) ->', list.slice(0, 3));
    } catch (e) {
        console.error('❌ Error en autotest:', e?.message || e);
        process.exitCode = 1;
    }
    })();
}*/