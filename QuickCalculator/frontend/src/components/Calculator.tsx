"use client";

import { useState } from "react";
import CalculatorButton from "./CalculatorButton";

// Define types for our calculator
type Operation = "+" | "-" | "×" | "÷" | null;
type CalculatorState = {
    currentNumber: string;
    previousNumber: string | null;
    operation: Operation;
    displayOperation: string;
    isNewNumber: boolean;
};

// Add helper function to format numbers
const formatNumber = (num: string): string => {
    // Only remove trailing zeros after decimal point
    let formatted = num.replace(/\.?0+$/, "");

    // If the number is too long, convert to scientific notation
    if (formatted.length > 8) {
        const number = parseFloat(formatted);
        return number.toExponential(6);
    }

    // If the number is a whole number, return it as is
    if (!formatted.includes(".")) {
        return formatted;
    }

    return formatted;
};

export default function Calculator() {
    // Initialize state with useState hook
    const [state, setState] = useState<CalculatorState>({
        currentNumber: "0",
        previousNumber: null,
        operation: null,
        displayOperation: "",
        isNewNumber: true,
    });

    // Basic calculator functions
    const handleNumber = (num: string) => {
        setState((prev) => {
            // If we're starting a new number (after operation or result)
            if (prev.isNewNumber) {
                return {
                    ...prev,
                    currentNumber: num,
                    displayOperation: prev.operation
                        ? `${prev.previousNumber} ${prev.operation} ${num}`
                        : num,
                    isNewNumber: false,
                };
            }

            // Otherwise, append to current number
            const newNumber = prev.currentNumber + num;
            return {
                ...prev,
                currentNumber: newNumber,
                displayOperation: prev.operation
                    ? `${prev.previousNumber} ${prev.operation} ${newNumber}`
                    : newNumber,
            };
        });
    };

    const handleOperation = (op: Operation) => {
        setState((prev) => {
            // If there's already an operation, calculate intermediate result
            if (prev.operation && prev.previousNumber) {
                const prevNum = parseFloat(prev.previousNumber);
                const currentNum = parseFloat(prev.currentNumber);
                let result: number;

                switch (prev.operation) {
                    case "+":
                        result = prevNum + currentNum;
                        break;
                    case "-":
                        result = prevNum - currentNum;
                        break;
                    case "×":
                        result = prevNum * currentNum;
                        break;
                    case "÷":
                        if (currentNum === 0) {
                            return {
                                currentNumber: "Error",
                                previousNumber: null,
                                operation: null,
                                displayOperation: "Error",
                                isNewNumber: true,
                            };
                        }
                        result = prevNum / currentNum;
                        break;
                    default:
                        result = currentNum;
                }

                return {
                    previousNumber: result.toString(),
                    operation: op,
                    currentNumber: "0",
                    displayOperation: `${result} ${op}`,
                    isNewNumber: true,
                };
            }

            // If no previous operation, start new expression
            return {
                previousNumber: prev.currentNumber,
                operation: op,
                currentNumber: "0",
                displayOperation: `${prev.currentNumber} ${op}`,
                isNewNumber: true,
            };
        });
    };

    const calculate = () => {
        if (!state.previousNumber || !state.operation) return;

        const prev = parseFloat(state.previousNumber);
        const current = parseFloat(state.currentNumber);
        let result: number;

        switch (state.operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "×":
                result = prev * current;
                break;
            case "÷":
                if (current === 0) {
                    setState({
                        currentNumber: "Error",
                        previousNumber: null,
                        operation: null,
                        displayOperation: "Error",
                        isNewNumber: true,
                    });
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        setState({
            currentNumber: result.toString(),
            previousNumber: null,
            operation: null,
            displayOperation: result.toString(),
            isNewNumber: true,
        });
    };

    const clear = () => {
        setState({
            currentNumber: "0",
            previousNumber: null,
            operation: null,
            displayOperation: "",
            isNewNumber: true,
        });
    };

    const backspace = () => {
        setState((prev) => {
            if (prev.isNewNumber) {
                // If we're starting a new number, go back to previous state
                return {
                    ...prev,
                    currentNumber: prev.previousNumber || "0",
                    previousNumber: null,
                    operation: null,
                    displayOperation: prev.previousNumber || "0",
                    isNewNumber: false,
                };
            }

            // Otherwise, remove last digit from current number
            const newNumber = prev.currentNumber.slice(0, -1) || "0";
            return {
                ...prev,
                currentNumber: newNumber,
                displayOperation: prev.operation
                    ? `${prev.previousNumber} ${prev.operation} ${newNumber}`
                    : newNumber,
            };
        });
    };

    const toggleSign = () => {
        setState((prev) => {
            const newNumber = (parseFloat(prev.currentNumber) * -1).toString();
            return {
                ...prev,
                currentNumber: newNumber,
                displayOperation: prev.operation
                    ? `${prev.previousNumber} ${prev.operation} ${newNumber}`
                    : newNumber,
            };
        });
    };

    const calculatePercentage = () => {
        setState((prev) => {
            // If there's an operation in progress, calculate percentage of the current number
            if (prev.operation && prev.previousNumber) {
                const prevNum = parseFloat(prev.previousNumber);
                const currentNum = parseFloat(prev.currentNumber);
                let percentage: number;

                // Calculate the percentage based on the current operation
                switch (prev.operation) {
                    case "+":
                        percentage = prevNum + prevNum * (currentNum / 100);
                        break;
                    case "-":
                        percentage = prevNum - prevNum * (currentNum / 100);
                        break;
                    case "×":
                        percentage = prevNum * (currentNum / 100);
                        break;
                    case "÷":
                        percentage = prevNum / (currentNum / 100);
                        break;
                    default:
                        percentage = currentNum / 100;
                }

                return {
                    previousNumber: percentage.toString(),
                    operation: prev.operation,
                    currentNumber: "0",
                    displayOperation: `${percentage} ${prev.operation}`,
                    isNewNumber: true,
                };
            }

            // If no operation, just calculate percentage of current number
            const newNumber = (parseFloat(prev.currentNumber) / 100).toString();
            return {
                ...prev,
                currentNumber: newNumber,
                displayOperation: newNumber,
            };
        });
    };

    return (
        <div className="w-full max-w-md mx-auto rounded-lg shadow-lg">
            <div className="bg-white p-5 rounded-lg">
                {/* Display */}
                <div className="text-right text-3xl text-gray-400 font-mono mb-2 min-h-[48px]">
                    {state.displayOperation || state.currentNumber}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-2">
                    {/* Row 1 */}
                    <CalculatorButton label="C" type="function" onClick={clear} />
                    <CalculatorButton label="⌫" type="function" onClick={backspace} />
                    <CalculatorButton label="%" type="function" onClick={calculatePercentage} />
                    <CalculatorButton
                        label="÷"
                        type="operation"
                        onClick={() => handleOperation("÷")}
                    />

                    {/* Row 2 */}
                    <CalculatorButton label="7" type="number" onClick={() => handleNumber("7")} />
                    <CalculatorButton label="8" type="number" onClick={() => handleNumber("8")} />
                    <CalculatorButton label="9" type="number" onClick={() => handleNumber("9")} />
                    <CalculatorButton
                        label="×"
                        type="operation"
                        onClick={() => handleOperation("×")}
                    />

                    {/* Row 3 */}
                    <CalculatorButton label="4" type="number" onClick={() => handleNumber("4")} />
                    <CalculatorButton label="5" type="number" onClick={() => handleNumber("5")} />
                    <CalculatorButton label="6" type="number" onClick={() => handleNumber("6")} />
                    <CalculatorButton
                        label="-"
                        type="operation"
                        onClick={() => handleOperation("-")}
                    />

                    {/* Row 4 */}
                    <CalculatorButton label="1" type="number" onClick={() => handleNumber("1")} />
                    <CalculatorButton label="2" type="number" onClick={() => handleNumber("2")} />
                    <CalculatorButton label="3" type="number" onClick={() => handleNumber("3")} />
                    <CalculatorButton
                        label="+"
                        type="operation"
                        onClick={() => handleOperation("+")}
                    />

                    {/* Row 5 */}
                    <CalculatorButton
                        label="0"
                        type="number"
                        onClick={() => handleNumber("0")}
                        className="col-span-2"
                    />
                    <CalculatorButton label="." type="number" onClick={() => handleNumber(".")} />
                    <CalculatorButton label="=" type="operation" onClick={calculate} />
                </div>
            </div>
        </div>
    );
}
