const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.frxtt5y.mongodb.net",
  (err, records) => {
    console.log("ERROR:");
    console.log(err);

    console.log("\nRECORDS:");
    console.log(records);
  }
);