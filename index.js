import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import session, { Session } from "express-session";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import PatientRoute from "./routes/PatientRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import DicomRoute from "./routes/DicomRoute.js";
import DoctorRoute from "./routes/DoctorRoute.js";
import PermissionRoute from "./routes/PermissionRoute.js";
import DicomSessionRoute from "./routes/DicomSessionRoute.js";
dotenv.config();
const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: "qdqwdhwefcw9812ydugoqdhqwpd91edp",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3001",
//   })
// );

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use("/api/v1", UserRoute);
app.use("/api/v1", PatientRoute);
app.use("/api/v1", AuthRoute);
app.use(RoleRoute);
app.use("/api/v1", DicomRoute);
app.use("/api/v1", DoctorRoute);
app.use(PermissionRoute);
app.use(DicomSessionRoute);
// store.sync();

app.listen(3000, () => {
  console.log("server up running");
});
