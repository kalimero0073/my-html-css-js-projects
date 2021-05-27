// https://www.chartjs.org/docs/latest/general/data-structures.html

var ctx = $('#myChart');

data: [100, 80, 90, 110]
labels: ["25.05.2021", "26.05.2021", "27.05.2021", "28.05.2021"]

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["25.05.2021", "26.05.2021", "27.05.2021", "28.05.2021"],
        datasets: [{
            label: '# of Push Ups',
            data: [100, 80, 90, 110],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});