const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "237679958372",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05ERkVoUkpqTDJZSG9aR3kzTFRJWXdkYU1TTHlqRmlCUTNTRHl3ekMydz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSS9iQkVnNUJjZEdHS1VLM3lzVlVBVnRqM0ZvMGJWTEZJbVZYbXc0VTdtOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhT01qbTlmTG54SlhzWFRyYXF2R0MrNXdJUnZOQ2xtOTBlclJVZ0kwSkhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJES0RUSjV6M09PTm9rSzJSOTZ6ck5BWmhvUGpzcm5GdDFsaFl2Z1pzOWo0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldEajB0Qy9nRXlNdTR6Nk9mdGdpY3RJWFI2YmlQUjUzN3E3VnhoNkRVSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBoSW9tREVCOTh1MkxxelNScXNyTm9ZWFFDZjVVSkpFaWJsMW1ycHFPMTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlobFNWS0E2dkhSOWU2emVEYVFpNFd3RmdodklpdXFUQnFwKytlcllGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDVBK0p6L0lLcHE3bnVSemFXenlZT21QU3hOQTlRYzZvcnZ1elBiQkFYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InF1YmkvbURFSXB6NWZQQzNVUmlnenpDclFlYnNnRWN4TVpoMzR4NmRETDVzdWYwcDBVMWRTVDhXWkVlTlAxVG5maVhZSVRpbENLcFM5L3ZkbGRWVkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiJ0V0RLSEN4dmtjSFBBZFhyb0N3RE1CY1V6Tmdoang0VnlzeUtMSmY2QStJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJRRExSUTIzMiIsIm1lIjp7ImlkIjoiMjM3Njc5OTU4MzcyOjdAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMDc5NTg4ODUyMDgwODY6N0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xDQXNyc0ZFTU9Zd3NBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjBtL0xiT2xSdEYrWVJ4U0UyQXNORTVDaVlOK2RjYzBzZDQxc1l3a1dqU1U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IitycFdBdzBiYTdxakZsYURoeE5XRE10dTloUjl1YUE5MXFNTGwrTWlFVC9oOEFPTXphdTZydFJQRnpiVi8xRThCR3dCQXpvT2NEZm9qYTJRekxsaURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwc3hVVzUzUHIzQ0phR2p6dlNsZU8yaHUxZ3FtMXVFVmx3Q3NSQTZxL1V6V2pCaDdlbTNaZ0I4bWxZdHFKVldGQy9ZWk1EVzE0UnpING1WaGU4MWZBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY3OTk1ODM3Mjo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRKdnkyenBVYlJmbUVjVWhOZ0xEUk9Rb21EZm5YSE5MSGVOYkdNSkZvMGwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTkxNDk2MCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPNkMifQ==', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
