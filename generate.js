const { faker } = require('@faker-js/faker');

const siteNames = [
  'Alpha Tower', 'Beta Bridge', 'Gamma Mall',
  'Delta Highway', 'Epsilon Dam'
];

const materials = [
  { name: 'Portland Cement', unit: 'bags',     cost: 12.50 },
  { name: 'Steel Rebar',     unit: 'kg',       cost: 0.85  },
  { name: 'River Sand',      unit: 'cubic_m',  cost: 45.00 },
  { name: 'Crushed Stone',   unit: 'cubic_m',  cost: 55.00 },
  { name: 'Red Bricks',      unit: 'pieces',   cost: 0.45  },
  { name: 'Timber Planks',   unit: 'pieces',   cost: 8.00  },
];

const logs = [];
const start = new Date('2020-01-01');
const end   = new Date();

for (let i = 0; i < 10000; i++) {
  logs.push({
    site_id:       faker.number.int({ min: 1, max: 5 }),
    material_id:   faker.number.int({ min: 1, max: 6 }),
    quantity_used: faker.number.int({ min: 1, max: 500 }),
    log_date:      faker.date.between({ from: start, to: end })
                     .toISOString().split('T')[0],
    recorded_by:   faker.person.fullName(),
  });
}

module.exports = { siteNames, materials, logs };