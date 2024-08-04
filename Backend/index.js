const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const app = express();
const port = 3000;

const readCSVData = () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, 'REPORT_EXAMEN_260724.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const trafficData = results.map(row => {
          return {
            radiobase: row.radiobase,
            days: Object.keys(row).filter(key => key.startsWith('day')).map(key => row[key] ? parseInt(row[key], 10) : null)
          };
        });
        resolve(trafficData);
      })
      .on('error', reject);
  });
};

app.get('/api/traffic', async (req, res) => {
  try {
    const trafficData = await readCSVData();
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor que se ejecuta en http://localhost:${port}`);
});
