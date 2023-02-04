package user

import (
	"encoding/binary"

	"gorm.io/gorm"

	"github.com/go-webauthn/webauthn/webauthn"
)

type User struct {
	gorm.Model
	Email       string `gorm:"unique"`
	DisplayName string
}

// GORM

func createUser(db *gorm.DB, email string, displayName string) (*User, error) {
	user := User{Email: email, DisplayName: displayName}
	result := db.Create(&user)
	if result.Error != nil {
		err := result.Error
		result.Error = nil
		return nil, err
	}
	return &user, nil
}

// Web authn

func (user *User) WebAuthnID() []byte {
	bytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(bytes, uint64(user.ID))
	return bytes
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
