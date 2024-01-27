default:
	just --list

run-dev-server:
	just server/run-dev

migrate-server:
	just server/migrate

bootstrap:
	just server/bootstrap
