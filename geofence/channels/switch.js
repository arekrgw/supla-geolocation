const switchCH = async (channel, inGreenZone) => {
  let switchStatus;
  try {
    const g = await fetch(`${channel.toggle}/read`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    switchStatus = await g.json();
    if (!switchStatus.on && inGreenZone) {
      try {
        fetch(`${channel.toggle}/toggle`, { method: "GET" });
      } catch (er) {}
    } else if (switchStatus.on && !inGreenZone) {
      try {
        fetch(`${channel.toggle}/toggle`, { method: "GET" });
      } catch (er) {}
    }
  } catch (er) {}
};

export default switchCH;
