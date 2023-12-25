// Load the dataset
d3.csv('../data/schedule.csv').then(data => {
    // Initial settings
    let sessionMin = 1;
    let sessionMax = 300;
    const range = document.querySelector('.range-selected');
    const rangeInput = document.querySelectorAll('.range-input input');

    // Render the matrix initially
    renderMatrix(data.filter(d => d.session >= sessionMin && d.session <= sessionMax));
    
    // Add Event Listener on `.range-input`: for changing slider style
    rangeInput.forEach((input) => {
        input.addEventListener('input', (event) => {
            let minRange = parseInt(rangeInput[0].value);
            let maxRange = parseInt(rangeInput[1].value);
            if (maxRange - minRange < 0) {     
                if (e.target.className === 'min') {
                    rangeInput[0].value = maxRange;
                } else {
                    rangeInput[1].value = minRange;        
                }
            } else {
                range.style.left = (minRange / rangeInput[0].max) * 100 + '%';
                range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + '%';
            }
        });
    });

    // Add Event Listener on `.range-input`: for changing `.range-value`
    d3.select('#session-min-slider').on('input', function() {
        sessionMin = +this.value;
        if (sessionMin <= sessionMax) {
            d3.select('#slider-min-value').text(sessionMin);
        };
        ['g', 'rect', 'image', 'text'].forEach(item => {
            matrix_svg.selectAll(item).remove();
        });
        renderMatrix(data.filter(d => d.session >= sessionMin && d.session <= sessionMax));
    });
    d3.select('#session-max-slider').on('input', function() {
        sessionMax = +this.value;
        if (sessionMin <= sessionMax) {
            d3.select('#slider-max-value').text(sessionMax);
        };
        ['g', 'rect', 'image', 'text'].forEach(item => {
            matrix_svg.selectAll(item).remove();
        });
        renderMatrix(data.filter(d => d.session >= sessionMin && d.session <= sessionMax));
    });
});

// Define the SVG dimensions and margins 
const matrix_margin = { top: 50, right: 150, bottom: 80, left: 80};
const matrix_width = 600 - matrix_margin.left - matrix_margin.right;
const matrix_height = 500 - matrix_margin.top - matrix_margin.bottom;

// Create the SVG container
const matrix_svg = d3.select('#matrix')
    .append('svg')
    .attr('width', 600)
    .attr('height', 500)
    .append('g')
    .attr('transform', `translate(${matrix_margin.left}, ${matrix_margin.top})`);

// Main Function
const renderMatrix = (data) => {
    // Data preprocessing
    teamOrder = ['中信兄弟', '樂天桃猿', '統一獅', '味全龍', '富邦悍將'];
    matrixData = [];
    data.forEach((game) => {
        // Skip if the game result is 'Draw'
        if (game.team_win === 'Draw'){
            return;
        }

        // Summary of the record of input data
        const result = game.team_win === game.team_home ? 'home' : 'away';
        const existingRecord = matrixData.find(record => record.x === game.team_home && record.y === game.team_away);
        if (existingRecord) {
            existingRecord[result]++;
        } else {
            const newRecord = {
                x: game.team_home,
                y: game.team_away,
                home: 0,
                away: 0,
            };
            newRecord[result]++;
            matrixData.push(newRecord);
        }
    });

    // Add same team for add logo & win rate at diagonal
    teamOrder.forEach(team => {
        home_total = data.filter(d => team === d.team_home).length
        home_win = data.filter(d => team === d.team_home && team === d.team_win).length
        away_total = data.filter(d => team === d.team_away).length
        away_win = data.filter(d => team === d.team_away && team === d.team_win).length
        home_draw = data.filter(d => team === d.team_home && d.team_win === 'Draw').length
        away_draw = data.filter(d => team === d.team_away && d.team_win === 'Draw').length
        const newRecord = {
            x: team,
            y: team,
            home_win: +(home_win/home_total).toFixed(2),
            away_win: +(away_win/away_total).toFixed(2),
            home_draw: +(home_draw/home_total).toFixed(2),
            away_draw: +(away_draw/away_total).toFixed(2)
        };
        matrixData.push(newRecord);
    });
    console.log(matrixData);

    // Create scales for X and Y axes
    const xScale = d3.scalePoint()
        .domain(teamOrder)
        .range([0, matrix_width]);

    const yScale = d3.scalePoint()
        .domain(teamOrder)
        .range([0, matrix_height]);

    // Create the 'g' elements for each cell of the grid
    const grid = matrix_svg.selectAll('.grid')
            .data(matrixData)
            .enter()
            .append('g')
            .attr('class', 'grid')
            .attr('transform', d => `translate(${xScale(d.x)}, ${yScale(d.y)})`);
    
    // Plot the grid 
    teamOrder.forEach(t1 => {
        teamOrder.forEach(t2 => {
            matrix_svg.append('rect')
                .attr('width', matrix_width/4)
                .attr('height', matrix_height/4)
                .attr('x', -matrix_width/8)
                .attr('y', -matrix_height/8)
                .style('fill', 'none')
                .style('stroke', 'lightgray')
                .style('stroke-width', '1px')
                .attr('transform', d => `translate(${xScale(t1)}, ${yScale(t2)})`);
        });
    });
    
    // Tooltips
    // Create and initialize the tooltip
    const tooltip = d3.select('#tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '10px')
        .style('display', 'none')
        .style('font-size', '0.85rem');

    // Diagonal: add team logo
    const translate = {'中信兄弟': 'brothers', '樂天桃猿': 'rakuten', '統一獅': 'unilions', '味全龍': 'dragons', '富邦悍將': 'fubon'}
        grid.filter(d => teamOrder.indexOf(d.y) === teamOrder.indexOf(d.x))
            .append('image')
                .attr('xlink:href', d => `../images/${translate[d.x]}.png`)
                .attr('x', -matrix_width/8 + 1.5)
                .attr('y', -matrix_height/8 + 1.5)
                .attr('width', 90)
                .attr('height', 90)
            .on('mouseover', (event, d) => {
                // Show the tooltip
                tooltip.style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 25) + 'px')
                    .style('display', 'block')
                    .html(`
                        <div style="text-align: center;">
                            <strong style="color:${'#1b53c0'};"> ${d.x} </strong>
                        </div>
                        <hr />
                        <div id="home-chart" style="display: inline-flex; flex-wrap: wrap;"></div>
                        <div id="away-chart" style="display: inline-flex; flex-wrap: wrap;"></div>
                    `);
                // Create the bar-chart for home_game and away_game 
                generateBarChart('#home-chart', d.home_win, d.home_draw, 1 - d.home_win - d.home_draw, 'Home Game');
                generateBarChart('#away-chart', d.away_win, d.away_draw, 1 - d.away_win - d.away_draw, 'Away Game');
            })
            .on('mouseout', (event, d) => {
                // Hide the tooltip
                tooltip.style('display', 'none');
            });
        
    // colorScale: {Home: cyan/drak_gray; Away: orange/light_gray}
    const colorScale = (is_home, home, away) => {
        if (is_home) {
            if (home <= away) {
                return '#9D9D9D';
            } else {
                return '#6FB7B7';
            };
        } else {
            if (home >= away) {
                return '#D0D0D0';
            } else {
                return '#FFBB77';
            };
        };
    };
    // Top-Right: add circles (home records)
        grid.filter(d => teamOrder.indexOf(d.y) < teamOrder.indexOf(d.x))
            .append('circle')
            .attr('r', 40)
            .style('fill', d => colorScale(true, d.home, d.away));

        grid.filter(d => teamOrder.indexOf(d.y) < teamOrder.indexOf(d.x))
            .append('g')
            .each(function(d) {
                const group = d3.select(this);
                
                // Add circles
                group.append('circle')
                    .attr('r', function(d) {
                        return (d.away / (d.home + d.away)) * 35 + (d.away > 0 ? 5 : 0);
                    })
                    .style('fill', d => colorScale(false, d.home, d.away));

                // Add text to show the records
                group.append('text')
                    .text(`${d.home} : ${d.away}`)
                    .attr('text-anchor', 'middle')
                    .attr('font-weight', 'bold')
                    .attr('dy', 3)
                    .style('font-size', 12)
                    .style('fill', '#000000'); 
            });

    // Bottom-Left: add circles (away records)
        grid.filter(d => teamOrder.indexOf(d.y) > teamOrder.indexOf(d.x))
            .append('circle')
            .attr('r', 40)
            .style('fill', d => colorScale(false, d.home, d.away))
            .style('opacity', 1);

        grid.filter(d => teamOrder.indexOf(d.y) > teamOrder.indexOf(d.x))
            .append('g')
            .each(function(d) {
                const group = d3.select(this);
                
                // Add circles
                group.append('circle')
                    .attr('r', function(d) {
                        return (d.home / (d.home + d.away)) * 35 + (d.home > 0 ? 5 : 0);
                    })
                    .style('fill', d => colorScale(true, d.home, d.away));

                // Add text to show the records
                group.append('text')
                    .text(`${d.home} : ${d.away}`)
                    .attr('text-anchor', 'middle')
                    .attr('font-weight', 'bold')
                    .attr('dy', 3)
                    .style('font-size', 12)
                    .style('fill', '#000000'); 
            });

    // Add axis label
    matrix_svg.selectAll('.y-axis-label') // Left side
        .data(['Away Team'])
        .enter().append('text')
        .text(d => d)
        .attr('font-size', 20)
        .attr('font-weight', 'bold')
        .attr('fill', '#FF9224')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(-60, ${(matrix_height)/2}) rotate(-90)`)
        .attr('class', 'axis-label');
    matrix_svg.selectAll('.x-axis-label') // Top side
        .data(['Home Team'])
        .enter().append('text')
        .text(d => d)
        .attr('font-size', 20)
        .attr('font-weight', 'bold')
        .attr('fill', '#6FB7B7')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${(matrix_width)/2}, 440)`)
        .attr('class', 'axis-label');
};

// Function used to generate bar chart
function generateBarChart(selector, win, draw, lose, label) {
    const width = 100;
    const height = 80;

    const svg = d3.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height + 36);

    const data = [win, draw, lose];

    const barWidth = width / data.length;
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * barWidth)
        .attr('y', d => height - d * height + 25)
        .attr('width', barWidth * 0.9)
        .attr('height', d => d * height)
        .attr('fill', (d, i) => {
            if (label === 'Home Game') {
                return ['#6FB7B7', '#9D9D9D', '#408080'][i]
            } else {
                return ['#FFBB77', '#D0D0D0', '#e88707'][i]
            };
        });

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => i * barWidth + barWidth / 2)
        .attr('y', d => height - d * height + 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .text(d => `${(d*100).toFixed(0)}%`);

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 8)
        .attr('text-anchor', 'middle')
        .attr('fill', label === 'Home Game' ? '#35b8ad' : '#db5046')
        .attr('font-weight', 'bold')
        .attr('font-size', 11)
        .text(label);
    
    svg.selectAll('x-axis-label')
        .data(['Win', 'Draw', 'Lose'])
        .enter()
        .append('text')
        .attr('font-size', 11)
        .attr('x', (d, i) => i * barWidth + 15)
        .attr('y', height+35)
        .attr('text-anchor', 'middle')
        .text(d => d);
};