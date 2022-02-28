let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
const canvasWidth = 500;

let numberOfPointsInCircle = 0;
let pi = 0;

document.querySelector("#lowRange").addEventListener("click", () => {
    document.querySelector("#pointCount").setAttribute("min", "0")
    document.querySelector("#pointCount").setAttribute("max", "10000000")
})
document.querySelector("#highRange").addEventListener("click", () => {
    document.querySelector("#pointCount").setAttribute("max", "100000000")
    document.querySelector("#pointCount").setAttribute("min", "10000000")
})

document.querySelector("#pointCount").addEventListener("change", function() {
    let numberOfDots = document.querySelector("#pointCount").value;

    if(numberOfDots > 0) {
        document.querySelector("#myCanvas").remove();
        document.querySelector(".canvasDiv").innerHTML +=  `<canvas id="myCanvas" width="1000" height="1000"></canvas>`
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        drawCircleAndSquare();

        numberOfPointsInCircle = 0;

        document.querySelector("#amountOfPoints").innerText = `${numberOfDots/1000000} million dots`
        if(numberOfDots > 40000000) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1000, 1000);
            ctx.stroke();
            calculatePiEffectively(numberOfDots);
        }
        else if(numberOfDots > 10000000) {
            calculatePi(numberOfDots);
        } else {
            calculatePiWithColors(numberOfDots);
        }
        document.querySelector("#pi").innerText = `π ≈ ${pi}`;
    }
})

function generateTwoRandomCoordinates() {
    let a = Math.random();
    let b = Math.random();
    return [a, b];
}

function drawCircleAndSquare() {
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 1000);
    ctx.stroke();   

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(500, 500, 500, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

function isInCircle(a, b) {
    let xDistance = 500-(a*1000);
    let yDistance = 500-(b*1000);
    let distance = Math.sqrt(xDistance**2 + yDistance**2);
    if(distance > 500) return false;
    else return true;
}

function calculatePi(numberOfDots) {
    for(let i = 0; i < numberOfDots; i++) {
        let coordinates = generateTwoRandomCoordinates();

        if(isInCircle(coordinates[0], coordinates[1])) {
            numberOfPointsInCircle++;
        }

        if(i < 40000000 && i % 65 == 0) {
            ctx.beginPath();
            ctx.rect(coordinates[0]*1000, coordinates[1]*1000, 1, 1);
            ctx.stroke();
        }
    
    }
    
    pi = (numberOfPointsInCircle / numberOfDots) * 4;


    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(500, 500, 500, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

function calculatePiWithColors(numberOfDots) {
    for(let i = 0; i < numberOfDots; i++) {
        let coordinates = generateTwoRandomCoordinates();

        if(isInCircle(coordinates[0], coordinates[1])) {
            numberOfPointsInCircle++;
            ctx.strokeStyle = "blue";
        } else {
            ctx.strokeStyle = "red";
        }

        if(i < 10000000 && i % 75 == 0) {
            ctx.beginPath();
            ctx.rect(coordinates[0]*1000, coordinates[1]*1000, 1, 1);
            ctx.stroke();
        }
    
    }
    
    pi = (numberOfPointsInCircle / numberOfDots) * 4;
}

function calculatePiEffectively(numberOfDots) {
    for(let i = 0; i < numberOfDots; i++) {
            let distance = Math.sqrt(Math.random()**2 + Math.random()**2);
            if(distance <= 1) numberOfPointsInCircle++;

            let limit = (10100-(numberOfDots/10000))

            if(i < limit)  {
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.rect(Math.random()*1000, Math.random()*1000, 1, 1);
                ctx.stroke();
            }
    }

    pi = (numberOfPointsInCircle / numberOfDots) * 4;
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(500, 500, 500, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

drawCircleAndSquare();
