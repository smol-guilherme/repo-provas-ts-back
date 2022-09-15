import app from "./index";
import "./config/config";
const PORT: number = Number(process.env.PORT) || 4001;

app.listen(PORT, () =>
  console.log(`Server up and running on PORT ${PORT}@${Date()}`)
);
