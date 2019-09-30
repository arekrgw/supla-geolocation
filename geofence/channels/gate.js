import { actionHappend } from "../notifications";

const gate = async (channel, inGreenZone, areaName) => {
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
      try {
        fetch(`${channel.toggle}/open-close`, { method: "GET" });
        actionHappend("Brama się otwiera", areaName);
      } catch (er) {}
    } else if (!inGreenZone && !gateStatus.hi && !gateStatus.partial_hi) {
      try {
        fetch(`${channel.toggle}/open-close`, { method: "GET" });
        actionHappend("Brama się zamyka", areaName);
      } catch (er) {}
    }
  } catch (er) {}
};

export default gate;
