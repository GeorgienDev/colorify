const body = document.body;
const display = document.getElementById("color-code")
const picker = document.getElementById('colorPicker')
const auto = document.getElementById('check')
const title = document.getElementById('name')

const change = (color) => {
    body.style.backgroundColor = color;
    display.textContent = color;
    picker.value = color;
    picker.style.backgroundColor = color;
    title.style.color = color;
    document.querySelector("meta[name='theme-color']").setAttribute("content", color);
}



const getRandomHexColor = () => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return `#${randomColor.padStart(6, '0')}`;
}

const savecolor = (color) => {
    localStorage.setItem("lastcolor", color);
}
const loadcolor = ()=>{
    return localStorage.getItem("lastcolor") || '#FFFFFF'; 
}

const btn = document.getElementById("btn");
btn.addEventListener("click", ()=>{
    const color = getRandomHexColor();
    change(color);
    savecolor(color);
})
picker.addEventListener('input', () =>{
    const color = picker.value;
    change(color)
    savecolor(color);
})
display.addEventListener("click", ()=>{
    navigator.clipboard.writeText(display.textContent);
})

window.onload = () =>{
    const lastcolor = loadcolor();
    change(lastcolor);
}



const autofunc = () => {
    const color = getRandomHexColor();
    change(color);
    savecolor(color);
}
    const speedDiv = document.getElementById('speed');
    const rangeInput = document.getElementById('range4');
    const rangeOutput = document.getElementById('rangeValue');
    let intervalid;


    rangeOutput.textContent = rangeInput.value; 
    
    function startInterval() {
        const timeoutSpeed = parseInt(rangeInput.value) * 100;
        intervalid = setInterval(autofunc, timeoutSpeed);
    }

     rangeInput.addEventListener('input', function() {
        rangeOutput.textContent = this.value; 
        clearInterval(intervalid); 
        if (auto.checked) { 
            startInterval(); 
        }
    });

    auto.addEventListener('change', () => {
        if (auto.checked) {
            speedDiv.style.display = "block"; 
            rangeOutput.textContent = rangeInput.value; 
            startInterval(); 
            
        } else {
            clearInterval(intervalid);
            speedDiv.style.display = "none"; 
        }
    });