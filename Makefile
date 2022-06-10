map:
	npm run start

local-input-server:
	cd ./assets/iframe && serve -l 7888

https-input-server:
	npx -yes localtunnel --port 3000 --subdomain input-wa1

server:
	make map & make local-input-server & make https-input-server
