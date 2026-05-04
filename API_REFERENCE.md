# Constech API Reference

Base URL: http://localhost:3000/api

---

## Materials

GET    /materials              → returns all materials
GET    /materials/:id          → returns single material
POST   /materials              → creates material
                                 Body: { material_name, unit, unit_cost }
PUT    /materials/:id          → updates material
                                 Body: { material_name, unit, unit_cost }
DELETE /materials/:id          → deletes material

---

## Consumption Logs

GET    /logs                   → returns logs (sorted)
                                 Query: sortBy, limit
                                 sortBy options: byDateDesc, byDateAsc,
                                                 byQuantityDesc, byQuantityAsc
GET    /logs/search            → binary search by material
                                 Query: material_id (required)
POST   /logs                   → creates a log entry
                                 Body: { site_id, material_id, quantity_used,
                                         log_date (YYYY-MM-DD), recorded_by }
DELETE /logs/:id               → deletes a log entry

---

## Delivery Queue

GET    /deliveries             → view all pending requests
POST   /deliveries             → submit new delivery request
                                 Body: { site_id, material_id,
                                         quantity_requested, notes }
DELETE /deliveries/process     → process next request in queue