angular.module('app').controller('mvMainCtrl', function ($scope, $interval, $http) {
    $scope.lastBtcPrice =0;
    $scope.lastEthPrice =0;
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

    
});