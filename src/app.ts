import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();
// some middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Flat share server is running",
  });
});
app.use("/api", router);

export default app;
