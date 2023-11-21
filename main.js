document.addEventListener("DOMContentLoaded", function () {
    const stockData = {
        TCS: [
            { date: "2023-01-01", price: 3400 },
            { date: "2023-01-02", price: 3425 },
            { date: "2023-01-03", price: 3410 },
            { date: "2023-01-04", price: 3395 },
            { date: "2023-01-05", price: 3408 },
        ],
        Reliance: [
            { date: "2023-01-01", price: 2500 },
            { date: "2023-01-02", price: 2550 },
            { date: "2023-01-03", price: 2575 },
            { date: "2023-01-04", price: 2520 },
            { date: "2023-01-05", price: 2555 },
        ],
        HDFC: [
            { date: "2023-01-01", price: 2400 },
            { date: "2023-01-02", price: 2385 },
            { date: "2023-01-03", price: 2420 },
            { date: "2023-01-04", price: 2415 },
            { date: "2023-01-05", price: 2402 },
        ],
        Infosys: [
            { date: "2023-01-01", price: 1700 },
            { date: "2023-01-02", price: 1695 },
            { date: "2023-01-03", price: 1720 },
            { date: "2023-01-04", price: 1685 },
            { date: "2023-01-05", price: 1708 },
        ],
        BhartiAirtel: [
            { date: "2023-01-01", price: 620 },
            { date: "2023-01-02", price: 610 },
            { date: "2023-01-03", price: 625 },
            { date: "2023-01-04", price: 615 },
            { date: "2023-01-05", price: 620 },
        ],
        ICICIBank: [
            { date: "2023-01-01", price: 780 },
            { date: "2023-01-02", price: 775 },
            { date: "2023-01-03", price: 790 },
            { date: "2023-01-04", price: 770 },
            { date: "2023-01-05", price: 785 },
        ],
        Wipro: [
            { date: "2023-01-01", price: 600 },
            { date: "2023-01-02", price: 610 },
            { date: "2023-01-03", price: 620 },
            { date: "2023-01-04", price: 605 },
            { date: "2023-01-05", price: 615 },
        ],
        KotakBank: [
            { date: "2023-01-01", price: 1900 },
            { date: "2023-01-02", price: 1915 },
            { date: "2023-01-03", price: 1890 },
            { date: "2023-01-04", price: 1920 },
            { date: "2023-01-05", price: 1905 },
        ],
        HCLTech: [
            { date: "2023-01-01", price: 1200 },
            { date: "2023-01-02", price: 1215 },
            { date: "2023-01-03", price: 1190 },
            { date: "2023-01-04", price: 1220 },
            { date: "2023-01-05", price: 1205 },
        ],
        AxisBank: [
            { date: "2023-01-01", price: 750 },
            { date: "2023-01-02", price: 755 },
            { date: "2023-01-03", price: 740 },
            { date: "2023-01-04", price: 760 },
            { date: "2023-01-05", price: 745 },
        ],
    };
        

    function fetchStockData(symbol) {
        return stockData[symbol] || [];
    }

    function initChart(symbol) {
        const stockPrices = fetchStockData(symbol);

        if (stockPrices.length > 0) {
            const ctx = document.getElementById("stock-chart").getContext("2d");

            const stockChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: stockPrices.map(entry => entry.date),
                    datasets: [{
                        label: "Stock Price",
                        data: stockPrices.map(entry => entry.price),
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                        fill: true,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: "category",
                            labels: stockPrices.map(entry => entry.date),
                        },
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });
        } else {
            console.error(`No data found for symbol: ${symbol}`);
        }
    }

    window.updateChart = function () {
        const symbolInput = document.getElementById("stock-symbol");
        const symbol = symbolInput.value.toUpperCase().trim();

        if (symbol !== "") {
            initChart(symbol);
        } else {
            console.error('Invalid symbol');
        }
    };

});


