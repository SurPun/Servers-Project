// Import server.js
const server = require("./server.js");

// Listen to PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
