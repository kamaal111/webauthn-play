package user

import (
	"gorm.io/gorm"
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
