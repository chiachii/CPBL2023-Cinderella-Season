// Load the dataset
d3.csv('../data/ranking.csv').then(data => {
    // Initial settings
    var seasonSelected = 'A';

    // Render the line-chart initially
    renderLine(data.filter(d => d.season === seasonSelected));

    // Add Event Listener on `.season-selector`: for changing `.seasonSelected`
    d3.select('#season-selector').on('change', function() {
        // Get the selected season value
        seasonSelected = this.value;

        // Remove existing elements according class
        ['g', 'path', 'text'].forEach(item => {
            line_svg.selectAll(item).remove();
        });

        // Render the dot chart for the selected season
        renderLine(data.filter(d => d.season === seasonSelected));
    });
});

// Define the SVG dimensions and margins 
const line_margin = { top: 20, right: 20, bottom: 40, left: 20};
const line_width = 1400 - line_margin.left - line_margin.right;
const line_height = 300 - line_margin.top - line_margin.bottom;

// Create the SVG container
const line_svg = d3.select('#line')
    .append('svg')
    .attr('width', 1500)
    .attr('height', 300)
    .append('g')
    .attr('transform', `translate(${line_margin.left}, ${line_margin.top})`);

// Main Function
const renderLine = (data) => {
    // Group the data: I want to draw one line per group
    const sumstat = d3.group(data, d => d.team);

    // Add X axis
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => Math.max(d.session)))
        .range([0, line_width]);
    line_svg.append('g')
        .attr('transform', `translate(15, ${line_height})`)
        .call(d3.axisBottom(xScale).ticks(d3.group(data, d => d.session).size/10));

    // Add Y axis
    const yScale = d3.scaleLinear()
        .domain([0, 5])
        .range([line_height, 0]);
    const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => d == 0 ? 0 : Math.abs(6-d));
    line_svg.append('g')
        .attr('transform', `translate(15, 0)`)
        .call(yAxis);

    // Add axis name at left and bottom sides
    line_svg.selectAll('.y-axis-label') // Left side
        .data(['Ranking'])
        .enter().append('text')
        .text(d => d)
        .attr('font-size', 12)
        .attr('text-anchor', 'end')
        .attr('transform', `translate(-10, ${(line_height-40)/2}) rotate(-90)`);
    line_svg.selectAll('.x-axis-label') // Bottom side
        .data(['Session'])
        .enter().append('text')
        .text(d => d)
        .attr('font-size', 12)
        .attr('text-anchor', 'end')
        .attr('transform', `translate(${(line_width+65)/2}, ${line_height+35})`);
    
    // colorScale
    const teamOrder = ['中信兄弟', '樂天桃猿', '統一獅', '味全龍', '富邦悍將'];
    const colorScale = d3.scaleOrdinal()
        .domain(teamOrder)
        .range(['#FFD306','#930000','#FF9224','#FF7575','#0066CC']);
    
    // Draw the background-line
    ticksInner = [1, 2, 3, 4, 5];
    ticksInner.forEach(i => {
        line_svg.selectAll('.line')
            .data(sumstat)
            .join('path')
                .attr('stroke', '#BEBEBE')
                .attr('stroke-width', 0.2)
                .attr('d', d => d3.line()
                    .x(d => 15 + xScale(d.session))
                    .y(yScale(i))
                    (d[1])
                );
    });

    // Draw the line
    line_svg.selectAll('.line')
        .data(sumstat)
        .join('path')
            .attr('fill', 'none')
            .attr('stroke', d => colorScale(d[0]))
            .attr('stroke-width', 2)
            .attr('d', d => d3.line()  // Invoke d3.line() here
                .x(d => 15 + xScale(d.session))
                .y(d => +d.value == 0 ? yScale(0) : yScale(Math.abs(6 - +d.value))) // Adjust the y value accordingly
                (d[1])
            );

    // Create a vertical line for tooltip
    const verticalLine = line_svg.append('line')
        .attr('class', 'vertical-line')
        .style('stroke', 'green')
        .style('stroke-dasharray', '3, 3')
        .attr('stroke-width', 1)
        .style('pointer-events', 'none')
        .attr('y1', 0)
        .attr('y2', line_height);
    
    // Show the date based on mouse event
    const infoElement = line_svg.append('text')
        .attr('class', 'info-text')
        .attr('x', 10)
        .attr('y', 10)
        .style('pointer-events', 'none');
    // Show the ranking based on mouse event
    const rankLabel = d3.select('#rank-label')

    // Add tooltip events
    line_svg.on('mouseover', () => {
            verticalLine.style('display', null);
            infoElement.style('display', null);
            rankLabel.style('display', null);
        })
        .on('mouseout', () => {
            verticalLine.style('display', 'none');
            infoElement.style('display', 'none');
            rankLabel.html(`
                <span> <i class="fa fa-square" style="color:#FFD306"></i> 中信兄弟 </span>
                <span> <i class="fa fa-square" style="color:#930000"></i> 樂天桃猿 </span>
                <span> <i class="fa fa-square" style="color:#FF9224"></i> 統一獅 </span>
                <span> <i class="fa fa-square" style="color:#FF7575"></i> 味全龍 </span>
                <span> <i class="fa fa-square" style="color:#0066CC"></i> 富邦悍將 </span>
            `);
        })
        .on('mousemove', mousemove);
    
    function mousemove(event) {
        const mouseX = d3.pointer(event)[0] - 15; // Adjust for translation
        verticalLine.attr('transform', `translate(${mouseX+15}, 0)`);

        // Show the corresponding session value
        const sessionValue = Math.round(xScale.invert(mouseX));
        infoElement.text(`${sessionValue}`)
                    .style('fill', 'green')
                    .style('font-size', '12px')
                    .attr('transform', `translate(${mouseX}, ${line_height+15})`);

        // Display values for the corresponding X coordinate in the console
        const dataForX = data.filter(d => +d.session === sessionValue).sort((a, b) => +a.value - +b.value);
        rankLabel.html(`
            <strong style="color: #000000"> 排名： </strong>
            <strong style="color:${colorScale(dataForX[0]['team'])}"> ${dataForX[0]['team']} </strong> > 
            <strong style="color:${colorScale(dataForX[1]['team'])}"> ${dataForX[1]['team']} </strong> > 
            <strong style="color:${colorScale(dataForX[2]['team'])}"> ${dataForX[2]['team']} </strong> > 
            <strong style="color:${colorScale(dataForX[3]['team'])}"> ${dataForX[3]['team']} </strong> > 
            <strong style="color:${colorScale(dataForX[4]['team'])}"> ${dataForX[4]['team']} </strong> 
        `);
    };
};