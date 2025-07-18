import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth } = pkg;

export let client;

export const initWhatsAppBot = () => {
  client = new Client({
    authStrategy: new LocalAuth(), // saves session
  });

  client.on("qr", (qr) => {
    console.log("📱 Scan this QR code to log in:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("✅ WhatsApp bot connected");
  });

  client.initialize();
};

export const sendMessageToGroup = async (groupName, message) => {
  if (!client) {
    console.error("❌ WhatsApp client not ready yet");
    return;
  }

  const chats = await client.getChats();
  const group = chats.find(
    (chat) => chat.isGroup && chat.name.toLowerCase() === groupName.toLowerCase()
  );

  if (!group) {
    console.error(`❌ Group "${groupName}" not found`);
    return;
  }

  await client.sendMessage(group.id._serialized, message);
  console.log(`✅ Message sent to group "${groupName}"`);
};
