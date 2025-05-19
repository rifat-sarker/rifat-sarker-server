import express, { Application, request, response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Welcome to bike servicing management system");
});

// application routes
app.use("/api", router);


// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);


export default app;
