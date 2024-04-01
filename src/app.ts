import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalMiddleware";
import notFoundRoute from "./app/middleware/notFoundRoute";

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
app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
