/*
=========================================================================
javascript for each team bar plot
=========================================================================
*/
//Data preprocessing for Batting
var W_team_bat = [];
var C_team_bat = [];
var L_team_bat = [];
var T_team_bat = [];
var F_team_bat = [];

var W_avg_b = 0;
var L_avg_b = 0;
var C_avg_b = 0;
var T_avg_b = 0;
var F_avg_b = 0;
var batching_columns;
var batting_table_dataset = [];
var bat_w_table_dataset = [];
var bat_c_table_dataset = [];
var bat_l_table_dataset = [];
var bat_t_table_dataset = [];
var bat_f_table_dataset = [];

/*
//AVG或BA(打擊率)	batting average	安打數÷打數
//安打: H(hit)
//打數: AB(at bat)
*/

// sorting function
function sorting_by_BA(a, b) {
    return a.BA - b.BA;
}

// for team bar chart
var player_batting_url = "../dataset/bar-chart/data/player_bat.csv";
d3.csv(player_batting_url).then(data_bat => {
    batching_columns = Object.keys(data_bat[0]);
    data_bat.forEach(d => {
        //Name,Team
        d.H = +d.H;
        d.AB = +d.AB;

        //存取打擊率成績
        var batting_average = (d.H / d.AB);
        if (isNaN(batting_average)) {
            batting_average = 0;
        }
        // 只存取有打數為>0的選手
        if (!isNaN(batting_average) & d.AB > 0) {
            if (d.Team_Name === "味全") {
                W_team_bat.push({ region: d.Team_Name, p_name: d.Name, BA: batting_average });
                W_avg_b = W_avg_b + batting_average;
            }
            else if (d.Team_Name === "統一") {
                T_team_bat.push({ region: d.Team_Name, p_name: d.Name, BA: batting_average });
                T_avg_b = T_avg_b + batting_average;
            }
            else if (d.Team_Name === "樂天") {
                L_team_bat.push({ region: d.Team_Name, p_name: d.Name, BA: batting_average });
                L_avg_b = L_avg_b + batting_average;
            }
            else if (d.Team_Name === "中信") {
                C_team_bat.push({ region: d.Team_Name, p_name: d.Name, BA: batting_average });
                C_avg_b = C_avg_b + batting_average;
            }
            else if (d.Team_Name === "富邦") {
                F_team_bat.push({ region: d.Team_Name, p_name: d.Name, BA: batting_average });
                F_avg_b = F_avg_b + batting_average;
            }
            var temp = [];
            batching_columns.forEach(col => {
                if (col === 'H') {
                    temp.push(d[col]);
                }
                else if (col === 'AB') {
                    temp.push(d[col]);
                }
                else {
                    if (col === 'ID') {
                        temp.push(d[col]);
                    }
                    else if (col === 'Name') {
                        temp.push(d[col]);
                    }
                    else if (col === 'Team_ID') {
                        temp.push(d[col]);
                    }
                    else if (col === 'Team_Name') {
                        temp.push(d[col]);
                    }
                    else {
                        temp.push(+d[col]);
                    }

                }

            });
            batting_table_dataset.push(temp);
            if (d.Team_Name === "味全") {
                bat_w_table_dataset.push(temp);
            }
            else if (d.Team_Name === "統一") {
                bat_t_table_dataset.push(temp);
            }
            else if (d.Team_Name === "中信") {
                bat_c_table_dataset.push(temp);
            }
            else if (d.Team_Name === "樂天") {
                bat_l_table_dataset.push(temp);
            }
            else if (d.Team_Name === "富邦") {
                bat_f_table_dataset.push(temp);
            }
        }

    });
    //sorting
    var CPBL_bat_avg = W_avg_b + L_avg_b + T_avg_b + C_avg_b + F_avg_b;
    W_team_bat.sort(sorting_by_BA);
    W_avg_b = W_avg_b / W_team_bat.length;

    L_team_bat.sort(sorting_by_BA);
    L_avg_b = L_avg_b / L_team_bat.length;

    T_team_bat.sort(sorting_by_BA);
    T_avg_b = T_avg_b / T_team_bat.length;

    C_team_bat.sort(sorting_by_BA);
    C_avg_b = C_avg_b / C_team_bat.length;

    F_team_bat.sort(sorting_by_BA);
    F_avg_b = F_avg_b / F_team_bat.length;

    CPBL_bat_avg = CPBL_bat_avg / (W_team_bat.length + L_team_bat.length + T_team_bat.length + C_team_bat.length + F_team_bat.length);

    W_team_bat.push({ region: "AVG", p_name: "隊內平均", "BA": W_avg_b });
    W_team_bat.push({ region: "AVG", p_name: "中職平均", "BA": CPBL_bat_avg });

    C_team_bat.push({ region: "AVG", p_name: "隊內平均", "BA": C_avg_b });
    C_team_bat.push({ region: "AVG", p_name: "中職平均", "BA": CPBL_bat_avg });

    T_team_bat.push({ region: "AVG", p_name: "隊內平均", "BA": T_avg_b });
    T_team_bat.push({ region: "AVG", p_name: "中職平均", "BA": CPBL_bat_avg });

    L_team_bat.push({ region: "AVG", p_name: "隊內平均", "BA": L_avg_b });
    L_team_bat.push({ region: "AVG", p_name: "中職平均", "BA": CPBL_bat_avg });

    F_team_bat.push({ region: "AVG", p_name: "隊內平均", "BA": F_avg_b });
    F_team_bat.push({ region: "AVG", p_name: "中職平均", "BA": CPBL_bat_avg });

    am4core.ready(creat_bar_chart("p_name", "BA", "team_bat_bar_chart", C_team_bat, "batting_average", "#FFDC35"));

});


// data preprocessing for pitching
var W_team_pitch = [];
var C_team_pitch = [];
var L_team_pitch = [];
var T_team_pitch = [];
var F_team_pitch = [];

var W_avg_p = 0;
var L_avg_p = 0;
var C_avg_p = 0;
var T_avg_p = 0;
var F_avg_p = 0;

var pitching_columns;
var pitching_table_dataset = [];
var pitch_w_table_dataset = [];
var pitch_l_table_dataset = [];
var pitch_t_table_dataset = [];
var pitch_c_table_dataset = [];
var pitch_f_table_dataset = [];

var player_pitching_url = "../dataset/bar-chart/data/player_pitch.csv";
/*
//ERA(防禦率)	error run average	ER / PA
//安打: H(hit)
//打數: AB(at bat)
*/

// sorting function
function sorting_by_ERA(a, b) {
    return b.ERA - a.ERA;
}

// for team pitch bar chart
d3.csv(player_pitching_url).then(data_pitch => {
    pitching_columns = Object.keys(data_pitch[0]);
    data_pitch.forEach(d => {
        //Name,Team
        d.G = +d.G;
        d.ER = +d.ER;

        var error_run_average = (d.ER / d.G * 9);
        //存取打擊率成績
        if (isNaN(error_run_average)) {
            error_run_average = 0;
        }

        // 只存取有投球數>0的選手
        if (!isNaN(error_run_average) & d.G > 0) {
            if (d.Team_Name === "味全") {
                W_team_pitch.push({ region: d.Team_Name, p_name: d.Name, ERA: error_run_average });
                W_avg_p = W_avg_p + error_run_average;
            }
            else if (d.Team_Name === "統一") {
                T_team_pitch.push({ region: d.Team_Name, p_name: d.Name, ERA: error_run_average });
                T_avg_p = T_avg_p + error_run_average;
            }
            else if (d.Team_Name === "樂天") {
                L_team_pitch.push({ region: d.Team_Name, p_name: d.Name, ERA: error_run_average });
                L_avg_p = L_avg_p + error_run_average;
            }
            else if (d.Team_Name === "中信") {
                C_team_pitch.push({ region: d.Team_Name, p_name: d.Name, ERA: error_run_average });
                C_avg_p = C_avg_p + error_run_average;
            }
            else if (d.Team_Name === "富邦") {
                F_team_pitch.push({ region: d.Team_Name, p_name: d.Name, ERA: error_run_average });
                F_avg_p = F_avg_p + error_run_average;
            }

            var temp = [];
            pitching_columns.forEach(col => {
                if (col === 'G') {
                    temp.push(d[col]);
                }
                else if (col === 'ER') {
                    temp.push(d[col]);
                }
                else {
                    if (col === 'ID') {
                        temp.push(d[col]);
                    }
                    else if (col === 'Name') {
                        temp.push(d[col]);
                    }
                    else if (col === 'Team_ID') {
                        temp.push(d[col]);
                    }
                    else if (col === 'Team_Name') {
                        temp.push(d[col]);
                    }
                    else {
                        temp.push(+d[col]);
                    }

                }
            });
            pitching_table_dataset.push(temp);
            if (d.Team_Name === "味全") {
                pitch_w_table_dataset.push(temp);
            }
            else if (d.Team_Name === "統一") {
                pitch_t_table_dataset.push(temp);
            }
            else if (d.Team_Name === "中信") {
                pitch_c_table_dataset.push(temp);
            }
            else if (d.Team_Name === "樂天") {
                pitch_l_table_dataset.push(temp);
            }
            else if (d.Team_Name === "富邦") {
                pitch_f_table_dataset.push(temp);
            }
        }

    });
    //sorting
    var CPBL_pitch_avg = W_avg_p + L_avg_p + T_avg_p + C_avg_p + F_avg_p;
    W_team_pitch.sort(sorting_by_ERA);
    W_avg_p = W_avg_p / W_team_pitch.length;

    L_team_pitch.sort(sorting_by_ERA);
    L_avg_p = L_avg_p / L_team_pitch.length;

    T_team_pitch.sort(sorting_by_ERA);
    T_avg_p = T_avg_p / T_team_pitch.length;

    C_team_pitch.sort(sorting_by_ERA);
    C_avg_p = C_avg_p / C_team_pitch.length;

    F_team_pitch.sort(sorting_by_ERA);
    F_avg_p = F_avg_p / F_team_pitch.length;

    CPBL_pitch_avg = CPBL_pitch_avg / (W_team_pitch.length + L_team_pitch.length + T_team_pitch.length + C_team_pitch.length + F_team_pitch.length);


    W_team_pitch.push({ region: "AVG", p_name: "隊內平均", "ERA": W_avg_p });
    W_team_pitch.push({ region: "AVG", p_name: "中職平均", "ERA": CPBL_pitch_avg });

    C_team_pitch.push({ region: "AVG", p_name: "隊內平均", "ERA": C_avg_p });
    C_team_pitch.push({ region: "AVG", p_name: "中職平均", "ERA": CPBL_pitch_avg });

    T_team_pitch.push({ region: "AVG", p_name: "隊內平均", "ERA": T_avg_p });
    T_team_pitch.push({ region: "AVG", p_name: "中職平均", "ERA": CPBL_pitch_avg });

    L_team_pitch.push({ region: "AVG", p_name: "隊內平均", "ERA": L_avg_p });
    L_team_pitch.push({ region: "AVG", p_name: "中職平均", "ERA": CPBL_pitch_avg });

    F_team_pitch.push({ region: "AVG", p_name: "隊內平均", "ERA": F_avg_p });
    F_team_pitch.push({ region: "AVG", p_name: "中職平均", "ERA": CPBL_pitch_avg });

    am4core.ready(creat_bar_chart("p_name", "ERA", "team_pitch_bar_chart", C_team_pitch, "pitching_average", "#FFDC35"));
});


function creat_bar_chart(categorical_name, value_name, id_name, data, series_name, team_color) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(id_name, am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();
    // Add data
    chart.data = data;
    chart.svgContainer.htmlElement.style.height = "300" + "px";
    chart.svgContainer.htmlElement.style.width = "600" + "px";

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = categorical_name;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = value_name;
    series.dataFields.categoryX = categorical_name;
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
        var avg_value = data[data.length - 1][value_name];
        var data_index = target.dataItem.index;
        if (value_name == "BA") {
            if (data[data_index][value_name] > avg_value) {
                return team_color;
            }
            else {
                if (data[data_index].p_name == "中職平均") {
                    return "#019858";
                }
                else if (data[data_index].p_name == "對內平均") {
                    return "rgba(0, 133, 77, 0.3)";
                }
                else {
                    return "#BBBBBB";
                }
            }
        }

        else if (value_name == "ERA") {
            if (data[data_index][value_name] < avg_value) {
                return team_color;
            }
            else {
                if (data[data_index].p_name == "中職平均") {
                    return "#019858";
                }
                else if (data[data_index].p_name == "對內平均") {
                    return "rgba(0, 133, 77, 0.3)";
                }
                else {
                    return "#BBBBBB";
                }
            }

        }

    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
}


//根據上邊下拉式選單結果篩選隊伍資料
let select = document.querySelector('#team-selector');
let select2 = document.querySelector('#team-selector');
select.addEventListener("click", selectFun);
select2.addEventListener("click", selectFun2);
function selectFun() {
    const switchValue = select.options[select.selectedIndex].value;
    switch (switchValue) {
        case "中信兄弟":
            am4core.ready(creat_bar_chart("p_name", "BA", "team_bat_bar_chart", C_team_bat, "batting_average", "#FFDC35"));
            break;

        case "統一獅":
            am4core.ready(creat_bar_chart("p_name", "BA", "team_bat_bar_chart", T_team_bat, "batting_average", "#FF8000"));
            break;

        case "味全龍":
            am4core.ready(creat_bar_chart("p_name", "BA", "team_bat_bar_chart", W_team_bat, "batting_average", "#FF0000"));
            break;

        case "樂天桃猿":
            am4core.ready(creat_bar_chart("p_name", "BA", "team_bat_bar_chart", L_team_bat, "batting_average", "#9E0015"));
            break;

        case "富邦悍將":
            am4core.ready(creat_bar_chart("p_name", "BA", "team_bat_bar_chart", F_team_bat, "batting_average", "#005AB5"));
            break;
    }
};
function selectFun2() {
    const switchValue = select.options[select.selectedIndex].value;
    switch (switchValue) {
        case "中信兄弟":
            am4core.ready(creat_bar_chart("p_name", "ERA", "team_pitch_bar_chart", C_team_pitch, "error_run_average", "#FFDC35"));
            break;

        case "統一獅":
            am4core.ready(creat_bar_chart("p_name", "ERA", "team_pitch_bar_chart", T_team_pitch, "error_run_average", "#FF8000"));
            break;

        case "味全龍":
            am4core.ready(creat_bar_chart("p_name", "ERA", "team_pitch_bar_chart", W_team_pitch, "error_run_average", "#FF0000"));
            break;

        case "樂天桃猿":
            am4core.ready(creat_bar_chart("p_name", "ERA", "team_pitch_bar_chart", L_team_pitch, "error_run_average", "#9E0015"));
            break;

        case "富邦悍將":
            am4core.ready(creat_bar_chart("p_name", "ERA", "team_pitch_bar_chart", F_team_pitch, "error_run_average", "#005AB5"));
            break;
    }
};


var fielding_columns;
var fielding_table_dataset = [];
var field_w_table_dataset = [];
var field_l_table_dataset = [];
var field_t_table_dataset = [];
var field_c_table_dataset = [];
var field_f_table_dataset = [];

var player_fielding_url = "../dataset/bar-chart/data/player_field.csv";
// for team pitch bar chart
d3.csv(player_fielding_url).then(data_field => {
    fielding_columns = Object.keys(data_field[0]);
    data_field.forEach(d => {
        var temp = [];
        fielding_columns.forEach(col => {
            if (col === 'ID') {
                temp.push(d[col]);
            }
            else if (col === 'Name') {
                temp.push(d[col]);
            }
            else if (col === 'Team_ID') {
                temp.push(d[col]);
            }
            else if (col === 'Team_Name') {
                temp.push(d[col]);
            }
            else {
                temp.push(+d[col]);
            }

        });
        fielding_table_dataset.push(temp);
        if (d.Team_Name === "味全") {
            field_w_table_dataset.push(temp);
        }
        else if (d.Team_Name === "統一") {
            field_t_table_dataset.push(temp);
        }
        else if (d.Team_Name === "中信") {
            field_c_table_dataset.push(temp);
        }
        else if (d.Team_Name === "樂天") {
            field_l_table_dataset.push(temp);
        }
        else if (d.Team_Name === "富邦") {
            field_f_table_dataset.push(temp);
        }


    });

});



/*
===================================================
dot-plot
==================================================
*/
// Load the dataset
d3.csv('../dataset/dot-plot/data/session.csv').then(data => {
    // Initial settings
    teamSelected = '中信兄弟';

    // Render the block dot chart initially
    renderDot(data.filter(d => d.team === teamSelected));

    d3.select('#team-selector').on('change', function () {
        // Get the selected team value
        const teamSelected = this.value;
        //bar_chart_rendor(teamSelected);
        // Add Event Listener on `.team-selector`: for changing `.teamSelected`
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
            var contr = Math.max(value - range[k - 1], 0);
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
            var contr = Math.max(value - range[k - 1], 0);
            if (contr > 0) {
                createElement(d, column, k, 'ERA');
            } else {
                createElement(d, column, 0, 'ERA');
            };
        };

        // Draw X-axis
        createAxis(column, i + 1, 'x-axis')
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
    elem.addEventListener('mouseenter', function () {
        showTooltip(data, elem);
    });

    elem.addEventListener('mouseleave', function () {
        hideTooltip(elem);
    });

    // Add block into HTML
    parent.appendChild(elem);
};

// Function to show tooltip
function showTooltip(data, elem) {
    // Create and initialize the tooltip
    const tooltip = d3.select('#tooltip_dot')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '10px')
        .style('display', 'none')
        .style('font-size', '1.5rem');

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
    const tooltip = d3.select('#tooltip_dot');
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

/*
=========================================================================
javascript for Matrix-plot
=========================================================================
*/
// Load the dataset
d3.csv('../dataset/matrix-plot/data/schedule.csv').then(data => {
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
    d3.select('#session-min-slider').on('input', function () {
        sessionMin = +this.value;
        if (sessionMin <= sessionMax) {
            d3.select('#slider-min-value').text(sessionMin);
        };
        ['g', 'rect', 'image', 'text'].forEach(item => {
            matrix_svg.selectAll(item).remove();
        });
        renderMatrix(data.filter(d => d.session >= sessionMin && d.session <= sessionMax));
    });
    d3.select('#session-max-slider').on('input', function () {
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
const matrix_margin = { top: 50, right: 150, bottom: 80, left: 80 };
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
        if (game.team_win === 'Draw') {
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
            home_win: +(home_win / home_total).toFixed(2),
            away_win: +(away_win / away_total).toFixed(2),
            home_draw: +(home_draw / home_total).toFixed(2),
            away_draw: +(away_draw / away_total).toFixed(2)
        };
        matrixData.push(newRecord);
    });
    // console.log(matrixData);

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
                .attr('width', matrix_width / 4)
                .attr('height', matrix_height / 4)
                .attr('x', -matrix_width / 8)
                .attr('y', -matrix_height / 8)
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
        .style('font-size', '1.5rem');

    // Diagonal: add team logo
    const translate = { '中信兄弟': 'brothers', '樂天桃猿': 'rakuten', '統一獅': 'unilions', '味全龍': 'dragons', '富邦悍將': 'fubon' }
    grid.filter(d => teamOrder.indexOf(d.y) === teamOrder.indexOf(d.x))
        .append('image')
        .attr('xlink:href', d => `../dataset/matrix-plot/images/${translate[d.x]}.png`)
        .attr('x', -matrix_width / 8 + 1.5)
        .attr('y', -matrix_height / 8 + 1.5)
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
        .each(function (d) {
            const group = d3.select(this);

            // Add circles
            group.append('circle')
                .attr('r', function (d) {
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
        .each(function (d) {
            const group = d3.select(this);

            // Add circles
            group.append('circle')
                .attr('r', function (d) {
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
        .attr('transform', `translate(-60, ${(matrix_height) / 2}) rotate(-90)`)
        .attr('class', 'axis-label');
    matrix_svg.selectAll('.x-axis-label') // Top side
        .data(['Home Team'])
        .enter().append('text')
        .text(d => d)
        .attr('font-size', 20)
        .attr('font-weight', 'bold')
        .attr('fill', '#6FB7B7')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${(matrix_width) / 2}, 440)`)
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
        .text(d => `${(d * 100).toFixed(0)}%`);

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
        .attr('y', height + 35)
        .attr('text-anchor', 'middle')
        .text(d => d);
};



/*
=========================================================================
javascript for sunburst plot
=========================================================================
*/

am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("sunburst");
    root.dom.style.height = "500px";
    root.dom.style.width = "450px"


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create wrapper container
    var container = root.container.children.push(am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    var series = container.children.push(am5hierarchy.Sunburst.new(root, {
        singleBranchOnly: true,
        downDepth: 10,
        initialDepth: 10,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
    }));

    series.slices.template.setAll({
        templateField: "nodeSettings"
    });


    // Generate and set data
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data

    var text_line = "\n------------------ ";
    var data = {
        name: "[bold]2023年[\]\n各月份MVP", text: " ", nodeSettings: { fill: am5.color(0xFFFFFF) }, children: [

            {
                name: "打擊",
                text: " (4~10月)",
                nodeSettings: { fill: am5.color(0x01B468) },
                children: [
                    {
                        name: "味全龍",
                        text: " ",
                        nodeSettings: { fill: am5.color(0xFF6161) },
                        children: [
                            { name: "4月", value: 1, text: text_line + "\n[bold]劉基鴻[\]\n* 出賽數: 20\n* 打席: 87\n* 打數: 76\n* 安打: 24\n* 全壘打: 4\n* 打點: 14\n* 打擊率: 0.316\n* 上壘率: 0.384\n* 長打率: 0.513\n* 整體攻擊指數: 0.897", text_color: "#FF0000", nodeSettings: { fill: am5.color(0xFF6161) } },
                            { name: "9月", value: 1, text: text_line + "\n[bold]吉力吉撈．鞏冠 [\]\n* 出賽數: 17\n* 打席: 71\n* 打數: 67\n* 安打: 23\n* 全壘打: 7\n* 打點: 13\n* 打擊率: 0.343\n* 上壘率: 0.366\n* 長打率: 0.731\n* 整體攻擊指數: 1.097", text_color: "#FF0000", nodeSettings: { fill: am5.color(0xFF6161) } },
                            { name: "10月", value: 1, text: text_line + "\n[bold]劉基鴻[\]\n* 出賽數: 11\n* 打席: 50\n* 打數: 45\n* 安打: 19\n* 全壘打: 2\n* 打點: 10\n* 打擊率: 0.422\n* 上壘率: 0.480\n* 長打率: 0.622\n* 整體攻擊指數: 1.102", text_color: "#FF0000", nodeSettings: { fill: am5.color(0xFF6161) }, },
                        ]
                    },
                    {
                        name: "樂天桃猿",
                        text: " ",
                        nodeSettings: { fill: am5.color(0xD10000) },
                        children: [
                            { name: "7月", value: 1, text: text_line + "\n[bold]廖健富 [\]\n* 出賽數: 9\n* 打席: 42\n* 打數: 36\n* 安打: 15\n* 全壘打: 4\n* 打點: 12\n* 打擊率: 0.417\n* 上壘率: 0.500\n* 長打率: 0.833\n* 整體攻擊指數: 1.333", text_color: "#9E0015", nodeSettings: { fill: am5.color(0xD10000) }, },
                            { name: "8月", value: 1, text: text_line + "\n[bold]梁家榮 [\]\n* 出賽數: 19\n* 打席: 81\n* 打數: 69\n* 安打: 28\n* 全壘打: 4\n* 打點: 20\n* 打擊率: 0.406\n* 上壘率: 0.481\n* 長打率: 0.681\n* 整體攻擊指數: 1.162", text_color: "#9E0015", nodeSettings: { fill: am5.color(0xD10000) }, }

                        ]
                    },
                    {
                        name: "中信兄弟",
                        text: " ",
                        nodeSettings: { fill: am5.color(0xFFE153) },
                        children: [
                            { name: "6月", value: 1, text: text_line + "\n[bold]張志豪 [\]\n* 出賽數: 18\n* 打席: 65\n* 打數: 51\n* 安打: 14\n* 全壘打: 6\n* 打點: 17\n* 打擊率: 0.275\n* 上壘率: 0.415\n* 長打率: 0.647\n* 整體攻擊指數: 1.062", text_color: "#FFDC35", nodeSettings: { fill: am5.color(0xFFE153) }, }
                        ]
                    },
                    {
                        name: "統一獅",
                        nodeSettings: { fill: am5.color(0xFFA042) },
                        text: " ",
                        children: [
                            { name: "5月", value: 1, text: text_line + "\n[bold]蘇智傑 [\]\n* 出賽數: 20\n* 打席: 87\n* 打數: 75\n* 安打: 29\n* 全壘打: 4\n* 打點: 24\n* 打擊率: 0.387\n* 上壘率: 0.471\n* 長打率: 0.680\n* 整體攻擊指數: 1.151", text_color: "#FF8000", nodeSettings: { fill: am5.color(0xFFA042) }, },

                        ]
                    },
                    {
                        name: "富邦悍將",
                        value: 1,
                        text: " ",
                        children: [
                        ],
                        nodeSettings: { fill: am5.color(0x2894FF) },
                    },
                ],
            },
            {
                name: "投手",
                nodeSettings: { fill: am5.color(0x007979) },
                text: "(4~10月)",
                children: [
                    {
                        name: "富邦悍將",
                        nodeSettings: { fill: am5.color(0x0066CC) },
                        text: " ",
                        children: [
                            { name: "5月", value: 1, text: text_line + "\n[bold]陳仕朋 [\]\n* 出賽數: 4\n* 投球局數: 28.1\n* 被安打: 31\n* 四壞: 5\n* 三振: 16\n* 失分: 10\n* 自責分: 6\n* 防禦率: 1.91", text_color: "#005AB5", nodeSettings: { fill: am5.color(0x0066CC) } },
                            { name: "8月", value: 1, text: text_line + "\n[bold]富藍戈 [\]\n* 出賽數: 11\n* 投球局數: 15.1\n* 被安打: 7\n* 四壞: 3\n* 三振: 17\n* 失分: 1\n* 自責分: 0\n* 防禦率: 0.00", text_color: "#005AB5", nodeSettings: { fill: am5.color(0x0066CC) } }
                        ]
                    },
                    {
                        name: "統一獅",
                        nodeSettings: { fill: am5.color(0xD94600) },
                        text: " ",
                        children: [
                            { name: "6月", value: 1, text: text_line + "\n[bold]勝騎士 [\]\n* 出賽數: 5\n* 投球局數:35.2\n* 被安打: 26\n* 四壞: 6\n* 三振: 28\n* 失分: 4\n* 自責分: 3\n* 防禦率: 0.76", text_color: "#FF8000", nodeSettings: { fill: am5.color(0xD94600) }, },
                            { name: "9月", value: 1, text: text_line + "\n[bold]布雷克 [\]\n* 出賽數: 5\n* 投球局數:34.1\n* 被安打: 27\n* 四壞: 5\n* 三振: 20\n* 失分: 2\n* 自責分: 2\n* 防禦率: 0.52", text_color: "#FF8000", nodeSettings: { fill: am5.color(0xD94600) }, }
                        ]
                    },

                    {
                        name: "中信兄弟",
                        value: 1,
                        text: " ",
                        nodeSettings: { fill: am5.color(0xEAC100) },
                        children: [
                        ]
                    },
                    {
                        name: "樂天桃猿",
                        nodeSettings: { fill: am5.color(0xB20606) },
                        text: " ",
                        children: [
                            { name: "10月", value: 1, text: text_line + "\n[bold]王志煊 [\]\n* 出賽數: 9\n* 投球局數:7.1\n* 被安打: 4\n* 四壞: 1\n* 三振: 4\n* 失分: 2\n* 自責分: 2\n* 防禦率: 2.45", text_color: "#9E0015", nodeSettings: { fill: am5.color(0xB20606) }, },
                        ]
                    },

                    {
                        name: "味全龍",
                        nodeSettings: { fill: am5.color(0xED2C2C) },
                        text: " ",
                        children: [
                            { name: "4月", value: 1, text: text_line + "\n[bold]鋼龍 [\]\n* 出賽數: 5\n* 投球局數: 31\n* 被安打: 28\n* 四壞: 2\n* 三振: 32\n* 失分: 10\n* 自責分: 10\n* 防禦率: 2.90", text_color: "#FF0000", nodeSettings: { fill: am5.color(0xED2C2C) }, },
                            { name: "7月", value: 1, text: text_line + "\n[bold]錡龍 [\]\n* 出賽數: 2 \n投球局數: 12\n* 被安打: 9\n* 四壞: 3\n* 三振: 6\n* 失分: 3\n* 自責分: 3\n* 防禦率: 2.25", text_color: "#FF0000", nodeSettings: { fill: am5.color(0xED2C2C) }, },
                        ]
                    },
                ]
            }
        ]
    };

    //generateLevel(data, "", 0);

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);
    series.nodes.template.set("tooltipText", "[bold]{category}[/]{text}");
    series.labels.template.setAll({
        fontSize: 20,
        fill: am5.color(0x111111)
    });
    // Make stuff animate on load
    series.appear(1000, 100);

}); // end am5.ready()


/*
===============================================
 for line chart
===============================================
*/
// Load the dataset
d3.csv('../dataset/line-chart/data/ranking.csv').then(data => {
    // Initial settings
    var seasonSelected = 'A';

    // Render the line-chart initially
    renderLine(data.filter(d => d.season === seasonSelected));

    // Add Event Listener on `.season-selector`: for changing `.seasonSelected`
    d3.select('#season-selector').on('change', function () {
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
const line_margin = { top: 20, right: 20, bottom: 40, left: 20 };
const line_width = 1800 - line_margin.left - line_margin.right;
const line_height = 300 - line_margin.top - line_margin.bottom;

// Create the SVG container
const line_svg = d3.select('#line')
    .append('svg')
    .attr('width', 1800)
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
        .call(d3.axisBottom(xScale).ticks(d3.group(data, d => d.session).size / 10));

    // Add Y axis
    const yScale = d3.scaleLinear()
        .domain([0, 5])
        .range([line_height, 0]);
    const yAxis = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => d == 0 ? 0 : Math.abs(6 - d));
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
        .attr('transform', `translate(-10, ${(line_height - 40) / 2}) rotate(-90)`);
    line_svg.selectAll('.x-axis-label') // Bottom side
        .data(['Session'])
        .enter().append('text')
        .text(d => d)
        .attr('font-size', 12)
        .attr('text-anchor', 'end')
        .attr('transform', `translate(${(line_width + 65) / 2}, ${line_height + 35})`);

    // colorScale
    const teamOrder = ['中信兄弟', '樂天桃猿', '統一獅', '味全龍', '富邦悍將'];
    const colorScale = d3.scaleOrdinal()
        .domain(teamOrder)
        .range(['#FFD306', '#930000', '#FF9224', '#FF7575', '#0066CC']);

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
        .attr('stroke-width', 3)
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
        verticalLine.attr('transform', `translate(${mouseX + 15}, 0)`);

        // Show the corresponding session value
        const sessionValue = Math.round(xScale.invert(mouseX));
        infoElement.text(`${sessionValue}`)
            .style('fill', 'green')
            .style('font-size', '12px')
            .attr('transform', `translate(${mouseX}, ${line_height + 15})`);

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






/*
===================================================
table data list (using google chart table)
==================================================
*/

let tab_select = document.querySelector('#bat-team-selector');
tab_select.addEventListener("change", tabFun_bat);
function tabFun_bat() {
    const switchValue = tab_select.options[tab_select.selectedIndex].value;
    switch (switchValue) {
        case "中信兄弟":
            google.charts.setOnLoadCallback(drawTable_c);
            break;

        case "統一獅":
            google.charts.setOnLoadCallback(drawTable_t);
            break;

        case "味全龍":
            google.charts.setOnLoadCallback(drawTable_w);
            break;

        case "樂天桃猿":
            google.charts.setOnLoadCallback(drawTable_l);
            break;

        case "富邦悍將":
            google.charts.setOnLoadCallback(drawTable_f);
            break;

        case "全部":
            google.charts.setOnLoadCallback(drawTable);
            break;


    }
};
google.charts.load('current', { packages: ['table'] });
//google.charts.setOnLoadCallback(drawTable_bat);
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
    var data = new google.visualization.DataTable();

    batching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }

    });


    data.addRows(batting_table_dataset);



    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function drawTable_w() {
    var data = new google.visualization.DataTable();

    batching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }

    });

    data.addRows(bat_w_table_dataset);



    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function drawTable_l() {
    var data = new google.visualization.DataTable();

    batching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }

    });

    data.addRows(bat_l_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function drawTable_t() {
    var data = new google.visualization.DataTable();

    batching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }

    });

    data.addRows(bat_t_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function drawTable_c() {
    var data = new google.visualization.DataTable();

    batching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }

    });

    data.addRows(bat_c_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function drawTable_f() {
    var data = new google.visualization.DataTable();

    batching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }

    });

    data.addRows(bat_f_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}



let tab_select2 = document.querySelector('#pitch-team-selector');
tab_select2.addEventListener("change", tabFun_pitch);
function tabFun_pitch() {
    const switchValue = tab_select2.options[tab_select2.selectedIndex].value;
    switch (switchValue) {
        case "中信兄弟":
            google.charts.setOnLoadCallback(p_Table_c);
            break;

        case "統一獅":
            google.charts.setOnLoadCallback(p_Table_t);
            break;

        case "味全龍":
            google.charts.setOnLoadCallback(p_Table_w);
            break;

        case "樂天桃猿":
            google.charts.setOnLoadCallback(p_Table_l);
            break;

        case "富邦悍將":
            google.charts.setOnLoadCallback(p_Table_f);
            break;

        case "全部":
            google.charts.setOnLoadCallback(p_Table);
            break;


    }
};
google.charts.load('current', { packages: ['table'] });
//google.charts.setOnLoadCallback(drawTable_bat);
google.charts.setOnLoadCallback(p_Table);

function p_Table() {
    var data = new google.visualization.DataTable();

    pitching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });


    data.addRows(pitching_table_dataset);



    var table = new google.visualization.Table(document.getElementById('table_div_pitch'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function p_Table_w() {
    var data = new google.visualization.DataTable();

    pitching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(pitch_w_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_pitch'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function p_Table_l() {
    var data = new google.visualization.DataTable();

    pitching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(pitch_l_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_pitch'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function p_Table_t() {
    var data = new google.visualization.DataTable();

    pitching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(pitch_t_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_pitch'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function p_Table_c() {
    var data = new google.visualization.DataTable();

    pitching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(pitch_c_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_pitch'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function p_Table_f() {
    var data = new google.visualization.DataTable();

    pitching_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(pitch_f_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_pitch'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}



let tab_select3 = document.querySelector('#field-team-selector');
tab_select3.addEventListener("change", tabFun_field);
function tabFun_field() {
    const switchValue = tab_select3.options[tab_select3.selectedIndex].value;
    switch (switchValue) {
        case "中信兄弟":
            google.charts.setOnLoadCallback(f_Table_c);
            break;

        case "統一獅":
            google.charts.setOnLoadCallback(f_Table_t);
            break;

        case "味全龍":
            google.charts.setOnLoadCallback(f_Table_w);
            break;

        case "樂天桃猿":
            google.charts.setOnLoadCallback(f_Table_l);
            break;

        case "富邦悍將":
            google.charts.setOnLoadCallback(f_Table_f);
            break;

        case "全部":
            google.charts.setOnLoadCallback(f_Table);
            break;


    }
};


google.charts.load('current', { packages: ['table'] });
//google.charts.setOnLoadCallback(drawTable_bat);
google.charts.setOnLoadCallback(f_Table);

function f_Table() {
    var data = new google.visualization.DataTable();

    fielding_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(fielding_table_dataset);


    var table = new google.visualization.Table(document.getElementById('table_div_field'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function f_Table_w() {
    var data = new google.visualization.DataTable();

    fielding_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(field_w_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_field'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function f_Table_l() {
    var data = new google.visualization.DataTable();

    fielding_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(field_l_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_field'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function f_Table_t() {
    var data = new google.visualization.DataTable();

    fielding_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(field_t_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_field'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function f_Table_c() {
    var data = new google.visualization.DataTable();

    fielding_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(field_c_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_field'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}
function f_Table_f() {
    var data = new google.visualization.DataTable();

    fielding_columns.forEach(c => {
        if (c === 'ID') {
            data.addColumn('string', c);
        }
        else if (c === 'Name') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_ID') {
            data.addColumn('string', c);
        }

        else if (c === 'Team_Name') {
            data.addColumn('string', c);
        }
        else {
            data.addColumn('number', c);
        }
    });

    data.addRows(field_f_table_dataset);

    var table = new google.visualization.Table(document.getElementById('table_div_field'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}