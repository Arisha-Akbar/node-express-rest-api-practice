const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = ` 
   <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
   
   </ul>
   `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch(async(req, res) => {
    const id = Number(req.params.id);
    const data = fs.readFile("./MOCK_DATA.json", "utf-8", (err, data)=>{
        res.json( { status: "success"});
    })

//const user = users.find(user => user.id === id);

  })
  .delete(async (req, res) => {
    const id = Number(req.params.id);
    const data = fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
      res.json({ status: "success" });
    });
    //const users = JSON.parse(data);
    const filteredUsers = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredUsers), (err) => {
      if (err) {
        res.json({ status: "error" });
      } else {
        res.json({ status: "success" });
      }
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending" });
  });
});

app.listen(8000, () => console.log(`Server started at port: ${PORT}`));
