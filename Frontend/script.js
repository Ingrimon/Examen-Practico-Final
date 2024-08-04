document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/traffic')
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById('trafficTable');
        data.forEach(record => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${record.radiobase}</td>`;
          record.days.forEach(day => {
            const cell = document.createElement('td');
            cell.textContent = day !== null ? day : '';
            if (day === null) {
              cell.classList.add('gray');
            } else if (day <= 15) {
              cell.classList.add('red');
            } else if (day > 15 && day <= 40) {
              cell.classList.add('orange');
            } else if (day > 40 && day <= 90) {
              cell.classList.add('yellow');
            } else if (day > 90) {
              cell.classList.add('green');
            }
            row.appendChild(cell);
          });
          table.appendChild(row);
        });
      })
      .catch(error => console.error('Error al obtener datos:', error));
  });
  