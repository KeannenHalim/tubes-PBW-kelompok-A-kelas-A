let drop = document.querySelector('#filter');
let obj = { a: "a" };
let myChart;
let init = {
    method: 'post',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
};
fetch('/getDataGrafik', init).then(onSuccess1).then(showResult1);
function showResult1(text) {
    let stringData = "";
    let stringLabel = "";
    let labels = "";
    let dataIn = "";
    let idx = 1;
    for (let i of text) {
        stringLabel += String(idx) + ",";
        idx++;
        stringData += String(i.jumlah)+",";
    }
    dataIn = stringData.split(",");
    labels = stringLabel.split(",");
    const data = {
        labels: labels,
        datasets: [{
            label: 'grafik tren PTMT',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            color: '#2b2727',
            data: dataIn,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 20,
                            weight: 'bolder'
                        }
                    }
                }
            }
        }
    };
    
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
};

function onSuccess1(response) {
    return response.json();
};


drop.addEventListener('change', (e) => {
    myChart.destroy();
    const filt = {a:(drop.options[drop.selectedIndex].value)};
    init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filt)
    };
    
    fetch('/getDataGrafik', init).then(onSuccess2).then(showResult2);
    function showResult2(text) {
        let stringData = "";
        let stringLabel = "";
        let labels = "";
        let dataIn = "";
        let idx = 1;
        for (let i of text) {
            stringLabel += String(idx) + ",";
            idx++;
            stringData += String(i.jumlah)+",";
        }
        dataIn = stringData.split(",");
        labels = stringLabel.split(",");
        const data = {
            labels: labels,
            datasets: [{
                label: 'grafik tren PTMT',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                color: '#2b2727',
                data: dataIn,
            }]
        };
    
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 20,
                                weight: 'bolder'
                            }
                        }
                    }
                }
            }
        };
        myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    };
    
    function onSuccess2(response) {
        return response.json();
    };
});

