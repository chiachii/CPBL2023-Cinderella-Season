// Example with random data
for (var i = 1; i <= 120; i++) {
    // Create a column for each game
    var column = createColumn();

    // Uptrend chart (BA)
    var value = Math.random()*0.5;
    var pass = false
    for (var k = 10; k >= 1; k--) {
        // Define range 
        const range = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45];
        var contr = Math.max(value-range[k-1], 0);
        if (contr > 0 || pass) {
            createElement(column, k, 'BA');
            pass = true
        } else {
            createElement(column, 0, 'BA');
        };
    };

    // Downtrend chart (ERA)
    var value = Math.random()*25
    // console.log(value)
    for (var k = 1; k <= 10; k++) {
        // Define range 
        const range = [0, 1, 2, 3, 4, 5, 9, 13, 17, 21];
        var contr = Math.max(value-range[k-1], 0);
        if (contr > 0) {
            createElement(column, k, 'ERA');
        } else {
            createElement(column, 0, 'ERA');
        };
    };
};

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

function createElement(parent, contr, type) {
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

    // Add block into HTML
    parent.appendChild(elem);
};