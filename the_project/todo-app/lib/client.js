const TODO_SERVICE_URL = "http://todo-backend-svc:2560/todos";

export async function getTodos() {
  const response = await fetch(TODO_SERVICE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos. Status: ${response.status}`);
  }

  return response.json();
}

export async function createTodo(description) {
  const response = await fetch(TODO_SERVICE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo. Status: ${response.status}`);
  }
}
