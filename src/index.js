/**
 * Small dependency-free example module for the GitHub Actions CI exercise.
 */
function greet(name = "GitHub Actions") {
  return `Hello, ${name}!`;
}

function add(a, b) {
  return a + b;
}

module.exports = { greet, add };
