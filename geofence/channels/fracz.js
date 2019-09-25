const fracz = async (channel, inGreenZone) => {
  if (inGreenZone) {
    console.log("OPEN");
    fetch(`${channel.on}`, { method: "GET" });
  } else if (!inGreenZone) {
    console.log("Close");
    fetch(`${channel.off}`, { method: "GET" });
  } else console.log("NONE");
};

export default fracz;
