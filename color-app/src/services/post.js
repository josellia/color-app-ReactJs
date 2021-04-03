const createColor = (nome, decimal) => {
  const endpoint = "http://localhost:4000/list";

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, decimal }),
  }).then((data) => data.json());
};

export default createColor;
