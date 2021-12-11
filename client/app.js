const App = {
  init: () => {
    console.log("Loaded");
  },
  web3Provider: "",
  contracts: {},
  tasksContract: {},
  account: "",

  loadEthereum: async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Meta Mask extension is required");
      return;
    }
    this.web3Provider = window.ethereum;

    await App.loadAccount();
    await App.loadContract();
    App.render();
    await App.renderTasks();
  },

  render: async () => {
    const wallet = document.getElementById("wallet");
    wallet.textContent = "Wallet: " + App.account;
  },

  renderTasks: async () => {
    const taskCounter = await App.tasksContract.counter();
    const counter = taskCounter.toNumber();
    let html = "";
    for (let i = 1; i <= counter; i++) {
      const task = await App.tasksContract.tasks(i);
      const taskId = task[0];
      const taskTitle = task[1];
      const taskDescription = task[2];
      const taskStatus = task[3];
      const taskCreatedAt = task[4];

      let taskElement = `
      <div class="mt-2">
      
        <div class="card card-body rounded-0">
            <div class="card-header rounded-0 d-flex justify-content-between aling-items-center">
                <span >${taskTitle}</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" ${App.ifChecked(
                      taskStatus
                    )}  onchange="toggleStatus(${i})"/>
                </div>
            </div>
            <div class=" card-body rounded-0"><span>
            ${taskDescription}
            </span>
            <p class="text-muted">
            createdAt: ${new Date(taskCreatedAt * 1000).toLocaleString()}
            </p></div>

        </div>
      </div>
      `;
      console.log(task);
      html += taskElement;
    }
    document.getElementById("taskList").innerHTML = html;
  },

  ifChecked(status) {
    if (status) {
      return "checked";
    }
  },

  loadContract: async () => {
    const res = await fetch("TaskContract.json");
    const taskContract = await res.json();
    const contract = TruffleContract(taskContract);
    App.contracts.tasksContract = contract;
    App.contracts.tasksContract.setProvider(this.web3Provider);
    App.tasksContract = await App.contracts.tasksContract.deployed();
  },
  loadAccount: async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    App.account = accounts[0];
  },

  createTask: async (title, description) => {
    const result = await App.tasksContract.createTask(title, description, {
      from: App.account,
    });
    console.log(result.logs[0]);
  },
};

App.init();

function setWallet() {
  App.loadEthereum();
}
