package router

import (
	"net/http"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
	"github.com/kamaal111/webauthn-play/user"
)

func Start(db *gorm.DB) {
	router := gin.Default()
	v1 := router.Group("/v1")
	user.Routes(v1.Group("/user"), db)
	router.GET("/ping", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	router.Run("127.0.0.1:8080")
}
