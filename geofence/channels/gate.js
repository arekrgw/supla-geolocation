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
    gateStatus = await g.json();

    if (inGreenZone && gateStatus.hi && gateStatus.partial_hi) {
      try {
        fetch(`${channel.toggle}/open-close`, { method: "GET" });
      } catch (er) {}
    } else if (!inGreenZone && !gateStatus.hi && !gateStatus.partial_hi) {
      try {
        fetch(`${channel.toggle}/open-close`, { method: "GET" });
      } catch (er) {}
    }
  } catch (er) {}
};

export default gate;
