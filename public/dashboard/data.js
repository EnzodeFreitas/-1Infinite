// data.js
const formatDate = d3.timeFormat("%Y-%m-%d");
const year = new Date().getFullYear();

// Inicializa o objeto no localStorage se ainda não existir
if (!localStorage.getItem('userActivityByDate')) {
  const data = d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1))
    .reduce((acc, date) => {
      acc[formatDate(date)] = 0;
      return acc;
    }, {});
  localStorage.setItem('userActivityByDate', JSON.stringify(data));
}

function incrementTodayCount() {
  const today = formatDate(new Date());
  const data = JSON.parse(localStorage.getItem('userActivityByDate'));
  data[today] = (data[today] || 0) + 1;
  localStorage.setItem('userActivityByDate', JSON.stringify(data));
}
