const gateTime = async (channel, inGreenZone, timeoutCallback, timeStatus) => {
  if (timeStatus) {
    let gateStatus;
    try {
      const g = await fetch(`${channel.toggle}/read`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      gateStatus = await g.json();
      if (inGreenZone && gateStatus.hi) {
        try {
          console.log("RUN");
          fetch(`${channel.toggle}/open-close`, { method: "GET" });
          timeoutCallback(channel.time);
        } catch (er) {
          console.log(er);
        }
      } else if (!inGreenZone && !gateStatus.hi) {
        try {
          console.log("RUNOUT");
          fetch(`${channel.toggle}/open-close`, { method: "GET" });
          timeoutCallback(channel.time);
        } catch (er) {
          console.log(er);
        }
      }
    } catch (er) {}
  }
};

export default gateTime;
