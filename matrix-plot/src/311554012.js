// Load the dataset
d3.csv('../data/schedule.csv').then(data => {
    // Initialization
    let session = 300
    console.log(data);
    render_matrix(data.filter(d => d.session <= session));
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
const render_matrix = (data) => {
    // Data preprocessing
    teamOrder = ['中信兄弟', '樂天桃猿', '統一獅', '味全龍', '富邦悍將']
    matrixData = [];
    data.forEach((game) => {
        // Skip if the game result is 'Draw'
        if (game.team_win === 'Draw'){
            return;
        }

        // Summary of the record of input data
        const result = game.team_win === game.team_home ? "home" : "away";
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

    // Add same team for add logo at diagonal
    teamOrder.forEach(team => {
        const newRecord = {
            x: team,
            y: team,
            home: 0,
            away: 0,
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

        grid.append('rect')
            .attr('width', matrix_width/4)
            .attr('height', matrix_height/4)
            .attr('x', -matrix_width/8)
            .attr('y', -matrix_height/8)
            .style('fill', 'none')
            .style('stroke', 'lightgray')
            .style('stroke-width', '1px');
    
    // Diagonal: add team logo
    const translate = {'中信兄弟': 'brothers', '樂天桃猿': 'rakuten', '統一獅': 'unilions', '味全龍': 'dragons', '富邦悍將': 'fubon'}
        grid.filter(d => teamOrder.indexOf(d.y) === teamOrder.indexOf(d.x))
            .append('image')
            .attr('xlink:href', d => `../images/${translate[d.x]}.png`)
            .attr('x', -matrix_width/8 + 1.5)
            .attr('y', -matrix_height/8 + 1.5)
            .attr('width', 90)
            .attr('height', 90);
        
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
                        return (d.away / (d.home + d.away)) * 30 + (d.away > 0 ? 10 : 0);
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
                        return (d.home / (d.home + d.away)) * 30 + (d.home > 0 ? 10 : 0);
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

    // Tooltips
};