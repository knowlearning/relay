import createInstance from './create-instance.js'
import reserveStaticIp from './reserve-static-ip.js'
import createFirewallRule from './create-firewall-rule.js'

const project = "relay-446721"
const region = "us-central1"
const zone = `${region}-a`
const machine = "e2-micro"
const image = "projects/debian-cloud/global/images/family/debian-11"
const instance = "relay-instance"
const staticIpName = "relay-static-ip"
const httpFirewallRule = "http-firewall-rule"
const httpFirewallTag = "http-firewall-tag"

const script = `#!/bin/bash

sudo apt install netcat-openbsd

# Simple HTTP Server in Bash
PORT=80

echo "Starting HTTP server on port $PORT..."
while true; do
  # Wait for a connection and respond immediately
  {
    echo -e "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello, World!";
  } | sudo nc -N -l -p $PORT
done
`

await createFirewallRule('GCP', httpFirewallRule, { project, targetTag: httpFirewallTag })
const staticIpAddress = await reserveStaticIp('GCP', staticIpName, { project, region })
await createInstance('GCP', instance, { project, region, zone, machine, image, script, tags: [httpFirewallTag], staticIpAddress })
