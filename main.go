package main

import (
	"github.com/kamaal111/webauthn-play/database"
	"github.com/kamaal111/webauthn-play/router"
)

func main() {
	database.Connect()
	router.Start()
}
