const form = document.getElementById("bmi-form");
const errorArea = document.getElementById("error");
const resultArea = document.getElementById("result-par");

form.onsubmit = async e => {
    e.preventDefault();

    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    height = height.split("").filter(i => String(i).trim()).join("");
    weight = weight.split("").filter(i => String(i).trim()).join("");

    if (isNaN(height) || isNaN(weight)) {
        errorArea.innerText = "Please use real numbers.";
        return resultArea.innerText = "";
    } 
        
    const results = await calculateBMI(height, weight, (error) => {
        return errorArea.innerText = error;
    });

    if(!results.res) return errorArea.innerText = "Calculation Error";

    resultArea.innerText = results.res;
    resultArea.style.color = results.color;
    errorArea.innerText = "";
};

function openSite(link) {
    window.open(`https://${link}`);
}

function calculateBMI(height, weight, error) {
    if (Number(height) <= 0) return error("Calculation Error");
    if (Number(weight) <= 0) return error("Calculation Error");

    height = parseInt(height) / 100;
    weight = parseInt(weight);

    let result = weight / (height * height);

    if (result < 18.5) return {
        res: "Underweight",
        color: "yellow"
    };
    else if (result >= 18.5 && result < 25) return {
        res: "Normal Range",
        color: "blue"
    };
    else if (result >= 25 && result < 30) return {
        res: "Overweight",
        color: "#ff4500"
    };
    else if (result >= 30 && result < 40) return {
        res: "Obesity",
        color: "#ff0000"
    };
    else if (result >= 40) return {
        res: "Severe Obesity",
        color: "#800000"
    }

    return error("Calculation Error");
}