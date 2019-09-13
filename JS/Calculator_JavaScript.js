
console.log("Hello there!");
//creat an object to keep track of values
const Calculator = {
    Display_Value: '0', //This displays 0 on the screen
    First_Operand: null, //This will hold the first operand for an expressions.
    Wait_Second_Operand: false,//This checks whether or not the second operand has been input
    operator: null, //This will hold the operator, we set it to null for now
};

//This modifies values each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //check to see if wait_Second_operand is true and set 
    //Display_Value to the key that was clicked.
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        //This overwrites display_Value if the current value is 0
        //otherwise it adds onto it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}
//This section handles decimal points
function Input_Decimal(dot) {
    //this ensures that accidentak clicking of the decimal point
    //doesn't cause bugs in your operation
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //we are saying that is the display_Value does not contain a decimal point 
        // we want to add a decimal point
        Calculator.Display_Value += dot;
    }
}

//This section handles operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = Calculator
    //when an operator key is pressed, we convert the current number
    //display on the screen to a number and then store the result in
    //Calculator.First_Operand if it doesn't already function
    const Value_of_Input = parseFloat(Display_Value);
    //checks if an operator already exists and if Wait_Second_Operand is true,
    //then updates the operator and exits from the function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) { //checks if an operator already exists
        const Value_Now = First_Operand || 0;
        //if operator already exists, property lookup is perform for the operator
        // in the perform_Calculation object and the function that matches the 
        //operator is executed
        const result = perform_Calculation[operator](Value_Now, Value_of_Input);

        Calculator.Display_Value = String(result);
        Calculator.First_Operand = result;
    }

    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

    const perform_Calculation = {
        '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
        '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
        '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
        '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
        '=': (First_Operand, Second_Operand) => Second_Operand
    };

    function Calculator_Reset() {
        Calculator.Display_Value = '0';
        Calculator.First_Operand = null;
        Calculator.Wait_Second_Operand = false;
        Calculator.operator = null;
    }
    //this function updates the screen with the contents of Display_Vakue
    function Update_Display() {
        const display = document.querySelector('.calculator-screen');
        display.value = Calculator.Display_Value;
    }

    Update_Display();
    //This section monitors button clicks
    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        //the target variable is an object that represents the element
        //that was clicked
        const { target } = event;
        //if the element that was clicked on is not a button, exit the function
        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            Handle_Operator(target.value);
            Update_Display();
            return;
        }

        if (target.classList.contains('decimal')) {
            Input_Decimal(target.value);
            Update_Display();
            return;
        }
        //ensure the AC clears the number from the Calculator
        if (target.classList.contains('all-clear')) {
            Calculator_Reset();
            Update_Display();
            return;
        }

        Input_Digit(target.value);
        Update_Display();
})
