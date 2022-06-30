import { app } from "./app.js";

const port: number = 3000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
