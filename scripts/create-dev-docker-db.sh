#!/bin/sh

docker run -d -p 5432:5432 --name webauthn-db -e POSTGRES_PASSWORD=pass postgres
