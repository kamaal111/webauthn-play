package utils

import (
	"log"
	"os"
)

func UnwrapEnvironment(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalln("POSTGRES_PASSWORD not defined in environment")
	}

	return value
}
