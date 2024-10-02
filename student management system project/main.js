#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000;
const randomId = Math.floor(Math.random() * 90000);
const studentId = "stu" + randomId;
let student = await inquirer.prompt([
    {
        name: "studentName",
        type: "input",
        message: chalk.green("Enter Student name:"),
        validate: function (value) {
            if (value != "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: chalk.green("Choose any one of it:"),
        choices: ["MS Office", "IT", "Typescript", "Javascript", "HTML", "CSS"],
    },
]);
console.log(`\n ${student.courses}`);
const courseFees = {
    "MS Office": 10000,
    "IT": 100000,
    "Typescript": 5000,
    "Javascript": 5000,
    "HTML": 2000,
    "CSS": 2000,
};
console.log(chalk.bgBlue(`${courseFees[student.courses]}`));
let paymentMethod = await inquirer.prompt([
    {
        name: "Payment",
        message: chalk.gray("Payment Method:"),
        type: "list",
        choices: ["Bank Transfer", "Jazz Cash", "Easy Paisa"],
    },
    {
        name: "Amount",
        message: chalk.green("Transferd Money:"),
        type: "input",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            ("Please enter a non-empty value:");
        },
    },
    {
        name: "Balance",
        message: chalk.green("Do you want to check Balance?"),
        type: "confirm",
    },
]);
if (courseFees[student.courses] == paymentMethod.Amount) {
    console.log(chalk.blueBright("Money Transferd."));
    if (paymentMethod.Balance === true) {
        console.log(chalk.yellowBright(`\t Your remaining amount is:${myBalance - paymentMethod.Amount}`));
    }
    else {
        console.log(chalk.green("sure"));
    }
    let confirmation = await inquirer.prompt({
        name: "confirmation",
        message: chalk.blue("\t Are you satisfied with the course? \n Do you want to enroll"),
        type: "confirm",
    });
    if (confirmation.confirmation === true) {
        console.log(chalk.green(`Your Student Id id ${studentId}`));
        console.log(chalk.yellowBright(`Your name: ${student.studentName}`));
        console.log(chalk.green(`your course and it's fees: ${courseFees[student.courses]}`));
        console.log(chalk.yellow(`Your Id: ${studentId}`));
    }
    else if (confirmation.confirmation === false) {
        console.log(chalk.yellow("Thank you for your concern"));
        console.log(chalk.yellow("Your payment will be return back to you."));
    }
}
else {
    console.log(chalk.yellow("\n Your amount is too low to enroll in course"));
    console.log(chalk.yellow("\nThank you!"));
}
