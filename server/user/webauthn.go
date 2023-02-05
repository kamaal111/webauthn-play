package user

import (
	"log"

	"github.com/go-webauthn/webauthn/webauthn"
)

// var WebAuthn *webauthn.WebAuthn

func InitializeWebauthn() {
	_, err := webauthn.New(&webauthn.Config{
		RPDisplayName: "Go Webauthn", // Display Name for your site
		// RPID:          "",                         // Generally the FQDN for your site
		RPOrigins: []string{"http://localhost:3000"}, // The origin URLs allowed for WebAuthn requests
		// RPIcon:    "",        // Optional icon URL for your site
	})
	if err != nil {
		log.Fatalln("failed to initialize webauthn")
	}
}

func (user *User) WebAuthnID() []byte {
	return []byte(user.WebauthnID)
}

func (user *User) WebAuthnName() string {
	return user.Email
}

func (user *User) WebAuthnDisplayName() string {
	return user.DisplayName
}

func (user *User) WebAuthnIcon() string {
	return ""
}

func (user *User) WebAuthnCredentials() []webauthn.Credential {
	return []webauthn.Credential{}
}
