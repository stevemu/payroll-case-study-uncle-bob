# Payroll System Case Study

Welcome to our TypeScript implementation of the payroll system, inspired by the case study presented in Uncle Bob's renowned book, *Agile Software Development*. This project aims to bring the concepts discussed in the book to life, demonstrating practical application of agile software development principles.

## About the Project

The payroll system is designed to manage employee payments, incorporating various payroll policies and schedules. It's an excellent example of applying object-oriented design and agile methodologies to solve real-world problems.

Unlike the original case study in the book, this implementation introduces a modern twist: the use of Prisma with a SQLite database for local data storage. This addition showcases how the application can interact with databases, managing data persistence more efficiently and securely.

## Features

- **TypeScript Implementation**: Fully implemented in TypeScript, offering strong typing and modern syntax for improved code quality and maintainability.
- **Database Integration**: Utilizes Prisma ORM to interact with a SQLite database, demonstrating how to integrate database operations seamlessly into application logic.
- **Agile Principles in Action**: Follows agile software development practices, illustrating how to apply these principles in the context of a complex software project.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- pnpm installed

### Installation

1. **Install packages:**

   ```bash
   pnpm install
   ```

2. **Set up local database:**

   This project requires `ts-node` to execute TypeScript files directly.

   ```bash
   pnpm migrate
   ```

## Running the Application

To run the application, execute the following command in your terminal:

```bash
pnpm app
```

## Using the Application

The application supports various commands to manage employees and their transactions. Below is a guide on how to use each command:

### Adding Employees

- **Add Hourly Employee:**
  ```
  AddEmp <EmpId> <name> <address> H <hourly-rate>
  Example: AddEmp 1 bill home H 10
  ```

- **Add Salaried Employee:**
  ```
  AddEmp <EmpId> <name> <address> S <monthly-salary>
  Example: AddEmp 1 bill home S 100
  ```

- **Add Commissioned Employee:**
  ```
  AddEmp <EmpId> <name> <address> C <monthly-salary> <commission-rate>
  Example: AddEmp 1 bill home C 100 .1
  ```

### Deleting an Employee

```
DelEmp <EmpId>
Example: DelEmp 1
```

### Time Cards

```
TimeCard <EmpId> <date> <hours>
Example: TimeCard 1 2024-01-01 8
```

### Sales Receipts

```
SalesReceipt <EmpId> <date> <amount>
Example: SalesReceipt 1 2024-01-01 300
```

### Service Charges

```
ServiceCharge <MemberId> <date> <amount> 
Example: ServiceCharge 1 300 2024-02-10
```

### Employee Changes

- **Change Name:**
  ```
  ChgEmp <EmpId> Name <Name>
  Example: ChgEmp 1 Name john
  ```

- **Change Address:**
  ```
  ChgEmp <EmpId> Address <address>
  Example: ChgEmp 1 Address office
  ```

- **Change to Hourly:**
  ```
  ChgEmp <EmpId> Hourly <hourlyRate>
  Example: ChgEmp 1 Hourly 50
  ```

- **Change to Salaried:**
  ```
  ChgEmp <EmpId> Salaried <salary>
  Example: ChgEmp 1 Salaried 5000
  ```

- **Change to Commissioned:**
  ```
  ChgEmp <EmpId> Commissioned <salary> <rate>
  Example: ChgEmp 1 Commissioned 5000 0.5
  ```

- **Payment Methods:**
  ```
  - Hold: ChgEmp <EmpId> Hold
  - Direct: ChgEmp <EmpId> Direct <bank> <account>
  - Mail: ChgEmp <EmpId> Mail <address>
  ```

- **Union Membership:**
  ```
  - Join: ChgEmp <EmpId> Member <memberId> Dues <rate>
  - Leave: ChgEmp <EmpId> NoMember
  ```

### Running Payroll

```
Payday <date>
Example: Payday 2024-01-02
```

# Prisma commands

- **migrate after updating schema**
  ```
  pnpm migrate
  ```
- **Merge migrations**
  - delete all migrations files
  - `npx prisma migrate dev --name merged_migration`

# other payroll references

- https://github.com/grochon/payroll/tree/master
- https://cleancodejava.com/uncle-bob-payroll-case-study-full-implementation/
