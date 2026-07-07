import {calculateInterest} from "./interest.js";
import {showresult} from "./display.js";


document.getElementById("calculate").addEventListener('click', ()=>
{
    const p=parseFloat(document.getElementById("principal").value)
    const r=parseFloat(document.getElementById("rate").value)
    const t=parseFloat(document.getElementById("time").value)

    const interest = calculateInterest(p,r,t);
    showresult(interest);
});