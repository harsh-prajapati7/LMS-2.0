const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.fveng13.mongodb.net",
  (err, records) => {
    console.log("ERROR:");
    console.log(err);

    console.log("\nRECORDS:");
    console.log(records);
  }
);