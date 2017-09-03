angular.module('app').controller('mvMainCtrl', function ($scope, $interval, $http) {
    $scope.lastBtcPrice = 0;
    $scope.lastEthPrice = 0;
    $scope.labels = ["", "", "", "", ""];
    $scope.series = ['BTC', 'ETH'];
    $scope.data = [
        [65, 59, 80, 81, 56],
        [28, 48, 40, 19, 86]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{
        yAxisID: 'y-axis-1'
    }, {
        yAxisID: 'y-axis-2'
    }];
    $scope.options = {
        scales: {
            yAxes: [{
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
            },
            {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
            }
            ]
        }
    };

    $scope.myVar = "Hello Angular";
    $scope.bitcoinsValues = [{
        time: "2017-09-08 12:30:44",
        usd: 49,
        eur: 60
    },
    {
        time: "2017-09-08 12:30:34",
        usd: 39,
        eur: 55
    },
    {
        time: "2017-09-08 12:30:24",
        usd: 39.5,
        eur: 55.2
    },
    {
        time: "2017-09-08 12:30:14",
        usd: 39.03,
        eur: 55.02
    },
    {
        time: "2017-09-08 12:30:04",
        usd: 33,
        eur: 52
    }
    ];

    $scope.ethValues = [{
        time: "2017-09-08 12:30:44",
        usd: 49,
        eur: 60,
        btc: 0.00012
    },
    {
        time: "2017-09-08 12:30:34",
        usd: 39,
        eur: 55,
        btc: 0.00011
    },
    {
        time: "2017-09-08 12:30:24",
        usd: 39.5,
        eur: 55.2,
        btc: 0.00010
    },
    {
        time: "2017-09-08 12:30:14",
        usd: 39.03,
        eur: 55.02,
        btc: 0.00012
    },
    {
        time: "2017-09-08 12:30:04",
        usd: 33,
        eur: 52,
        btc: 0.00012
    }
    ];
    $scope.bitPoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];

    function updateChartBitcoins() {
        $scope.data[0] = $scope.bitcoinsValues.map(function (bitCoin) {

            return bitCoin.usd;
        });
    };

    function updateChartETH() {
        $scope.data[1] = $scope.ethValues.map(function (bitCoin) {

            return bitCoin.usd;
        });
    };

    function generateBitcoinsData(data) {
        $scope.bitcoinsValues = data.map(function (bitCoin) {
            return {
                time: bitCoin.time * 1000,
                usd: bitCoin.close,
                eur: 0
            }
        }).reverse();
        $scope.lastBtcPrice = $scope.bitcoinsValues[0].usd;
        updateChartBitcoins();
    };

    function generateETHData(data) {
        $scope.ethValues = data.map(function (bitCoin) {
            return {
                time: bitCoin.time * 1000,
                usd: bitCoin.close,
                eur: 0,
                btc: 0
            }
        }).reverse();
        $scope.lastEthPrice = $scope.ethValues[0].usd;
        updateChartETH();
    };

    function updateFootertext() {
        var currentdate = new Date();
        $scope.myVar = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() +
            "/" + currentdate.getFullYear() + " @ " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" + currentdate.getSeconds();
    };

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].time === nameKey) {
                return myArray[i];
            }
        }
    }

    function getBitcoinEUR() {
        $http.get('https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=EUR&limit=5&aggregate=1')
            .then(function successCallback(response) {
                var bitEUR = response.data.Data.map(function (bitCoin) {
                    return {
                        time: bitCoin.time * 1000,
                        eur: bitCoin.close
                    }
                }).reverse();
                $scope.bitcoinsValues.forEach(function (e) {
                    var resultObject = search(e.time, bitEUR);
                    if (resultObject != undefined)
                        e.eur = resultObject.eur;
                });

                debugger;

            }, function errorCallback(response) {
                debugger;
            });
    };

    function getETHEUR() {
        $http.get('https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=EUR&limit=5&aggregate=1')
            .then(function successCallback(response) {
                var ethEUR = response.data.Data.map(function (eth) {
                    return {
                        time: eth.time * 1000,
                        eur: eth.close
                    }
                }).reverse();
                $scope.ethValues.forEach(function (e) {
                    var resultObject = search(e.time, ethEUR);
                    if (resultObject != undefined)
                        e.eur = resultObject.eur;
                });

                debugger;

            }, function errorCallback(response) {
                debugger;
            });
    };

    function loadBitCoinData() {
        $http.get('https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=5&aggregate=1')
            .then(function successCallback(response) {
                generateBitcoinsData(response.data.Data);
                getBitcoinEUR();
            }, function errorCallback(response) {
                debugger;
            });
    };

    function loadETHData() {
        $http.get('https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=5&aggregate=1')
            .then(function successCallback(response) {
                generateETHData(response.data.Data);
                getETHEUR();
            }, function errorCallback(response) {
                debugger;
            });
    };
    $scope.getData = function () {
        updateFootertext();
        loadBitCoinData();
        loadETHData();
    };

    $scope.getData();
    $interval(function () {
        $scope.getData();
    }, 10000);

});