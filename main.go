package main

import (
	"github.com/kamaal111/webauthn-play/database"
	"github.com/kamaal111/webauthn-play/router"
	"github.com/kamaal111/webauthn-play/user"
)

func main() {
	database.Connect()
	router.Start()
	user.InitializeWebauthn()
}
