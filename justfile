run-server:
	docker-compose up --build -d
tear-server:
	docker-compose down

dev-web:
	yarn --cwd web dev
