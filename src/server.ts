import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();

// is not permits other frontends access the server, withor cors we can specify what adress can access our server
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen( process.env.PORT || 3333, () => {
  console.log("HTTP server listening on");
});
