// Load the dataset
d3.csv('../data/session.csv').then(data => {
    // Initial settings
    teamSelected = '中信兄弟';

    // Render the block dot chart initially
    renderDot(data.filter(d => d.team === teamSelected));

    // Add Event Listener on `.team-selector`: for changing `.teamSelected`
    d3.select('#team-selector').on('change', function() {
        // Get the selected team value
        const teamSelected = this.value;

        // Remove existing elements with class 'elem'
        d3.selectAll('.elem').remove();

        // Render the dot chart for the selected team
        renderDot(data.filter(d => d.team === teamSelected));
    });
});

// Main Function
const renderDot = (data) => {
    // Draw a block dot chart
    data.forEach((d, i) => {
        // Create a column for each game
        var column = createColumn();
    
        // Uptrend chart (BA)
        var value = +d.BA;
        var pass = false
        for (var k = 10; k >= 1; k--) {
            // Define range 
            const range = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45];
            var contr = Math.max(value-range[k-1], 0);
            if (contr > 0 || pass) {
                createElement(d, column, k, 'BA');
                pass = true
            } else {
                createElement(d, column, 0, 'BA');
            };
        };
    
        // Downtrend chart (ERA)
        var value = +d.ERA
        // console.log(value)
        for (var k = 1; k <= 10; k++) {
            // Define range 
            const range = [0, 1, 2, 3, 4, 5, 9, 13, 17, 21];
            var contr = Math.max(value-range[k-1], 0);
            if (contr > 0) {
                createElement(d, column, k, 'ERA');
            } else {
                createElement(d, column, 0, 'ERA');
            };
        };
        
        // Draw X-axis
        createAxis(column, i+1, 'x-axis')
    });
};

// Functions: for building a block dot chart
function createColumn() {
    // Connet with HTML
    var parent = document.getElementById('parent');

    // Create a column
    var column = document.createElement('div');
    column.className = 'column';
    parent.appendChild(column);

    // Create a block
    var dot = document.createElement('div');
    dot.className = 'dot';

    // Add block into column
    column.appendChild(dot);  
    return column;
};

function createElement(data, parent, contr, type) {
    // Define the colorScale
    if (type === 'BA') {
        var colorScale = [
            '#F0F0F0', 
            '#c6e48b', '#c6e48b', '#c6e48b', '#c6e48b', '#c6e48b', 
            '#7bc96f', 
            '#239a3b', '#239a3b', 
            '#0072E3', '#0072E3', 
            '#000093', '#000093'
        ];
    };
    if (type === 'ERA') {
        var colorScale = [
            '#F0F0F0', 
            '#FFED97', '#FFED97', '#FFE66F', '#FFE153', 
            '#FFA042', '#FF9224', '#FF8000', 
            '#D94600', '#BB3D00', '#642100'
        ];
    };

    // Create a block
    var elem = document.createElement('div');
    elem.className = 'elem';
    elem.style.background = colorScale[contr];

    // Add event listener for showing/hiding tooltip
    elem.addEventListener('mouseenter', function() {
        showTooltip(data, elem);
    });

    elem.addEventListener('mouseleave', function() {
        hideTooltip(elem);
    });

    // Add block into HTML
    parent.appendChild(elem);
};

// Function to show tooltip
function showTooltip(data, elem) {
    // Create and initialize the tooltip
    const tooltip = d3.select('#tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '10px')
        .style('display', 'none')
        .style('font-size', '0.85rem');

    // Show the tooltip
    tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 25) + 'px')
        .style('display', 'block')
        .html(`
            <div style="text-align: center;">
                <strong style="color:${'#1b53c0'};"> ${data.team} </strong>
            </div>
            <hr />
            <strong style="color:${'#3C3C3C'}; font-size:12px"> Session: </strong> ${(+data.session)}
            <br>
            <strong style="color:${'#3C3C3C'}; font-size:12px"> BA: </strong> ${(+data.BA).toFixed(2)}
            <br>
            <strong style="color:${'#3C3C3C'}; font-size:12px"> ERA: </strong> ${(+data.ERA).toFixed(2)}
        `);
};

// Function to hide tooltip
function hideTooltip(elem) {
    const tooltip = d3.select('#tooltip');
    tooltip.style('display', 'none');
};

// Functions: for building X-axis and Y-axis
function createAxis(parent, contr, type) {
    // Create a block
    var elem = document.createElement('span');
    elem.className = 'elem';
    // Set the text content to contr
    elem.textContent = String(contr);
    // Set the font size to 5 and center the text
    elem.style.fontSize = '8px';
    elem.style.display = 'flex';
    elem.style.alignItems = 'center';
    elem.style.justifyContent = 'center';

    // Add block into HTML
    parent.appendChild(elem);
};