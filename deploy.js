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

sudo apt install git unzip -y
curl -fsSL https://deno.land/install.sh | sudo sh -s -- -y

git clone https://github.com/knowlearning/relay.git
cd relay
sudo /root/.deno/bin/deno --allow-net ./server.js
`

await createFirewallRule('GCP', httpFirewallRule, { project, targetTag: httpFirewallTag })
const staticIpAddress = await reserveStaticIp('GCP', staticIpName, { project, region })
await createInstance('GCP', instance, { project, region, zone, machine, image, script, tags: [httpFirewallTag], staticIpAddress })
