#include <sourcemod>
#include <smlib>
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
  RegConsoleCmd("sm_web", info, "Info on Nicholas's Web app.");
}


// Plugin Info
public Action:info(client, args)
{
 PrintToChat(client, "Navy's Web Plugin-");
 PrintToChat(client, "!Google")
 PrintToChat(client, "!Bing")
}


// Google.com
public Action:google(client, args)
{
 ShowMOTDPanel(client, "[|GOOGLE|]", "http://Google.com", MOTDPANEL_TYPE_URL)
 return Plugin_Handled;
}
// Bing.com
public Action:bing(client, args)
{
 ShowMOTDPanel(client, "[|BING|]", "http://Bing.com", MOTDPANEL_TYPE_URL)
 return Plugin_Handled;
}
