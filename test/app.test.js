const test = require("node:test");
const assert = require("node:assert/strict");
const { greet, add } = require("../src");

test("greet returns a friendly greeting", () => {
  assert.equal(greet("student"), "Hello, student!");
});

test("greet uses its default name", () => {
  assert.equal(greet(), "Hello, GitHub Actions!");
});

test("add returns the sum of two numbers", () => {
  assert.equal(add(2, 3), 5);
});
