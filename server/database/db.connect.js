const mongoose = require("mongoose");
function initializeDBConnection() {
	mongoose
		.connect(
			"mongodb+srv://dbBakeful:dbBakefulPassword@bakeful-cluster.pi3dd.mongodb.net/inventory?retryWrites=true&w=majority",
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		)
		.then(() => console.log("successfully connected"))
		.catch((error) => console.error("mongoose connection failed...", error));
}
module.exports = { initializeDBConnection };
