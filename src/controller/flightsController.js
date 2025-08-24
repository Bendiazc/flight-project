const svc = require('../services/flightsService');

const ok200 = (res, payload) =>
    res.status(200).json({ code: 200, data: payload });

const notFound404 = (res) =>
    res.status(404).json({ code: 404, data: {} });

const error500 = (res) =>
    res.status(500).json({ code: 500, errors: 'could not connect to db' });

const getPassengersAssigned = async (req, res) => {
    try { req.app.set('json spaces', 2); } catch (_) {}
    res.type('application/json; charset=utf-8');

    try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return notFound404(res);
    }

    const result = await svc.getPassengersWithAssignedSeats(id);
    if (!result) return notFound404(res);

    // Aseguramos la forma del payload EXACTA
    const {
        flightId,
        takeoffDateTime,
        takeoffAirport,
        landingDateTime,
        landingAirport,
        airplaneId,
        passengers,
    } = result;

    return ok200(res, {
        flightId,
        takeoffDateTime,
        takeoffAirport,
        landingDateTime,
        landingAirport,
        airplaneId,
        passengers, // array
        });
} catch (e) {
    // Cualquier error interno (DB, etc.)
    return error400(res);
}
};

module.exports = { getPassengersAssigned };
