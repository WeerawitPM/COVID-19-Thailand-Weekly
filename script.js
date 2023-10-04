const url = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces";
let data = [];

async function getData() {
    //ระหว่างรอข้อมูลมา ให้แสดงข้อความ Loading...
    let mainData = document.getElementById("data");
    mainData.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <div class="spinner-border text-primary" role="status"></div>
            </td>
        </tr>
    `;
    try {
        const response = await fetch(url);
        data = await response.json();
        mainData.innerHTML = "";
        showData();
    } catch (error) {
        console.log(error);
    }
}
getData();

function showData() {
    let mainData = document.getElementById("data");

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <tr>
            <td>${data[i].province}</td>
            <td>${data[i].new_case}</td>
            <td>${data[i].total_case}</td>
            <td>${data[i].new_death}</td>
            <td>${data[i].total_death}</td>
        </tr>
        `
        mainData.appendChild(tr);
    }
    barChart(data);
}

function searchData() {
    let input = document.getElementById("searchInput").value;
    let mainData = document.getElementById("data");
    mainData.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i].province == input) {
            console.log(data[i].province);
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <tr>
                <td>${data[i].province}</td>
                <td>${data[i].new_case}</td>
                <td>${data[i].total_case}</td>
                <td>${data[i].new_death}</td>
                <td>${data[i].total_death}</td>
            </tr>
            `
            mainData.appendChild(tr);
        }
    }
}

function barChart(data) {
    const ctx = document.getElementById('myChart');
    //แสดงข้อมูล total_case ของแต่ละจังหวัด
    let province = [];
    let total_case = [];
    let total_death = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].province != "ทั้งประเทศ") {
            province.push(data[i].province);
            total_case.push(data[i].total_case);
            total_death.push(data[i].total_death);
        }
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: province,
            datasets: [{
                label: 'ติดเชื้อสะสม',
                data: total_case,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 1,
            },
            {
                label: 'เสียชีวิตสะสม',
                data: total_death,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: "white",
                        font: {
                            size: 14
                        }
                    },
                },
                y: {
                    ticks: {
                        color: "white",
                        font: {
                            size: 14
                        }
                    },
                }
            },
            //ทำให้สามารถ scroll ได้
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 16
                        },
                        color: "white"
                    }
                },
                title: {
                    display: true,
                    text: 'กราฟแสดงจำนวนผู้ติดเชื้อและผู้เสียชีวิตในแต่ละจังหวัด',
                    font: {
                        size: 18
                    },
                    color: "white"
                },
                pan : {
                    enabled: true,
                    mode: 'xy'
                },
                zoom : {
                    enabled: true,
                    mode: 'xy'
                }
            }
        }
    });
}