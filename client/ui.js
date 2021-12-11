const taskForm = document.querySelector("#task-form");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["title"].value;
  const description = taskForm["description"].value;
  await App.createTask(title, description);
});

async function toggleStatus(num) {
  console.log(num);
  const task = await App.tasksContract.toggleStatus(num, { from: App.account });
  window.location.reload();
}
