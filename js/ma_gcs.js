(function($) {
//  Drupal.behaviors.ma_mouseout = {
//    attach : function(context, settings) {
//      $("colorset").mouseup(function (e) {
//        $(this).mouseup(function (e) {
//        if (!$(this).is(e.target) // if the target of the click isn't the container...
//          && $(this).has(e.target).length === 0) // ... nor a descendant of the container
//        {
//          $(this).hide();
//        }
//      }
//    });
//  }

  Drupal.behaviors.ma_gcs = {
    attach : function(context, settings) {
      if ($('.shortcodes', context).length) {
        $('.shortcodes').each(function(index) {
          var myChartType = $(this).data('type');
          var myChartID = $(this).data('chartid');
          var myChartGid = $(this).data('gid');
          var myxTitle = $(this).data('xtitle');
          var myyTitle = $(this).data('ytitle');
          var myLegend = $(this).data('islegend');
          var myDirection = $(this).data('isdirection');
          var myStacked = $(this).data('isstacked');
          var myFilled = $(this).data('isfilled');
          var myCurrency = $(this).data('iscurrency');
          var randomId = $(this).data('id');
          var colorvalue = [];
          var thisColColor;
          console.log(myCurrency);
          for (var i = 1; i < 9; i++) {
            colorvalue.push($(this).data('col' + i));
          }
          var myURL = "https://spreadsheets.google.com/feeds/list/" + myChartID + "/" + myChartGid + "/public/values?&alt=json";
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
            }
            //C3 Formatting
            var datap = data.feed.entry;
            var datacategories = Object.keys(datap[0]);
            var emptyarray = [];
            var dataarray = [];
            var labelobject = {};

            for (var i = 0; i < datacategories.length; i++)
            {
              emptyarray.push(datacategories[i]);
              for (var j = 0; j < datap.length; j++)
              {
                if (datap[j].hasOwnProperty(datacategories[i]))
                {
                  emptyarray.push(datap[j][datacategories[i]]);
                }
              }
              dataarray.push(emptyarray);
              if (emptyarray.length > 1)
              {
                labelobject[emptyarray[0]] = emptyarray[emptyarray.length - 1];
              }
              else {
                labelobject[emptyarray[0]] = emptyarray[emptyarray.length];
              }
              emptyarray = [];
            }
            var rotated = false;
            if (myDirection === 'Horizontal')
            {
              rotated = true;
            }
            if (myStacked === 'False') {
              datacategories = [];
            }
            var linetype = 'line';
            if (myFilled === 'True') {
              linetype = 'area';
            }
            switch (myChartType) {
              case 'piechart' :
                var chart = c3.generate({
                  bindto: document.getElementById(randomId),
                  data: {
                    x: 'x',
                    columns: dataarray,
                    names: labelobject,
                    type: 'pie'
                  },
                  color: {
                    pattern: colorvalue
                  },
                  legend: {
                    position: myLegend
                  }
                });
                break;
              case 'linechart' :
                var chart = c3.generate({
                  bindto: document.getElementById(randomId),
                  data: {
                    x: 'x',
                    columns: dataarray,
                    names: labelobject,
                    type: linetype,
                    groups: [datacategories]
                  },
                  axis: {
                    x: {
                      label: {
                        text: myxTitle,
                        position: 'outer-center'
                      }
                    },
                    y: {
                      label: {
                        text: myyTitle,
                        position: 'outer-middle'
                      },
                      tick: {
                        format: d3.format("$,f")
                      },
                    },
                    rotated: rotated
                  },
                  color: {
                    pattern: colorvalue
                  },
                  legend: {
                    position: myLegend
                  }
                });
                break;
              case 'barchart' :
                var chart = c3.generate({
                  bindto: document.getElementById(randomId),
                  data: {
                    x: 'x',
                    columns: dataarray,
                    names: labelobject,
                    type: 'bar',
                    groups: [datacategories]
                  },
                  axis: {
                    x: {
                      type: 'category',
                      label: {
                        text: myxTitle,
                        position: 'outer-center'
                      }
                    },
                    y: {
                      label: {
                        text: myyTitle,
                        position: 'outer-middle'
                      },
                    },
                    rotated: rotated
                  },
                  color: {
                    pattern: colorvalue
                  },
                  legend: {
                    position: myLegend
                  }
                });
                break;
              case 'tablechart' :
                break;
            }
          });
        }); // each function
      } // if context.length
    } // attach:function
  } // Drupal.behavior
})(jQuery);
