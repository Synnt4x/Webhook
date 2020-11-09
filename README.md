# Webhook App for Continious Deployment (CD) - inspired by the wackcoon-hook

This App openes a __Webserver__ on port 5000 and __listens for POST requests__.
For each request the App __rebuilds__ another __App__ defined in the _path_. The other Apps directory has to be on the same level as this directory.

To achieve a continous deployment you first need a DynDNS. I recommend using [noip](https://www.noip.com/), as it is easy to configure (just follow their steps). 
- Second step is to __forward the used port (5000) in your Router__ to your Webserver (probably a Raspberry Pi).
- In the third step you __create a Webhook on GitHub__ and give it your previously configured __Hostname + Port as URL__.
- Last but not least, fire up this App and push some code to your _Want-To-Build-Repo_.

## How does it work?

GitHubs Webhook sends a request to your configured Hostname URL from noip which redirects it to your Raspberry Pis Webserver. Your Webserver listens for the requests and pulls from GitHub in the directory of the Want-To-Build-App.
