const gate = async (channel, inGreenZone) => {
  let gateStatus;
  try {
    const g = await fetch(`${channel.toggle}/read`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const gateStatus = await g.json();

    if (inGreenZone && gateStatus.hi && gateStatus.partial_hi) {
      console.log("OPEN");
      try {
        fetch(`${channel.toggle}/open-close`, { method: "GET" });
      } catch (er) {}
    } else if (!inGreenZone && !gateStatus.hi && !gateStatus.partial_hi) {
      console.log("Close");
      try {
        fetch(`${channel.toggle}/open-close`, { method: "GET" });
      } catch (er) {}
    } else console.log("NONE");
  } catch (er) {}
};

export default gate;
