# ✈️ API Simulación de Check-in – Andes Airlines

Este proyecto corresponde al **ejercicio de postulación para Desarrollador/a Web Junior**.  
La API permite consultar un vuelo por su ID y retornar la simulación del check-in, asignando asientos a los pasajeros.

---

## 🚀 Tecnologías usadas
- Node.js (Express) – servidor y endpoints
- MySQL – base de datos provista en la prueba
- dotenv – manejo de variables de entorno
- AWS Elastic Beanstalk – despliegue en la nube

---

## ⚙️ Instalación y ejecución local

1. **Clonar repositorio**
   ```bash
   git clone <repo-url>
   npm install
   cp .env.example .env
   npm start
   GET http://localhost:3000/flights/1/passengers

Se creó un único endpoint REST (/flights/:id/passengers) tal como lo pide el enunciado.

La capa database consulta la base MySQL en modo solo lectura y transforma los campos de snake_case a camelCase.

La capa service simula el check-in: si un pasajero no tiene seatId, se le asigna uno en base a su seatTypeId.

La capa controller maneja la respuesta, devolviendo el JSON en el formato solicitado.

El proyecto sigue buenas prácticas de separación en capas (routes → controller → service → database).

Implementado:
Transformación a camelCase.
Endpoint único.
Formato de respuesta exacto.
Asignación básica de asientos a pasajeros sin seatId.


Pendiente (no implementado en esta versión):
Asegurar que menores de edad se sienten junto a un adulto de la misma compra.
Intentar agrupar asientos para todas las boarding passes de una compra.
Considerar layout de asientos de cada avión para validar cercanía real.
Estas reglas adicionales fueron analizadas y están descritas en el código/documentación, pero no se alcanzaron a implementar en esta versión.