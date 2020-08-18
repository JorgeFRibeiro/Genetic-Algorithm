let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
    bestPhrase = createP("Best phrase");
    bestPhrase.class("Best");

    allPhrases = createP("All phrases: ");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.class("stats");

    target = prompt("Enter word or phrase to be searched:"); 
    popmax = 200;
    mutationRate = 0.01;

    population = new Population(target, mutationRate, popmax);
}

function draw() {
    //Create next generation
    population.generate();
    //Calculate the fitness %
    population.calcFitness();

    population.evaluate();

    if (population.isFinished()) {
        noLoop(); 
    }

    displayInfo();
}

function displayInfo() {
    let answer = population.getBest();

    bestPhrase.html("Best phrase:<br>" + answer);

    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:        " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:       " + popmax + "<br>";
    statstext += "mutation rate:          " + floor(mutationRate * 100) + "%";

    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases());
}