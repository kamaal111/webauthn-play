package main

import (
	"github.com/kamaal111/webauthn-play/database"
	"github.com/kamaal111/webauthn-play/router"
	"github.com/kamaal111/webauthn-play/user"
)

func main() {
	db := database.Connect()
	router.Start(db)
	user.InitializeWebauthn()
}
