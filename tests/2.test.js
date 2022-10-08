const test = require("node:test");
const assert = require("node:assert");
const server = require("../src/server.js");

// Test for ZACK'S Post --------------------------------
test("Home route has 'ZACK's' name", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876");
  const body = await response.text();
  app.close();

  assert.equal(response.status, 200);

  assert.match(body, /(<h2>Zack<.h2>)/i);
});

test("Home route has Zack's 'OPINION'", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876");
  const body = await response.text();
  app.close();

  assert.equal(response.status, 200);

  assert.match(body, /(<p class="comments">Pizza's are the best!<\/p>)/),
    `Expected HTML to include Zack's OPINION but received:\n${body}\n`;
});

test("Home route has 'DATE' of Zack's post", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876");
  const body = await response.text();
  app.close();

  assert.equal(response.status, 200);

  assert.match(body, /(<p>19\/12\/2022<\/p>)/i),
    `Expected HTML to include default template posts with date 19/12/2022 but received:\n${body}\n`
});

// Test for ANNA'S Post --------------------------------
test("Home route has the 'ANNA'S' post", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876");
  const body = await response.text();
  app.close();


  assert.equal(response.status, 200);
  assert.match(body, /(<h2>Anna<\/h2>)/i,
    `Expected HTML to include default template posts with name Anna but received:\n${body}\n`
  );

  assert.match(body, /(<p class="comments">Donuts are yummy!<\/p>)/i,
    `Expected HTML to include default template posts with donut comment but received:\n${body}\n`
  );

  assert.match(body, /(<p>22\/12\/2022<\/p>)/i,
    `Expected HTML to include default template posts with date 22/12/2022 but received:\n${body}\n`
  );
});
