import mongoose from 'mongoose';
import cors from 'cors';

const uri = "login";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Připojeno k MongoDB"))
.catch(err => console.error("Chyba připojení:", err));

export default mongoose;
