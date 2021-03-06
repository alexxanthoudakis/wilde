(function($){

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      
      var annotations = {
        '1895-04-03': ['Libel trial', 'The beginning of the criminal libel trial, initiated by Oscar Wilde against the Marquis of Queensbury.'],
        '1895-04-26': ['First criminal trial', 'The beginning of the first criminal trial against Oscar Wilde and Alfred Taylor for "gross indecency."'],
        '1895-05-23': ['Second criminal trial', 'The beginning of the second criminal trial against Oscar Wilde for "gross indecency."'],
        '1895-05-25': ['Oscar Wilde Convicted', 'Oscar Wilde convicted of "gross indecency" and given a two-year prison sentence with hard labour.']
      };
      
      function drawChart() {
        var $dateItems = $("li[data-date]");
        if($dateItems.length === 0) {
          return;
        }
        var languages = $("#languages").data('languages').toLowerCase().split(',');
        
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        //data.addColumn('number', 'Article Count');
        languages.forEach(function(language) {
          data.addColumn('number', language);
        });
        
        data.addColumn({type: 'string', role: 'annotation'});
        data.addColumn({type: 'string', role: 'annotationText'});
        
        $dateItems.each(function(index,$item) {
          var $this = $(this);
          var date = $(this).data('date');
          var item = [];
          item.push(date);
          // item.push($this.data('count'));
          languages.forEach(function(language){
            item.push($this.data(language));
          });
          
          if(date in annotations) {
            item.push(annotations[date][0])
            item.push(annotations[date][1]);        
          } else {
            item.push(null);
            item.push(null);
          }
          data.addRow(item);
        });
        
        var options = {
          title: 'Articles by Day',
          curveType: 'function',
          legend: { position: 'bottom' }
        };
        
        var chart = new google.visualization.LineChart(document.getElementById('chart'));        
        chart.draw(data, options);
      }

})(jQuery);