import { Hono } from "hono";

const app = new Hono();
let state = 0;
function stressCpu() {
  while (true) {
    Math.sqrt(Math.random());
  }
}
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/stateless-add", (c) => {
  const x = +(c.req.query("x") || 0);
  if (isNaN(x)) {
    return c.text("Invalid X");
  }
  const y = +(c.req.query("y") || 0);
  if (isNaN(y)) {
    return c.text("Invalid y");
  }
  return c.json({ result: x + y });
});

app.get("/add", (c) => {
  const y = +(c.req.query("y") || 0);
  state += y;
  return c.json(state);
});

app.get("/reset", (c) => {
  state = 0;
  return c.json(state);
});

app.get("/crash", (c) => {
  process.exit(0);
});

app.get("/stress", (c) => {
  stressCpu();
  return c.text("STRESS");
});

export default {
  fetch: app.fetch,
  port: 8080,
};
