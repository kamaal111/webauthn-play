package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/kamaal111/webauthn-play/user"
	"github.com/kamaal111/webauthn-play/utils"
)

func Connect() (db *gorm.DB) {
	postgresHost := utils.UnwrapEnvironment("POSTGRES_HOST")
	postgresUser := utils.UnwrapEnvironment("POSTGRES_USER")
	postgresPassword := utils.UnwrapEnvironment("POSTGRES_PASSWORD")
	postgresDatabaseName := utils.UnwrapEnvironment("POSTGRES_DB")

	dsn := fmt.Sprintf("host=%s port=5432 user=%s password=%s dbname=%s sslmode=disable TimeZone=Europe/Amsterdam", postgresHost, postgresUser, postgresPassword, postgresDatabaseName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln("failed to connect database")
	}

	db.AutoMigrate(&user.User{})

	return db
}
