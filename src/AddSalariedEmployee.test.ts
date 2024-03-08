describe('AddSalariedEmployee', () => {
  it('should add a salaried employee', () => {
    const empId = 1;
    const t = new AddSalariedEmployee(empId, 'Bob', 'Home', 1000.0);
    t.execute();

    const e = GpayrollDatabase.getEmployee(empId);
    expect(e.getName()).toBe('Bob');

    const pc = e.getClassification();
    expect(pc instanceof SalariedClassification).toBe(true);

    const sc = pc as SalariedClassification;
    expect(sc.getSalary()).toBe(1000.0);

    const ps = e.getSchedule();
    expect(ps instanceof MonthlySchedule).toBe(true);

    const pm = e.getMethod();
    expect(pm instanceof HoldMethod).toBe(true);
  });
});
