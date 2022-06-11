install:								### Installing dependencies
	npm install
	cd ./map-server/ && npm install

api-app:								### Launch the api and the app that will be display in the iframe
	npm run start

mapping-server:							### Launch the WorkAdventure server that will display a usable link
	cd ./map-server/ && npm run dev

https-servers:							### Expose local ports of the servers to a subdomain to access it throught https
	npx -y localtunnel --port 7888 --subdomain map-server & npx -y localtunnel --port 6888 --subdomain eat-delivery

project:								### Start the project by launching all the command above
	make api-app & make mapping-server & make https-servers

help: 									### Command List
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
