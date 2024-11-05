var completedTasks = 0; // Initialize the completed tasks counter

// Set up padding, width, height, and radius
var padding = {top: 20, right: 40, bottom: 0, left: 0},
    w = (500 * 2) - padding.left - padding.right,
    h = (500 * 2) - padding.top - padding.bottom,
    r = Math.min(w, h) / 2, // radius of the wheel
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [], // track previously picked items
    color = d3.scale.category20(); // color scheme for slices

   // Load completed tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
    const savedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks = parseInt(localStorage.getItem("completedTasksCount")) || 0;

    if (savedTasks.length > 0) {
        oldpick = savedTasks; // Restore the list of completed tasks

        // Update the slices to reflect completed tasks
        savedTasks.forEach(function(index) {
            d3.select(".slice:nth-child(" + (index + 1) + ") path")
                .attr("fill", "lightblue")
                .attr("opacity", 0.6)
                .attr("class", "sparkle");
        });

        // Update the center text with the loaded task count
        d3.select("#centerText").text(`Tasks Completed: ${completedTasks}/${data.length}`);
    }
});

// Data for the wheel, each item has a label and a question
var data = [
    {"label": "Python Calculator", "value": 1, "question": "Build a simple calculator using Python.", "color": "green"},
    {"label": "HTML Layout", "value": 2, "question": "Create a basic webpage layout with HTML and CSS.", "color": "red"},
    {"label": "Random Quote API", "value": 3, "question": "Fetch random quotes using a public API with JavaScript.", "color": "blue"},
    {"label": "Responsive Nav", "value": 4, "question": "Make a responsive navigation bar in HTML and CSS.", "color": "red"},
    {"label": "Weather App", "value": 5, "question": "Build a weather app that fetches data from an API.", "color": "blue"},
    {"label": "JavaScript Clock", "value": 6, "question": "Create a digital clock using JavaScript.", "color": "gold"},
    {"label": "To-Do List", "value": 7, "question": "Make a simple to-do list with HTML, CSS, and JavaScript.", "color": "gold"},
    {"label": "CSS Animations", "value": 8, "question": "Experiment with CSS animations and transitions.", "color": "red"},
    {"label": "Markdown Previewer", "value": 9, "question": "Build a markdown previewer with JavaScript.", "color": "gold"},
    {"label": "Color Picker", "value": 10, "question": "Create a color picker tool using JavaScript and HTML.", "color": "gold"},
    {"label": "Countdown Timer", "value": 11, "question": "Create a countdown timer for New Year’s using JavaScript.", "color": "gold"},
    {"label": "Cookie Clicker Game", "value": 12, "question": "Build a simple game where you click to collect cookies in JavaScript.", "color": "gold"},
    {"label": "Random Background", "value": 13, "question": "Change the background color randomly each time the page loads.", "color": "gold"},
    {"label": "Image Slider", "value": 14, "question": "Create an image slider with next and previous buttons using JavaScript.", "color": "gold"},
    {"label": "HTML Form", "value": 15, "question": "Build a responsive contact form using HTML and CSS.", "color": "red"},
    {"label": "CSS Grid Layout", "value": 16, "question": "Design a basic website layout using CSS Grid.", "color": "red"},
    {"label": "Christmas Card", "value": 17, "question": "Create a digital Christmas card with HTML/CSS.", "color": "red"},
    {"label": "Python Password Generator", "value": 18, "question": "Create a password generator using Python.", "color": "green"},
    {"label": "Text-based Adventure Game", "value": 19, "question": "Make a text-based adventure game in Python.", "color": "green"},
    {"label": "Weather Fetch API", "value": 20, "question": "Build a weather app that displays data from a weather API.", "color": "blue"},
    {"label": "REST Countries API", "value": 21, "question": "Display country information by fetching data from the REST Countries API.", "color": "blue"},
    {"label": "Binary to Decimal Converter", "value": 22, "question": "Create a tool that converts binary numbers to decimal.", "color": "white"},
    {"label": "Palindrome Checker", "value": 23, "question": "Check if a word is a palindrome with JavaScript.", "color": "gold"},
    {"label": "CSS Hover Effects", "value": 24, "question": "Experiment with various hover effects on buttons.", "color": "red"},
    {"label": "Python Temperature Converter", "value": 25, "question": "Convert temperatures between Celsius and Fahrenheit in Python.", "color": "green"},
    {"label": "JavaScript To-Do List", "value": 26, "question": "Create a simple to-do list app in JavaScript.", "color": "gold"},
    {"label": "Christmas Lights Animation", "value": 27, "question": "Make a string of animated 'Christmas lights' in CSS.", "color": "red"},
    {"label": "JavaScript Quiz App", "value": 28, "question": "Build a quiz app with questions and answers in JavaScript.", "color": "gold"},
    {"label": "Python Number Guesser", "value": 29, "question": "Create a Python program where you guess a random number.", "color": "green"},
    {"label": "Currency Converter", "value": 30, "question": "Fetch exchange rates and create a currency converter using an API.", "color": "blue"},
    {"label": "Calculator in JavaScript", "value": 31, "question": "Build a basic calculator app using JavaScript.", "color": "gold"},
    {"label": "Responsive Navigation", "value": 32, "question": "Create a responsive navigation bar with HTML/CSS.", "color": "red"},
    {"label": "Python Rock, Paper, Scissors", "value": 33, "question": "Make a Rock, Paper, Scissors game in Python.", "color": "green"},
    {"label": "CSS Snowfall Effect", "value": 34, "question": "Create a falling snow animation in CSS for a winter theme.", "color": "red"},
    {"label": "JavaScript Digital Clock", "value": 35, "question": "Make a digital clock that updates in real-time with JavaScript.", "color": "gold"},
    {"label": "Markdown Previewer", "value": 36, "question": "Build a markdown previewer with JavaScript.", "color": "gold"},
    {"label": "JavaScript Dice Roller", "value": 37, "question": "Create a dice roller that generates random numbers.", "color": "gold"},
    {"label": "CSS Flexbox Layout", "value": 38, "question": "Design a layout using CSS Flexbox.", "color": "red"},
    {"label": "API Cat Facts", "value": 39, "question": "Fetch and display random cat facts using an API.", "color": "blue"},
    {"label": "Python Prime Number Checker", "value": 40, "question": "Check if a number is prime with Python.", "color": "green"}
];


// Create SVG and position the wheel
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");

var vis = container.append("g");

// Set up pie layout and arc generator for wheel sections
var pie = d3.layout.pie().sort(null).value(function(d) { return 1; });
var arc = d3.svg.arc().outerRadius(r);

// Draw each slice
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

arcs.append("path")
.attr("fill", function(d, i) { return data[i].color; })
    .attr("d", function(d) { return arc(d); });

// Add text to each slice
arcs.append("text").attr("transform", function(d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
    })
    .attr("text-anchor", "end")
    .text(function(d, i) { return data[i].label; });

// Add event listener for spinning the wheel
container.on("click", spin);

function spin(d) {
    container.on("click", null); // Disable click during spin
    container.attr("class", "chartholder glow"); // Add glow effect during spin

    if (oldpick.length === data.length) {
        console.log("All items have been picked");
        container.on("click", null);
        return;
    }

    var ps = 360 / data.length,
        rng = Math.floor((Math.random() * 1440) + 360);

    rotation = (Math.round(rng / ps) * ps);
    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? (picked % data.length) : picked;

    if (oldpick.indexOf(picked) !== -1) {
        d3.select(this).call(spin);
        return;
    } else {
        oldpick.push(picked);
        completedTasks += 1;

        // Save completed tasks to local storage
        localStorage.setItem("completedTasks", JSON.stringify(oldpick));
        localStorage.setItem("completedTasksCount", completedTasks);
    }

    rotation += 90 - Math.round(ps / 2);
    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function() {
            container.attr("class", "chartholder");

            d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                .attr("fill", "lightblue")
                .attr("opacity", 0.6)
                .attr("class", "sparkle");

            d3.select("#question h1").text(data[picked].question);
            d3.select("#centerText").text(`Tasks Completed: ${completedTasks}/${data.length}`);

            oldrotation = rotation;
            container.on("click", spin);
        });
}








// Tween function for smooth rotation
function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
        return "rotate(" + i(t) + ")";
    };
}
// Add the spin button circle to the wheel center
container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 120)  // Double the radius of the center circle
    .style({"fill": "#f2f2f2", "cursor": "pointer", "stroke": "#000", "stroke-width": "2px"});

// Add dynamic text for the center button
container.append("text")
    .attr("id", "centerText")
    .attr("x", 0)
    .attr("y", 8)
    .attr("text-anchor", "middle")
    .text("SPIN") // Initial button text
    .style({"font-weight": "bold", "font-size": "20px", "cursor": "pointer"});


    // Function to reset the wheel
    function resetWheel() {
        // Clear the list of picked tasks and reset completed tasks count
        oldpick = [];
        completedTasks = 0;
    
        // Reset each slice color back to its original color and remove sparkle effect
        vis.selectAll("g.slice path")
            .attr("fill", function(d, i) {
                return data[i].color; // Reset to original color
            })
            .attr("opacity", 1) // Reset opacity to full
            .classed("sparkle", false); // Remove sparkle class
    
        // Clear the question display
        d3.select("#question h1").text("All tasks reset! 🎅");
    
        // Reset the center text
        d3.select("#centerText").text("SPIN");
    
        // Clear progress in local storage
        localStorage.removeItem("completedTasks");
        localStorage.removeItem("completedTasksCount");
    
        // Debug log to confirm reset function is called
        console.log("Wheel has been reset");
    }
    
    // Add event listener to the Reset button
    document.getElementById("resetButton").addEventListener("click", resetWheel);
    