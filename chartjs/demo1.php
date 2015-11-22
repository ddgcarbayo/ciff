<? require(__DIR__.'/../inc/head.php')?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
    <canvas id="skills" width="300" height="300"></canvas>
<script>
    $(function () {
        var pieData = [
            {
                value: 25,
                label: 'Java',
                color: '#811BD6'
            },
            {
                value: 10,
                label: 'Scala',
                color: '#9CBABA'
            },
            {
                value: 30,
                label: 'PHP',
                color: '#D18177'
            },
            {
                value : 35,
                label: 'HTML',
                color: '#6AE128'
            }
        ];

        var context = document.getElementById('skills').getContext('2d');
        var skillsChart = new Chart(context).Pie(pieData);
    });
</script>
<? require(__DIR__.'/../inc/footer.php')?>