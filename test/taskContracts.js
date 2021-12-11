const TaskContract = artifacts.require("TaskContract");

contract("TaskContract", () => {
  before(async () => {
    this.taskContract = await TaskContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = this.taskContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get Tasks List", async () => {
    const taskCounter = await this.taskContract.counter();
    const task = await this.taskContract.tasks(taskCounter);

    assert.equal(task.id.toNumber(), taskCounter);
    assert.equal(task.title, "Welcome");
    assert.equal(task.description, "First Task");
    assert.equal(task.status, false);
  });
  it("task created successfully", async () => {
    const result = await this.taskContract.createTask(
      "some task",
      "description two"
    );

    const taskEvent = result.logs[0].args;
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "some task");
  });

  it("task toggle done", async () => {
    const result = await this.taskContract.toggleStatus(2);
    const eventTask = result.logs[0].args;
    assert.equal(eventTask.status, true);
  });
});
