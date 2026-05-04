const { faker } = require('@faker-js/faker');
const db = require('./db');
const { siteNames, materials, logs } = require('./generate');

async function seed() {
  try {
    console.log('Inserting sites...');
    for (const name of siteNames) {
      await db.query(
        'INSERT INTO Sites (site_name, location, manager_name) VALUES (?,?,?)',
        [name, faker.location.city(), faker.person.fullName()]
      );
    }

    console.log('Inserting materials...');
    for (const m of materials) {
      await db.query(
        'INSERT INTO Materials (material_name, unit, unit_cost) VALUES (?,?,?)',
        [m.name, m.unit, m.cost]
      );
    }

    console.log('Inserting 10,000 logs (bulk)...');
    const values = logs.map(l =>
      [l.site_id, l.material_id, l.quantity_used, l.log_date, l.recorded_by]
    );
    await db.query(
      'INSERT INTO Consumption_Logs (site_id,material_id,quantity_used,log_date,recorded_by) VALUES ?',
      [values]
    );

    console.log('Done! All data inserted.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();