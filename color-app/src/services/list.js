const getList = () => {
  return fetch("http://localhost:4000/list").then((data) => data.json());
};

export default getList;
