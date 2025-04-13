const mongoose = require('mongoose');

const uri = "mongodb+srv://atlas-sample-dataset-load-67fc02dc78ed993830705c12:48hZArR5tmbHVa02@cluster0.af1jaso.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Připojeno k MongoDB pomocí Mongoose"))
.catch(err => console.error("❌ Chyba připojení:", err));

module.exports = mongoose;
