package router

import (
	"net/http"

	"gorm.io/gorm"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/kamaal111/webauthn-play/user"
	"github.com/kamaal111/webauthn-play/utils"
)

func Start(db *gorm.DB) {
	serverAddress := utils.UnwrapEnvironment("SERVER_ADDRESS")
	router := gin.Default()

	router.Use(cors.Default())

	v1 := router.Group("/v1")
	user.Routes(v1.Group("/user"), db)
	router.GET("/ping", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.Run(serverAddress)
}
