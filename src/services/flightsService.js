const { getFlightWithPassengers } = require('../database/flightsDatabase');


function assignSeatsSimulation(passengers) {
    const used = new Set(
    passengers
    .filter(p => p.seatId !== null && p.seatId !== undefined)
    .map(p => `${p.seatTypeId}:${p.seatId}`)
);

    const nextByType = {};
    const ordered = [...(passengers || [])].sort((a, b) => (a.boardingPassId ?? 0) - (b.boardingPassId ?? 0));

    return ordered.map(p => {
    if (p.seatId !== null && p.seatId !== undefined) return p;

    const t = p.seatTypeId;
    if (!nextByType[t]) nextByType[t] = 1;

    let sid;
    while (true) {
      sid = t * 1000 + nextByType[t]; 
        nextByType[t] += 1;
        const key = `${t}:${sid}`;
        if (!used.has(key)) { used.add(key); break; }
    }
    return { ...p, seatId: sid };
    });
}

async function getPassengersWithAssignedSeats(flightId) {
    const flight = await getFlightWithPassengers(flightId);
    if (!flight) return null;
    const passengers = assignSeatsSimulation(flight.passengers || []);
    return { ...flight, passengers };
}

module.exports = { getPassengersWithAssignedSeats };