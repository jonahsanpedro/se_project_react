const baseUrl = "http://localhost:3001";

export function processResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(processResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(processResponse);
}

function deleteCard({ id }) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(processResponse);
}

export { getItems, addItem, deleteCard };
