(function($) {
  Drupal.behaviors.ma_gcs = {
    attach : function(context, settings) {
      if ($('.shortcodes', context).length) {
        $('.shortcodes').each(function(index) {
          var myChartType = $(this).data('type');
          var myChartID = $(this).data('chartid');
          var myChartGid = $(this).data('gid');
          var myTitle = $(this).data('title');
          var mySubTitle = $(this).data('subtitle');
          var myLegal1 = $(this).data('legal1');
          var myLegal2 = $(this).data('legal2');
          var myStacked = $(this).data('isstacked');
          var randomId = $(this).data('id');
          var colorvalue = [];
          var thisColColor;
          for (var i = 1; i < 9; i++) {
            colorvalue.push($(this).data('col' + i));
          }
          var myURL = "https://spreadsheets.google.com/feeds/list/" + myChartID + "/od6/public/values?gid=" + myChartGid + "&alt=json"; 
          console.log(myURL);
          $.getJSON(myURL, function (data) {
            for (var i = 0; i < data.feed.entry.length; i++) {
              for (var key in data.feed.entry[i]) {
                if (data.feed.entry[i].hasOwnProperty(key) && key.substr(0,4) === 'gsx$') {
                // copy the value in the key up a level and delete the original key
                  data.feed.entry[i][key.substr(4)] = data.feed.entry[i][key].$t;
                  delete data.feed.entry[i][key];
                }
                else
                {
                  delete data.feed.entry[i][key];
                }
              }
              var datap = data.feed.entry;
              switch (myChartType) {
                case 'piechart' :
                  var chart = c3.generate({
                    bindto: document.getElementById(randomId),
                    data: {
                      json: datap,
                      type: 'pie'
                    },
                    color: {
                      pattern: colorvalue
                    },
                    legend: {
                      position: 'bottom'
                    }
                  });
                  break;
                case 'columnchart' :
                  var chart = c3.generate({
                    bindto: document.getElementById(randomId),
                    data: {
                      json: datap,
                      type: 'step'
                    },
                    color: {
                      pattern: colorvalue
                    },
                    legend: {
                      position: 'bottom'
                    }
                  });
                  break;
                case 'barchart' :
                  var chart = c3.generate({
                    bindto: document.getElementById(randomId),
                    data: {
                      json: datap,
                      type: 'bar'
                    },
                    color: {
                      pattern: colorvalue
                    },
                    legend: {
                      position: 'bottom'
                    }
                  });
                  break;
                case 'linechart' :
                  break;
                case 'tablechart' :
                  break;
              }
            }
          });
        }); // each function
      } // if context.length
    } // attach:function
  } // Drupal.behavior
})(jQuery);