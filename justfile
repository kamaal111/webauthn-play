default:
	just --list

run-dev-server:
	just server/run-dev

run-dev-website:
	just website/run-dev

migrate-server:
	just server/migrate

bootstrap:
	just server/bootstrap
	just website/bootstrap
