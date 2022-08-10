var formElement = document.forms['formElement'];

formElement.addEventListener("focus", focusFunction, true);
formElement.addEventListener("blur", blurFunction, true);


function focusFunction(evt) {
    var activeElement = formElement.querySelector('.focused');
	if (activeElement) {
	    activeElement.classList.remove('focused');
    }
    evt.target.classList.add('focused');
};

function blurFunction(evt) {
	var activeElement = formElement.querySelector('.focused');
    if (activeElement) {
     	activeElement.classList.remove('focused');   
    }
};