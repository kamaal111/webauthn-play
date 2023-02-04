package utils

import (
	"log"

	"github.com/gin-gonic/gin"
)

type Error struct {
	Details string `json:"details"`
}

func MakeError(context *gin.Context, code int, details string, err error) {
	log.Println("Error received:", err)
	errorJSON := Error{details}
	context.AbortWithStatusJSON(code, errorJSON)
}
