// Code for generating a Chart.js line chart
/*
    The script file will show how to make a scatter plot
    Data from: My collection during my research project
    Mean from: NASA (include the link)
*/

async function getData(location) {
    const response = await fetch(location);  // remember .. means to move up a file
    const data = await response.text();
    console.log(data);

    const xDay = [];      // x-axis labels = days
    const yAlgae = [];         // y-axis labels = concentration of Algae for different conditions
    const yAlgGly = [];    // y-axis = concentration of algae cells for the algae and glyphosate condition
    const yAlgDwd = [];    // y-axis = concentration of algae cells for the algae and duckweed condition
    const yAlgGlyDwd = [];  // y-axis = concentration of algae cells for the algae, duckweed, and glyphosate condition

    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(',');                 // split each row into columns using commas
        const xNumDay = parseFloat(columns[0]);         // assigning the day to each set of data
        xDay.push(xNumDay);                             // push day value into array xDay

        const yAconc = parseFloat(columns[1]);   // convert global value from a string to a float
        yAlgae.push(yAconc);                     // push the concentration data value to the array 
       
        const yAGconc = parseFloat(columns[2]);   // convert global value from a string to a float
        yAlgGly.push(yAGconc);                  // push the concentration data value to the array 

        const yADconc = parseFloat(columns[3]);   // convert global value from a string to a float
        yAlgDwd.push(yADconc);                  // push the concentration data value to the array 

        const yAGDconc = parseFloat(columns[4]);   // convert global value from a string to a float
        yAlgGlyDwd.push(yAGDconc);                  // push the concentration data value to the array 

        console.log(xNumDay, yAconc, yAGconc, yADconc, yAGDconc);
    });

    return {xDay, yAlgae, yAlgGly, yAlgDwd, yAlgGlyDwd};        // Use {} to return multiple values of the object
};

async function createChart(location) {
    const data = await getData(location);       // wait until getData processes the Data
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart

    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDay,        // x-axis labels 
            datasets: [                  
                {
                    label:    `Algae`,     // Dataset label for legend
                    data:     data.yAlgae,     // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      2,   // Data marker border width
                    tension: 0.2
                },
                {
                    label:    `Algae + Glyphosate`,     // Dataset label for legend
                    data:     data.yAlgGly,     // Reference to array of y-values
                    fill:     false,           // Will fill up to the previous data set
                    backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      2,   // Data marker border width
                    tension: 0.2            // Allows us to control the smoothness of the line. 0 = straight line connector
                },
                {
                    label:    'Algae + Duckweed',     // Dataset label for legend
                    data:     data.yAlgDwd,     // Reference to array of y-values
                    fill:     false,           // Will fill o the previous data set
                    backgroundColor:  'rgba(0, 153, 51, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 153, 51, 1)',      // Color for data marker border
                    borderWidth:      2,   // Data marker border width
                    tension: 0.2            // Allows us to control the smoothness of the line. 0 = straight line connector
                },
                {
                    label:    `Algae + Glyphosate + Duckweed`,     // Dataset label for legend
                    data:     data.yAlgGlyDwd,     // Reference to array of y-values
                    fill:     false,           // Will fill o the previous data set
                    backgroundColor:  'rgba(215, 205, 2, 0.2)',    // Color for data marker
                    borderColor:      'rgb(215, 205, 2)',      // Color for data marker border
                    borderWidth:      2,   // Data marker border width
                    tension: 0.2            // Allows us to control the smoothness of the line. 0 = straight line connector
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Day of Experiment',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                        color: '#004b36',
                    },
                    ticks: {                      // x-axis tick mark properties
                        callback: function(index) {
                            const labels = [1,3,5];
                            return labels[index];

                        },
                        maxTicksLimit: 3,
                        color: '#004b36',
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: 'rgba(10, 140, 95, 0.52)'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Cells per mL (in 10,000s)`,     // y-axis title
                        font: {
                            size: 14
                        },
                        color: '#004b36',
                    },
                    ticks: {               
                        maxTicksLimit: 4,        // Limit the number of tick marks
                        font: {
                            size: 12
                        },
                        color: '#004b36',
                    },
                    grid: {                       // y-axis gridlines
                        color: 'rgba(10, 140, 95, 0.52)'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Concentration of algae (cells per mL) in 10,000s of each condition',
                    font: {
                        size: 24,
                    },
                    color: '#07705b',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 18,
                        },
                        color: '#166c5b',
                    },
                }
            }
        }       
    });
    

    }

    createChart('data/researchData.csv');