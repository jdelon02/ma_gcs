// Load the Visualization API and the chart package.
google.load('visualization', '1', {
	packages : ['corechart', 'table'],
	callback : function() {
		googleChartLoaded = true;
	}
});

(function($) {


  // see MDN for setting custom events: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
//  var resizeTimer;
  //var resizeEnd = new Event('resizeEnd');
  // Create the event.
//  var resizeEnd = document.createEvent('Event');

  // Define that the event name is 'build'.
//  resizeEnd.initEvent('resizeEnd', true, true);

//  $(window).on('resize', function(e) {
//    clearTimeout(resizeTimer);
//    resizeTimer = setTimeout(function() {
//      window.dispatchEvent(resizeEnd);
//    }, 250);
//  });

	Drupal.behaviors.google_charts_shortcodes = {
		attach : function(context, settings) {
			if ($('.shortcodes', context).length) {
				$('.shortcodes').each(function(index) {

					var mySpreadsheet = $(this).data('link');
					var myChartType = $(this).data('type');
					var myTitle = $(this).data('title');
					var mySubTitle = $(this).data('subtitle');
					var myLegal1 = $(this).data('legal1');
					var myLegal2 = $(this).data('legal2');
					var myStacked = $(this).data('isstacked');
console.log('my stacked = ' + myStacked);
					if (mySpreadsheet.toLowerCase().indexOf('gid=') >= 0) {
						myGid = mySpreadsheet.substr(mySpreadsheet.indexOf("gid=") + 4);
						var myString = mySpreadsheet.substr(mySpreadsheet.indexOf("edit"));
						//console.log(myGid);
						//mySpreadsheet.replace(myString,'');
						console.log(myString);
						var myNewString = mySpreadsheet.replace(myString, "");
						//console.log(myNewString);
						mySpreadsheet = myNewString;
						mySpreadsheet += 'gviz/tq';
						if (myGid) {
							mySpreadsheet += '?gid=' + myGid;
						}

					//console.log(mySpreadsheet);

					}

					var myurl = "https://" + mySpreadsheet;
					var randomPie = $(this).data('id');
					var colorvalue = [];
					var thisColColor;
					for (var i = 1; i < 9; i++) {
						colorvalue.push($(this).data('col' + i));
					//	console.log($(this).data('col' + i));
					//	console.log(colorvalue);
						//console.log(colorvalue[i]);
					}
					google.setOnLoadCallback(drawChart);
					function drawChart() {
						var opts = {
							sendMethod : 'auto'
						};
						var query = new google.visualization.Query(myurl, opts);
						query.send(handleQueryResponse);
					}

					function handleQueryResponse(response) {
						if (response.isError()) {
							alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
							return;
						}
						//var data = response.getDataTable();
						var newData = response.getDataTable();

						if(myChartType != 'Table') {

							newData.addColumn({
								type : 'string',
								role : 'style'
							});
							var colCount = newData.getNumberOfColumns();
							var rowCount = newData.getNumberOfRows();
							var colorCount = colorvalue.length;
							for (var i = 0; i < rowCount; i++) {
								newData.setValue(i, colCount - 1, colorvalue[i % colorCount]);
							}
						}
						var pieoptions = {
							colors : colorvalue,
              legend: { position: 'bottom' }
							//  is3D: true
						}

						var baroptions = {
							chartArea : {
								width : '80%' //60%'
							},
              legend: { position: 'bottom' },
              isStacked: myStacked
							// hAxis : {
								// title : 'Total Population',
								// minValue : 0
							// },
							// vAxis : {
								// title : 'City'
							// }
						};
						var lineoptions = {
							legend: { position: 'bottom'}
						}
						var chartoptions = {
							chart: {
								groupWidth : '80%' //70%'
            	},
							bar : {
								groupWidth : '80%' //70%'
							},
							isStacked: myStacked,
							legend: { position: 'bottom' }

						}
						var cssClassNames = {
    				  'headerRow': 'headerRow',
          		'tableRow': 'tableRow',
    					'oddTableRow': 'oddTableRow',
  						'selectedTableRow': 'selectedTableRow',
					    'hoverTableRow': 'hoverTableRow',
					    'headerCell': 'headerCell',
					    'tableCell': 'tableCell',
					    'rowNumberCell': 'rowNumberCell'
			    	}

  					var tableoptions = {
  						width: '100%',
  						height: '100%',
              legend: { position: 'bottom' },
  						'showRowNumber': false,
  						'allowHtml': true,
  						'cssClassNames': cssClassNames
  					}

						switch(myChartType) {
						case 'PieChart':
							var chart = new google.visualization.PieChart(context.getElementById(randomPie));
							chart.draw(newData, pieoptions);
//              $(window).on('resizeEnd', function(){
//                chart.draw(newData, pieoptions);
//              });
							break;
						case 'ColumnChart':
							var chart = new google.visualization.ColumnChart(context.getElementById(randomPie));
							chart.draw(newData, chartoptions);
//              $(window).on('resizeEnd', function(){
//                chart.draw(newData, chartoptions);
//              });
							break;
						case 'BarChart':
							var chart = new google.visualization.BarChart(context.getElementById(randomPie));
							chart.draw(newData, baroptions);
//              $(window).on('resizeEnd', function(){
//                chart.draw(newData, baroptions);
//              });
							break;
						case 'LineChart':
							var chart = new google.visualization.LineChart(context.getElementById(randomPie));
							chart.draw(newData, lineoptions);
//              $(window).on('resizeEnd', function(){
//                chart.draw(newData, lineoptions);
//              });
							break;
						case 'Table':
						  var table = new google.visualization.Table(context.getElementById(randomPie));
  						  console.log(JSON.stringify(newData));
  						  //console.log();
  						  table.draw(newData, tableoptions);
//  			    $(window).on('resizeEnd', function(){
//                  table.draw(newData, tableoptions);
//                });
  						  //$(this).css( "height", "auto" );
  						  thisis = '#' + randomPie;
  						  //console.log(thisis);
  						  $(thisis).css( "height", "auto" );
  						  $('.google-visualization-table').css( "height", "auto" );
  						  $( '<p class="rbfsubtext">' + myLegal2 + '</p>' ).insertAfter( $(context.getElementById(randomPie)) );
						    $( '<p class="rbfsubtext">' + myLegal1 + '</p>' ).insertAfter( $(context.getElementById(randomPie)) );
  						break;
						}
						$( '<h3 class="rbftitle">' + myTitle + '</h3>' ).insertBefore( $(context.getElementById(randomPie)) );
						$( '<h4 class="rbfsubtitle">' + mySubTitle + '</h4>' ).insertBefore( $(context.getElementById(randomPie)) );
						$('text').each(function() {
								$(this).removeAttr( "font-family" );
								$(this).removeAttr( "font-size" );
								$(this).css("font-size","10");

						});
						//$( "text:contains('start')" ).css( "text-decoration", "underline" );
					} //query response
				}); //each function
			} //if context.length
		} //attach:function
	} //Drupal.behavior
})(jQuery);