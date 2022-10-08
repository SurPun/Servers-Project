const test = require("node:test");
const assert = require("node:assert");
const server = require("../src/server.js");

// Route recieves 'POST' Request ------------------------------------
test("/ Route responds to POST requests", async () => {
    const app = server.listen(9876);
  
    const response = await fetch("http://localhost:9876", {
      method: "POST",
      body: "username=Sammi&opinion=Korean BBQ is the best!",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    app.close();
  
    assert.equal(response.status, 200);
    const body = await response.text();

    assert.match(body, /Sammi/);
    assert.match(body, /Korean BBQ is the best!/);
});

