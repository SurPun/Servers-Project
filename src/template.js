function content(posts, errors = {}, formValues = {}) {
  // Sanitize the user input and makes post list
  const postList = posts.map((post) => {
    return `<li>
                <div class="plate">
                 <span class="inner_plate">
                  <div>
                   <h2>${sanitisation(post.name)}</h2>
                   <p class="comments">${sanitisation(post.comments)}</p>
                   <p>${sanitisation(post.date)}</p>
                  </div>
                </span>
               </div>
              </li>`;
  });

  // HTML Content
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="stylesheet" type="text/css" href="style.css"/>

      <title>Food Opinions!</title>
    </head>

    <body>
      <main>
        <section id="form-container">
        
          <header id="title-header">
            <h1 class="center width-sm"> Food Opinions!</h1>
          </header>
  
          <!-- Submit new comments goes here -->
          <form method="POST" class="center ">
            <label class="sr-only" for="username">Username</label>
            <input id="username" name="username" placeholder="Name" value="${
              formValues.name
            }" />
            ${validation(errors.name)}
            <br />

            <label class="sr-only" for="opinion">Opinions</label>
            <input type="text" id="opinion" name="opinion" placeholder="Share your opinions..." value="${
              formValues.comments
            }"></textarea><br><br>
            ${validation(errors.comments)}
  
            <button type="submit">Serve up your opinion!</button>
          </form>
        </section>
  
        <!-- User comments go here -->
        <div id="table-container">
            <section class="center width-lg">
              <ul class="grid">
                ${postList.join("")}
              </ul>
            </section>
        </div>
      </main>
    </body>
  </html> `;

  return content;
}

// Validate the error message and displays error
function validation(errorMsg) {
  if (errorMsg) {
    return `<p class="error"> ${errorMsg}</p>`;
  }
  return "";
}

// Sanitize the input string
function sanitisation(string) {
  return string.replaceAll("<", "&lt;");
}

module.exports = { content };
