package user

import (
	"errors"

	"gorm.io/gorm"
)

var ErrUserAlreadyExists = errors.New("user already exists")

type User struct {
	gorm.Model
	Email       string `gorm:"unique"`
	DisplayName string
}

// GORM

func createUser(db *gorm.DB, email string, displayName string) (*User, error) {
	var user User
	db.First(&user, "email = ?", email)
	if user.ID != 0 {
		return nil, ErrUserAlreadyExists
	}

	user = User{Email: email, DisplayName: displayName}
	result := db.Create(&user)
	if result.Error != nil {
		err := result.Error
		result.Error = nil
		return nil, err
	}
	return &user, nil
}
