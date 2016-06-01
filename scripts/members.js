Plotly.d3.csv('data/members_countries.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'Country'),
        z: unpack(rows, 'Members'),
        text: unpack(rows, 'Country'),
        autocolorscale: false,
        colorscale: [[0, 'rgb(150,0,90)'], [0.125, 'rgb(0, 0, 200)'], [0.25, 'rgb(0, 25, 255)'], [0.375, 'rgb(0, 152, 255)'], [0.5, 'rgb(44, 255, 150)'], [0.625, 'rgb(151, 255, 0)'], [0.75, 'rgb(255, 234, 0)'], [0.875, 'rgb(255, 111, 0)'], [1, 'rgb(255, 0, 0)']
        ],
        colorbar: {
            title: 'Number of Members',
            thickness: 20.1,
            ticksuffix: ' members'
        },
        marker: {
            line: {
                width: 1

            }
        }
    }];


    var layout = {
        title: '',
        height:600,
        width: 700,
        geo: {
            projection: {
                type: "orthographic"
            },
            showframe: false,
            showland: true,
            showocean: true,
            oceancolor: '91BFFF',
            showcoastlines: true

        }
    };

    Plotly.plot(map, data, layout, { showLink: false });
});



function createRegistrationChart() {
    $("#registrationChart").kendoChart({
        theme: "bootstrap",
        dataSource: {
            transport: {
                read: {
                    url: "data/members_join_date.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "SortOrder",
                dir: "asc"
            }
        },
        title: {
            text: "Sci-fi & Fantasy Girlz Members Registration",
            font: "bold 16px 'Raleway', sans-serif"
        },
        legend: {
            position: "bottom"
        },
        series: [{
            type: "area",
            field: "TotalMembers",
            name: "Total group members",
            color: "#007eff",
            axis: "totalmembers",
            tooltip: {
                visible: true,
                format: "{0}",
                template: "Total registered members: ${value}"
            }
        }, {
            type: "line",
            field: "RegistrationCount",
            name: "New members",
            color: "#73c100",
            axis: "totalmembers",
            tooltip: {
                visible: true,
                format: "{0}",
                template: "New registrations: ${value}"
            }
        }],
        valueAxes: [{
            name: "totalmembers"
        }
        ],
        categoryAxis: {
            field: "JoinDate",
            labels: {
                rotation: -45
            }
        },
        tooltip: {
            visible: true,
            format: "{0}",
            template: "${name} - ${value}"
        }
    });
}

function createMembersGenderChart() {
    $("#genderChart").kendoChart({
        theme:"bootstrap",
        dataSource: {
            transport: {
                read: {
                    url: "data/members_genders.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "Count",
                dir: "asc"
            }
        },
        title: {
            text: "Members Gender Distribution",
            font: "bold 16px 'Raleway', sans-serif"
        },
        legend: {
            position: "bottom"
        },
        series: [{
            type: "donut",
            field: "Count",
            categoryField :"Gender"
            }],
        tooltip: {
            visible: true,
            template: "#= category #  #= kendo.format('{0:P}', percentage) #"
        }
    });
}

function createAgeChart() {
    $("#ageChart").kendoChart({
        theme: "bootstrap",
        dataSource: {
            transport: {
                read: {
                    url: "data/age_groups.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "SortOrder",
                dir: "asc"
            }
        },
        title: {
            align: "center",
            text: "Members Age Groups",
            font: "bold 16px 'Raleway', sans-serif"
        },
        legend: {
            visible: true
        },
        seriesDefaults: {
            type: "bar",
            labels: {
                visible: true,
                background: "transparent"
            }
        },
        series: [{
            field: "Total",
            gap: 0.1
        }],
        valueAxis: {
            majorGridLines: {
                visible: true
            },
            visible: false
        },
        categoryAxis: {
            field: "AgeGroup",
            majorGridLines: {
                visible: true
            },
            line: {
                visible: false
            }
        }
    });
}

function createMembershipAgeChart() {
    $("#membershipChart").kendoChart({
        theme: "bootstrap",
        dataSource: {
            transport: {
                read: {
                    url: "data/members_registration.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "Year",
                dir: "asc"
            }
        },
        title: {
            align: "center",
            text: "Goodreads membership",
            font: "bold 16px 'Raleway', sans-serif"
        },
        legend: {
            visible: true
        },
        seriesDefaults: {
            type: "bar",
            labels: {
                visible: true,
                background: "transparent"
            }
        },
        series: [{
            field: "Total",
            gap: 0.1
        }],
        valueAxis: {
            majorGridLines: {
                visible: true
            },
            visible: false
        },
        categoryAxis: {
            field: "Year",
            majorGridLines: {
                visible: true
            },
            line: {
                visible: false
            }
        }
    });
}

function createGenderBarChart() {
    $("#genderChart").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: "data/members_genders.json",
                    dataType: "json"
                }
            },
            sort: {
                field: "Count",
                dir: "asc"
            }
        },
        title: {
            align: "left",
            text: "Members Gender"
        },
        legend: {
            visible: true
        },
        seriesDefaults: {
            type: "column",
            labels: {
                visible: true,
                background: "transparent"
            }
        },
        series: [{
            field: "Count",
            colorField: "Color"
        }],
        valueAxis: {
            majorGridLines: {
                visible: false
            },
            visible: false
        },
        categoryAxis: {
            field: "Gender",
            majorGridLines: {
                visible: false
            },
            line: {
                visible: false
            }
        }
    });
}

//createMembersGenderChart();
createAgeChart();
createRegistrationChart();
createMembershipAgeChart();

$(window).on("resize", function () {
  //  $("#genderChart").data("kendoChart").refresh();
    $("#ageChart").data("kendoChart").refresh();
    $("#registrationChart").data("kendoChart").refresh();
    $("#membershipChart").data("kendoChart").refresh();
    
});
