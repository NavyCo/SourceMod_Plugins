#include <sourcemod>
public Plugin:myinfo =
{
 name = "Internet - Websites",
 author = "NavyCommander",
 description = "Yolo - Internet",
 version = "1.0",
 url = "N/A"
}

public OnPluginStart() {
  RegConsoleCmd("sm_google", google, "Google");
  RegConsoleCmd("sm_bing", bing, "Bing");
}

// Plugin Info
public Action:info(client, args)
{
 ShowMOTDPanel(client, "[|GOOGLE|]", "http://Google.com", MOTDPANEL_TYPE_URL)
 return Plugin_Handled;
}

// Google.com
public Action:google(client, args)
{
 ShowMOTDPanel(client, "[|GOOGLE|]", "http://Google.com", MOTDPANEL_TYPE_URL)
 return Plugin_Handled;
}
