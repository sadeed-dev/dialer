// const tenantID = '922e94e5-d154-420c-b0dc-2dfde88dcf8c'
const tenantID  = '922e94e5-d154-420c-b0dc-2dfde88dcf8c'

export const msalConfig = {

  auth: {
    // clientId: "8890088f-9b43-4738-846b-6450c843069e", 
    clientId:"042623c1-c1e6-4b84-a633-3d0e2c9877bf",
    authority: `https://login.microsoftonline.com/${tenantID}`,
    redirectUri: "http://localhost:5173/admin/leads", // Update this to your actual redirect URI
    // redirectUri: "https://dialer.startupflora.co/admin/leads",
  },
};

export const loginRequest = {
  scopes: ["User.Read"], 
};
