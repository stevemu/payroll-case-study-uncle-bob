# Payroll

The payroll case study in Uncle Bob's Agile Software Development book implemented with typescript

## Setup Instructions

### Prerequisites

- Node.js installed on your machine

### Installation

1. **Install ts-node globally:**

   This project requires `ts-node` to execute TypeScript files directly.

   ```bash
   npm install -g ts-node
   ```

## Running the Application

To run the application, execute the following command in your terminal:

```bash
ts-node --esm ./src/App.ts
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
  yarn migrate
  ```
- **Merge migrations**
  - delete all migrations files
  - `npx prisma migrate dev --name merged_migration`
