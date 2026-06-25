// MCQ question pool — covers Lectures 1b through 5
// Excludes: closures, hoisting, every, some

export const MCQ_POOL = [
  // ── Variables & Data Types ──────────────────────────────────────────────
  {
    id: "v1",
    topic: "Variables",
    q: "Which keyword should you use by default for declaring a variable in modern JavaScript?",
    options: ["var", "let", "const", "define"],
    answer: 2,
    explanation: "Use const by default; switch to let only when the value needs to change. Never use var.",
  },
  {
    id: "v2",
    topic: "Variables",
    q: "What is the scope of a variable declared with let inside a block { }?",
    options: ["Global scope", "Function scope", "Block scope", "Module scope"],
    answer: 2,
    explanation: "let is block-scoped — it is only accessible within the nearest enclosing { }.",
  },
  {
    id: "v3",
    topic: "Variables",
    q: "What does this code print?\n\nconst obj = { score: 10 };\nobj.score = 99;\nconsole.log(obj.score);",
    options: ["10", "99", "TypeError", "undefined"],
    answer: 1,
    explanation: "const prevents reassigning the binding, but the object contents can still mutate.",
  },
  {
    id: "v4",
    topic: "Data Types",
    q: "What does typeof null return?",
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    answer: 2,
    explanation: 'typeof null === "object" is a historic JavaScript bug that cannot be fixed.',
  },
  {
    id: "v5",
    topic: "Data Types",
    q: "Which of the following is a falsy value in JavaScript?",
    options: ['"0"', "[]", "{}", "0"],
    answer: 3,
    explanation: 'The number 0 is falsy. "0" (non-empty string), [] and {} are truthy.',
  },
  {
    id: "v6",
    topic: "Data Types",
    q: "Which data types are stored directly on the Stack?",
    options: ["Objects and Arrays", "Functions", "Primitives (number, string, boolean…)", "All types"],
    answer: 2,
    explanation: "Primitives live on the stack. Objects/arrays live on the heap with a stack pointer.",
  },
  {
    id: "v7",
    topic: "Data Types",
    q: "What is the result of: typeof []",
    options: ['"array"', '"object"', '"undefined"', '"list"'],
    answer: 1,
    explanation: 'Arrays are objects in JS, so typeof [] === "object". Use Array.isArray() to check.',
  },
  {
    id: "v8",
    topic: "Data Types",
    q: "What value does an uninitialized variable hold?",
    options: ["null", "0", "undefined", '""'],
    answer: 2,
    explanation: "Declared but uninitialized variables are automatically set to undefined.",
  },
  {
    id: "v9",
    topic: "Type Coercion",
    q: 'What does "5" + 3 evaluate to?',
    options: ["8", '"53"', '"8"', "TypeError"],
    answer: 1,
    explanation: '+ with a string triggers concatenation, so "5" + 3 → "53".',
  },
  {
    id: "v10",
    topic: "Type Coercion",
    q: "Which explicit conversion converts a string to a number?",
    options: ["String(x)", "Boolean(x)", "Number(x)", "Object(x)"],
    answer: 2,
    explanation: "Number(x) explicitly converts a value to a number type.",
  },

  // ── Operators ────────────────────────────────────────────────────────────
  {
    id: "o1",
    topic: "Operators",
    q: "What is the result of 10 % 3?",
    options: ["3", "1", "0.33", "2"],
    answer: 1,
    explanation: "The modulo operator returns the remainder: 10 ÷ 3 = 3 remainder 1.",
  },
  {
    id: "o2",
    topic: "Operators",
    q: "Which operator should you always prefer for equality checks?",
    options: ["==", "===", "=", "!="],
    answer: 1,
    explanation: "=== (strict equality) does not coerce types, avoiding subtle bugs.",
  },
  {
    id: "o3",
    topic: "Operators",
    q: 'What does 5 == "5" evaluate to?',
    options: ["false", "true", "TypeError", "undefined"],
    answer: 1,
    explanation: '== performs type coercion, converting "5" to 5 before comparing.',
  },
  {
    id: "o4",
    topic: "Operators",
    q: 'What does 5 === "5" evaluate to?',
    options: ["true", "false", "TypeError", "null"],
    answer: 1,
    explanation: "=== checks type AND value. Number 5 and string \"5\" are different types.",
  },
  {
    id: "o5",
    topic: "Operators",
    q: "What is the result of: let x = 5; console.log(x++);",
    options: ["6", "5", "4", "undefined"],
    answer: 1,
    explanation: "Postfix x++ returns the current value (5) THEN increments — so it logs 5.",
  },
  {
    id: "o6",
    topic: "Operators",
    q: "What does the && operator return when the left side is falsy?",
    options: ["true", "false", "The left side value", "The right side value"],
    answer: 2,
    explanation: "&& short-circuits: if the left operand is falsy, it returns that value immediately.",
  },
  {
    id: "o7",
    topic: "Operators",
    q: "What is the ternary operator syntax?",
    options: [
      "if (condition) value1 else value2",
      "condition ? value1 : value2",
      "condition ?? value1 : value2",
      "condition -> value1 | value2",
    ],
    answer: 1,
    explanation: "The ternary: condition ? valueIfTrue : valueIfFalse",
  },
  {
    id: "o8",
    topic: "Operators",
    q: "What is x += 5 equivalent to?",
    options: ["x = 5", "x = x - 5", "x = x + 5", "x = x * 5"],
    answer: 2,
    explanation: "+= is a compound assignment: x += 5 is shorthand for x = x + 5.",
  },
  {
    id: "o9",
    topic: "Operators",
    q: "What does the || operator return when the left side is truthy?",
    options: ["false", "true", "The left side value", "The right side value"],
    answer: 2,
    explanation: "|| short-circuits: if the left is truthy, it returns that value without evaluating right.",
  },
  {
    id: "o10",
    topic: "Operators",
    q: "What is the result of: 2 ** 3?",
    options: ["6", "8", "9", "5"],
    answer: 1,
    explanation: "** is the exponentiation operator: 2 ** 3 = 2³ = 8.",
  },

  // ── Control Flow ─────────────────────────────────────────────────────────
  {
    id: "c1",
    topic: "Control Flow",
    q: "Which of these values is truthy?",
    options: ["0", '""', "null", '"hello"'],
    answer: 3,
    explanation: 'Any non-empty string is truthy. 0, "", and null are all falsy.',
  },
  {
    id: "c2",
    topic: "Control Flow",
    q: "What happens if you forget a break in a switch case?",
    options: [
      "SyntaxError",
      "The case is skipped",
      "Execution falls through to the next case",
      "Nothing different",
    ],
    answer: 2,
    explanation: "Without break, execution falls through to the next case block.",
  },
  {
    id: "c3",
    topic: "Control Flow",
    q: "What does the continue statement do inside a loop?",
    options: [
      "Exits the loop",
      "Restarts the program",
      "Skips the current iteration and goes to the next",
      "Pauses execution",
    ],
    answer: 2,
    explanation: "continue skips the rest of the current loop body and moves to the next iteration.",
  },
  {
    id: "c4",
    topic: "Control Flow",
    q: "What is the difference between while and do...while?",
    options: [
      "No difference",
      "do...while always executes the body at least once",
      "while always executes at least once",
      "do...while checks condition before executing",
    ],
    answer: 1,
    explanation: "do...while checks the condition AFTER running the body, so it always runs at least once.",
  },
  {
    id: "c5",
    topic: "Control Flow",
    q: "How many times does this loop run?\n\nfor (let i = 0; i < 5; i++) { }",
    options: ["4", "5", "6", "Infinite"],
    answer: 1,
    explanation: "i goes 0,1,2,3,4 — that's 5 iterations (i < 5 stops before i reaches 5).",
  },
  {
    id: "c6",
    topic: "Control Flow",
    q: "What does break do inside a loop?",
    options: [
      "Skips the current iteration",
      "Exits the entire loop immediately",
      "Goes to the next loop",
      "Throws an error",
    ],
    answer: 1,
    explanation: "break immediately exits the loop — no more iterations run.",
  },
  {
    id: "c7",
    topic: "Control Flow",
    q: "Which is the correct syntax for an if-else chain?",
    options: [
      "if () {} elif {} else {}",
      "if () {} else if () {} else {}",
      "if () {} elseif () {} else {}",
      "if () {} then {} else {}",
    ],
    answer: 1,
    explanation: "JavaScript uses else if (two separate words), not elif or elseif.",
  },
  {
    id: "c8",
    topic: "Control Flow",
    q: "What is printed?\n\nfor (let i = 0; i < 3; i++) {\n  if (i === 1) continue;\n  console.log(i);\n}",
    options: ["0 1 2", "0 2", "1 2", "0 1"],
    answer: 1,
    explanation: "When i===1, continue skips the log. So 0 and 2 are printed.",
  },

  // ── Functions ─────────────────────────────────────────────────────────────
  {
    id: "f1",
    topic: "Functions",
    q: "What does a function return if no return statement is written?",
    options: ["0", "null", "undefined", "false"],
    answer: 2,
    explanation: "A function with no return statement implicitly returns undefined.",
  },
  {
    id: "f2",
    topic: "Functions",
    q: "Which is an arrow function syntax for doubling a number?",
    options: [
      "function(x) => x * 2",
      "x => x * 2",
      "arrow x { return x * 2 }",
      "(x) -> x * 2",
    ],
    answer: 1,
    explanation: "Arrow function: (params) => expression. x => x * 2 is the concise form.",
  },
  {
    id: "f3",
    topic: "Functions",
    q: "What is a higher-order function?",
    options: [
      "A function with many parameters",
      "A function that takes/returns another function",
      "A function declared at the top of a file",
      "An async function",
    ],
    answer: 1,
    explanation: "A higher-order function accepts functions as arguments or returns a function.",
  },
  {
    id: "f4",
    topic: "Functions",
    q: "What is a default parameter?",
    options: [
      "A parameter always equal to 0",
      "A parameter used when no argument is passed",
      "A required parameter",
      "A global variable",
    ],
    answer: 1,
    explanation: "Default parameters: function greet(name = 'World') {} — used if no arg is passed.",
  },
  {
    id: "f5",
    topic: "Functions",
    q: "What is a pure function?",
    options: [
      "A function with no parameters",
      "A function that always returns undefined",
      "A function that returns the same output for the same input and has no side effects",
      "A function declared with const",
    ],
    answer: 2,
    explanation: "A pure function: same input → same output, no side effects (no mutation, no I/O).",
  },
  {
    id: "f6",
    topic: "Functions",
    q: "What is the difference between function declaration and function expression?",
    options: [
      "No difference",
      "Declarations are hoisted (can be called before defined); expressions are not",
      "Expressions are faster",
      "Declarations cannot return values",
    ],
    answer: 1,
    explanation: "Function declarations are fully hoisted. Expressions assigned to variables are not.",
  },
  {
    id: "f7",
    topic: "Functions",
    q: "What does the rest parameter ...args collect?",
    options: [
      "The first argument",
      "Only numeric arguments",
      "All remaining arguments into an array",
      "Arguments from another function",
    ],
    answer: 2,
    explanation: "...args collects any number of remaining arguments into an array.",
  },

  // ── Arrays & Objects ──────────────────────────────────────────────────────
  {
    id: "a1",
    topic: "Arrays",
    q: "What does array.push(value) do?",
    options: [
      "Removes the last element",
      "Adds value to the beginning",
      "Adds value to the end",
      "Returns the array length",
    ],
    answer: 2,
    explanation: "push() adds one or more elements to the END of an array and returns the new length.",
  },
  {
    id: "a2",
    topic: "Arrays",
    q: "What does array.pop() return?",
    options: ["The first element", "The last element (and removes it)", "The array length", "undefined"],
    answer: 1,
    explanation: "pop() removes AND returns the last element of the array.",
  },
  {
    id: "a3",
    topic: "Arrays",
    q: "What does array.map(fn) do?",
    options: [
      "Modifies the original array",
      "Returns a new array with fn applied to each element",
      "Filters elements",
      "Finds an element",
    ],
    answer: 1,
    explanation: "map() creates a NEW array by applying the callback to every element.",
  },
  {
    id: "a4",
    topic: "Arrays",
    q: "What does array.filter(fn) return?",
    options: [
      "The first matching element",
      "A new array with only elements where fn returns true",
      "The index of the match",
      "It mutates the array",
    ],
    answer: 1,
    explanation: "filter() returns a new array containing only elements for which the callback returns truthy.",
  },
  {
    id: "a5",
    topic: "Arrays",
    q: "What is the index of the first element in a JavaScript array?",
    options: ["1", "0", "-1", "It varies"],
    answer: 1,
    explanation: "JavaScript arrays are zero-indexed — the first element is at index 0.",
  },
  {
    id: "a6",
    topic: "Arrays",
    q: "What does array.reduce(fn, initial) do?",
    options: [
      "Removes elements",
      "Accumulates array values into a single result",
      "Reverses the array",
      "Counts elements",
    ],
    answer: 1,
    explanation: "reduce() runs the callback with an accumulator, boiling the array down to one value.",
  },
  {
    id: "a7",
    topic: "Arrays",
    q: "Which method returns the index of the first matching element?",
    options: ["findIndex()", "find()", "indexOf()", "Both findIndex() and indexOf()"],
    answer: 3,
    explanation: "Both work: indexOf() for primitives by value; findIndex() for objects with a callback.",
  },
  {
    id: "a8",
    topic: "Objects",
    q: "How do you access the value of key 'name' in object obj?",
    options: ["obj->name", "obj.name or obj['name']", "obj::name", "obj(name)"],
    answer: 1,
    explanation: "Dot notation (obj.name) and bracket notation (obj['name']) both work.",
  },
  {
    id: "a9",
    topic: "Objects",
    q: "What is object destructuring?",
    options: [
      "Deleting an object",
      "Copying an object",
      "Extracting properties into variables using { }",
      "Merging two objects",
    ],
    answer: 2,
    explanation: "const { name, age } = person; extracts those properties into individual variables.",
  },
  {
    id: "a10",
    topic: "Objects",
    q: "What does JSON.stringify() do?",
    options: [
      "Parses a JSON string into a JS object",
      "Converts a JS value to a JSON string",
      "Validates JSON",
      "Merges objects",
    ],
    answer: 1,
    explanation: "JSON.stringify() serializes a JavaScript value into a JSON-format string.",
  },
  {
    id: "a11",
    topic: "Objects",
    q: "What does JSON.parse() do?",
    options: [
      "Converts JS to JSON",
      "Validates a JSON string",
      "Parses a JSON string into a JavaScript value",
      "Formats a JSON string",
    ],
    answer: 2,
    explanation: "JSON.parse() takes a JSON string and converts it back to a JavaScript object/value.",
  },
  {
    id: "a12",
    topic: "Arrays",
    q: "What does array.includes(value) return?",
    options: ["The index", "true or false", "The value itself", "undefined"],
    answer: 1,
    explanation: "includes() returns true if the array contains the value, false otherwise.",
  },
  {
    id: "a13",
    topic: "Arrays",
    q: "Which array method joins all elements into a string?",
    options: ["toString()", "join()", "concat()", "merge()"],
    answer: 1,
    explanation: "join(separator) returns a string by joining all elements with the given separator.",
  },
  {
    id: "a14",
    topic: "Arrays",
    q: "What does array.slice(1, 3) return?",
    options: [
      "Removes elements at index 1 and 3",
      "Returns elements at indices 1 and 2 (end is exclusive)",
      "Returns elements at indices 1, 2 and 3",
      "Modifies the original array",
    ],
    answer: 1,
    explanation: "slice(start, end) extracts from start up to but NOT including end. Original unchanged.",
  },
  {
    id: "a15",
    topic: "Objects",
    q: "How do you add a new key-value pair to an existing object?",
    options: [
      "obj.push(key, value)",
      "obj.add(key, value)",
      "obj.key = value  or  obj['key'] = value",
      "obj.set(key, value)",
    ],
    answer: 2,
    explanation: "Simply assign: obj.newKey = value or obj['newKey'] = value.",
  },
];

// ── Practical / Coding Questions ───────────────────────────────────────────
export const CODING_POOL = [
  {
    id: "p1",
    topic: "Variables",
    title: "Swap Two Variables",
    prompt:
      "Write a function swap(a, b) that returns an array with the values swapped.\n\nExample: swap(3, 7) → [7, 3]",
    starterCode: "function swap(a, b) {\n  // your code here\n}",
    testCases: [
      { input: [3, 7], expected: [7, 3] },
      { input: [10, 20], expected: [20, 10] },
    ],
    validate: (fn) => {
      const r1 = fn(3, 7);
      const r2 = fn(10, 20);
      return (
        Array.isArray(r1) && r1[0] === 7 && r1[1] === 3 &&
        Array.isArray(r2) && r2[0] === 20 && r2[1] === 10
      );
    },
  },
  {
    id: "p2",
    topic: "Operators",
    title: "Even or Odd",
    prompt:
      "Write a function isEven(n) that returns true if n is even, false otherwise.\n\nExample: isEven(4) → true, isEven(7) → false",
    starterCode: "function isEven(n) {\n  // your code here\n}",
    testCases: [
      { input: [4], expected: true },
      { input: [7], expected: false },
      { input: [0], expected: true },
    ],
    validate: (fn) => fn(4) === true && fn(7) === false && fn(0) === true,
  },
  {
    id: "p3",
    topic: "Control Flow",
    title: "FizzBuzz",
    prompt:
      "Write a function fizzBuzz(n) that returns:\n- 'Fizz' if n is divisible by 3\n- 'Buzz' if n is divisible by 5\n- 'FizzBuzz' if divisible by both\n- The number as a string otherwise\n\nExample: fizzBuzz(15) → 'FizzBuzz'",
    starterCode: "function fizzBuzz(n) {\n  // your code here\n}",
    testCases: [
      { input: [15], expected: "FizzBuzz" },
      { input: [9], expected: "Fizz" },
      { input: [10], expected: "Buzz" },
      { input: [7], expected: "7" },
    ],
    validate: (fn) =>
      fn(15) === "FizzBuzz" && fn(9) === "Fizz" && fn(10) === "Buzz" && fn(7) === "7",
  },
  {
    id: "p4",
    topic: "Control Flow",
    title: "Count Down",
    prompt:
      "Write a function countdown(n) that returns an array counting down from n to 1.\n\nExample: countdown(5) → [5, 4, 3, 2, 1]",
    starterCode: "function countdown(n) {\n  // your code here\n}",
    testCases: [
      { input: [5], expected: [5, 4, 3, 2, 1] },
      { input: [3], expected: [3, 2, 1] },
    ],
    validate: (fn) => {
      const r = fn(5);
      return Array.isArray(r) && r.join() === "5,4,3,2,1";
    },
  },
  {
    id: "p5",
    topic: "Functions",
    title: "Calculator",
    prompt:
      "Write a function calculate(a, op, b) that performs the operation (+, -, *, /) and returns the result.\n\nExample: calculate(10, '+', 5) → 15",
    starterCode: "function calculate(a, op, b) {\n  // your code here\n}",
    testCases: [
      { input: [10, "+", 5], expected: 15 },
      { input: [10, "-", 3], expected: 7 },
      { input: [4, "*", 3], expected: 12 },
      { input: [10, "/", 2], expected: 5 },
    ],
    validate: (fn) =>
      fn(10, "+", 5) === 15 &&
      fn(10, "-", 3) === 7 &&
      fn(4, "*", 3) === 12 &&
      fn(10, "/", 2) === 5,
  },
  {
    id: "p6",
    topic: "Arrays",
    title: "Sum of Array",
    prompt:
      "Write a function sumArray(arr) that returns the sum of all numbers in the array.\n\nExample: sumArray([1, 2, 3, 4]) → 10",
    starterCode: "function sumArray(arr) {\n  // your code here\n}",
    testCases: [
      { input: [[1, 2, 3, 4]], expected: 10 },
      { input: [[10, 20, 30]], expected: 60 },
      { input: [[]], expected: 0 },
    ],
    validate: (fn) => fn([1, 2, 3, 4]) === 10 && fn([10, 20, 30]) === 60 && fn([]) === 0,
  },
  {
    id: "p7",
    topic: "Arrays",
    title: "Double Each Element",
    prompt:
      "Write a function doubleAll(arr) that returns a new array where each number is doubled.\n\nExample: doubleAll([1, 2, 3]) → [2, 4, 6]",
    starterCode: "function doubleAll(arr) {\n  // your code here\n}",
    testCases: [
      { input: [[1, 2, 3]], expected: [2, 4, 6] },
      { input: [[5, 10]], expected: [10, 20] },
    ],
    validate: (fn) => {
      const r = fn([1, 2, 3]);
      return Array.isArray(r) && r.join() === "2,4,6";
    },
  },
  {
    id: "p8",
    topic: "Arrays",
    title: "Filter Even Numbers",
    prompt:
      "Write a function getEvens(arr) that returns a new array with only the even numbers.\n\nExample: getEvens([1,2,3,4,5,6]) → [2,4,6]",
    starterCode: "function getEvens(arr) {\n  // your code here\n}",
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6] },
      { input: [[7, 8, 9]], expected: [8] },
    ],
    validate: (fn) => {
      const r = fn([1, 2, 3, 4, 5, 6]);
      return Array.isArray(r) && r.join() === "2,4,6";
    },
  },
  {
    id: "p9",
    topic: "Objects",
    title: "Object Property Extractor",
    prompt:
      "Write a function getFullName(person) that takes an object with firstName and lastName properties and returns the full name as a single string.\n\nExample: getFullName({ firstName: 'Ali', lastName: 'Khan' }) → 'Ali Khan'",
    starterCode: "function getFullName(person) {\n  // your code here\n}",
    testCases: [
      { input: [{ firstName: "Ali", lastName: "Khan" }], expected: "Ali Khan" },
      { input: [{ firstName: "Sara", lastName: "Ahmed" }], expected: "Sara Ahmed" },
    ],
    validate: (fn) =>
      fn({ firstName: "Ali", lastName: "Khan" }) === "Ali Khan" &&
      fn({ firstName: "Sara", lastName: "Ahmed" }) === "Sara Ahmed",
  },
  {
    id: "p10",
    topic: "Control Flow",
    title: "Grade Calculator",
    prompt:
      "Write a function getGrade(score) that returns:\n- 'A' for 90+\n- 'B' for 80–89\n- 'C' for 70–79\n- 'D' for 60–69\n- 'F' below 60\n\nExample: getGrade(85) → 'B'",
    starterCode: "function getGrade(score) {\n  // your code here\n}",
    testCases: [
      { input: [95], expected: "A" },
      { input: [85], expected: "B" },
      { input: [75], expected: "C" },
      { input: [65], expected: "D" },
      { input: [55], expected: "F" },
    ],
    validate: (fn) =>
      fn(95) === "A" && fn(85) === "B" && fn(75) === "C" && fn(65) === "D" && fn(55) === "F",
  },
  {
    id: "p11",
    topic: "Functions",
    title: "Repeat String",
    prompt:
      "Write a function repeatStr(str, n) that returns the string repeated n times.\n\nExample: repeatStr('ha', 3) → 'hahaha'",
    starterCode: "function repeatStr(str, n) {\n  // your code here\n}",
    testCases: [
      { input: ["ha", 3], expected: "hahaha" },
      { input: ["ab", 2], expected: "abab" },
    ],
    validate: (fn) => fn("ha", 3) === "hahaha" && fn("ab", 2) === "abab",
  },
  {
    id: "p12",
    topic: "Arrays",
    title: "Find Maximum",
    prompt:
      "Write a function findMax(arr) that returns the largest number in the array.\n\nExample: findMax([3, 1, 7, 2]) → 7",
    starterCode: "function findMax(arr) {\n  // your code here\n}",
    testCases: [
      { input: [[3, 1, 7, 2]], expected: 7 },
      { input: [[10, 5, 20]], expected: 20 },
    ],
    validate: (fn) => fn([3, 1, 7, 2]) === 7 && fn([10, 5, 20]) === 20,
  },
];
