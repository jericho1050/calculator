function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode != 46 && charCode > 31 
     && (charCode < 48 || charCode > 57)
     && (charCode != 43 && charCode != 45 && charCode != 42 && charCode != 47))
      return false;

   // Check if there's already a period in the input
   if (charCode == 46 && document.querySelector('input').value.includes('.'))
      return false;

   // Check if the last character is an operator
   var inputValue = document.querySelector('input').value;
   if ((charCode == 43 || charCode == 45 || charCode == 42 || charCode == 47) 
       && (inputValue.endsWith('+') || inputValue.endsWith('-') || inputValue.endsWith('*') || inputValue.endsWith('/')))
      return false;

   return true;
}

function isOperator(value) {
    if (value == '÷' || value == 'x' || value == '+' || value == '-') {
        return true;
    }

    return false;
}



function setOperand(operand) {
    document.querySelector('input').value += operand;
}



function setOperator(operator) {
    switch(operator) {
        case 'c':
            let input = document.querySelector('input');
            input.value = input.value.substring(0, input.value.length - 1);
            break;
        case '÷':
            document.querySelector('input').value += operator;
            break;
        case 'x':
            document.querySelector('input').value += operator;
            break;
        case '-':
            document.querySelector('input').value += operator;
            break;
        case '+':
            document.querySelector('input').value += operator;
            break;
        case '=':
            // if equal =
            let inputValue = document.querySelector('input').value;
            let operand = '';
            let arr = [];

            for (let i = 0; i < inputValue.length; i++) {
                // for each char in string.
                if (isOperator(inputValue[i])) {
                    if (operand) {
                        arr.push(operand);
                    }
                    arr.push(inputValue[i]); // push the operator
                    operand = ''; // clear the operand
                
                } else {
                    // concat the char to form the operands till there's an operator
                   operand += inputValue[i];

                }
            }
            if (operand) {
                arr.push(operand);
            }

            const result = calculate(arr);
            document.querySelector('input').value = `= ${result}`;
        

            break;

    }
}
function calculate(array) {
    let operator;
    return array.reduce((result, val) => {
        if(isOperator(val)){
            operator = val;
        }
        else {
            switch (operator) {
                case '÷':
                    result /= parseFloat(val);
                    break;
                case 'x':
                    result *= parseFloat(val);
                    break;
                case '-':
                    result -= parseFloat(val);
                    break;
                case '+':
                    result += parseFloat(val);
                    break;
                default:
                    result = parseFloat(val);
                    break;
            }
        }
        return result;
    }, 0);
}
