## Setup

* install ts-node globally: `npm install -g ts-node`

## run

```
ts-node --esm ./src/App.ts
```

## commands

AddEmp <EmpId> "<name>" "<address>" H <hourly-rate>
AddEmp 1 bill home H 10

AddEmp <EmpId> "<name>" "<address>" S <monthly-salary>
AddEmp 1 bill home S 100

AddEmp <EmpId> "<name>" "<address>" C <monthly-salary>
AddEmp 1 bill home C 100 .1

DelEmp <EmpId>
DelEmp 1

TimeCard <EmpId> <date> <hours>
TimeCard 1 2024-01-01 8

SalesReceipt <EmpId> <date> <amount>
SalesReceipt 1 2024-01-01 300

ServiceCharge <MemberId> <amount> <date>
ServiceCharge 1 300 2024-02-10

ChgEmp <EmpId> Name <Name>
ChgEmp 1 Name john

ChgEmp <EmpId> Address <Name>
ChgEmp 1 Address office


ChgEmp <EmpId> Hourly <hourlyRate>
ChgEmp 1 Hourly 50

ChgEmp <EmpId> Salaried <salary>
ChgEmp 1 Salaried 5000

Commissioned <salary> <rate>
ChgEmp 1 Commissioned 5000 0.5

`ChgEmp <EmpId> Hold
ChgEmp 1 Hold

ChgEmp <EmpId> Direct <bank> <account>
ChgEmp 1 Direct boa 123

ChgEmp <EmpId> Mail <address>
ChgEmp 1 Mail office

ChgEmp <EmpId> Member <memberId> Dues <rate>
ChgEmp 1 Member 10 Dues 20

ChgEmp <EmpId> NoMember
ChgEmp 1 NoMember

Payday <date>
Payday 2024-01-02
