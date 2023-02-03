package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/kamaal111/webauthn-play/user"
)

var Database *gorm.DB

func Connect() {
	dsn := "host=localhost user=postgres password=pass dbname=webauthn-db port=5432 sslmode=disable TimeZone=Europe/Amsterdam"
	Database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln("failed to connect database")
	}

	Database.AutoMigrate(&user.User{})
}
