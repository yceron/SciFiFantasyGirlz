

function createLocationMap() {

    $("#map").kendoMap({
        center: [41.640078, -33.398438],
        zoom: 3,
        layers: [
            {
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
            attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>."
        },
        {
            type: "marker",
            dataSource: {
                transport: {
                    read: {
                        url: "/data/members_location.json",
                        dataType: "json"
                    }
                }
            },
            locationField: "latlong",
            titleField: "location"
        }]
    });
}


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
            font: "bold 20px 'Raleway', sans-serif"
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
            type: "bar",
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
            font: "bold 20px 'Raleway', sans-serif"
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
            text: "Goodreads Membership",
            font: "bold 20px 'Raleway', sans-serif"
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


createAgeChart();
createRegistrationChart();
createMembershipAgeChart();
createLocationMap();

$(window).on("resize", function () {
    $("#map").data("kendoChart").refresh();
    $("#ageChart").data("kendoChart").refresh();
    $("#registrationChart").data("kendoChart").refresh();
    $("#membershipChart").data("kendoChart").refresh();
    
});
