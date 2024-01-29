default:
	just --list

run-dev-server:
	just server/run-dev

run-dev-website:
	just website/run-dev

migrate-server:
	just server/migrate

bootstrap: install-node-modules
	just server/bootstrap
	just website/bootstrap

install-node-modules:
	#!/bin/zsh

	bun i
