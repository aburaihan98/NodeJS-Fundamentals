const EventEmitter = require("events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on("ring", (period) => {
  console.log(`Yahoo ${period} class  ses`);
});
schoolBell.on("ring", () => {
  console.log("Dhet! Arekta class ache!");
});
schoolBell.on("broken", () => {
  console.log("Oh no! Class ki ar sesh hobena!");
});

schoolBell.emit("ring", "Math");
schoolBell.emit("broken");
