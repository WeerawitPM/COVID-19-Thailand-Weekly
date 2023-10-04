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

    // แสดงจำนวนผู้ติดเชื้อรวม
    for (let i = 0; i < data.length; i++) {
        if (data[i].province == "ทั้งประเทศ") {
            let totalCase = document.getElementById("totalCase");
            //แสดงเป็น card
            totalCase.innerHTML = `
            <div class="card text-white bg-danger mb-3">
                <div class="card-header">ผู้ติดเชื้อรวม</div>
                <div class="card-body">
                <h5 class="card-title text-center">${data[i].total_case}</h5>
                </div>
            </div>
            `
        }
    }
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
