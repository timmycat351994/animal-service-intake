var app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $http.get('/animals').success(function(animals){
      var dataArray = formatDataForView(animals);
        var table = google.visualization.arrayToDataTable(dataArray, false);   
       var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        
        var options = {
            'title' : 'LA Animal Intake Service Data 12/30/13 - 12/31/13',
            chartArea: {width: '50%'},
            hAxis: {
                title: 'Number of Animal Groups in LA',
                minValue: 0
            },
            vAxis: {
                title: 'Groups'
            }
        };
        chart.draw(table, options);
    });
}]);

function formatDataForView(animals) {
    var dataArray = [], keysArray = [];
        keysArray.push('Groups');
        keysArray.push('Number of Groups');
    dataArray.push(keysArray);
    
    animals.forEach(function(value){
        var dataEntry = [];
        for(var prop in value) {
            dataEntry.push(value[prop]);
        }
        dataArray.push(dataEntry);
});
return dataArray;
}














