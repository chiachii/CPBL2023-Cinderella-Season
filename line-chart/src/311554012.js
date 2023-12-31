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
            .attr('stroke-width', 1.5)
            .attr('d', d => d3.line()  // Invoke d3.line() here
                .x(d => 15 + xScale(d.session))
                .y(d => +d.value == 0 ? yScale(0) : yScale(Math.abs(6 - +d.value))) // Adjust the y value accordingly
                (d[1])
            );
};