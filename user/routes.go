package user

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Routes(router *gin.RouterGroup, db *gorm.DB) {
	router.POST("", func(context *gin.Context) {
		handleCreateUser(context, db)
	})
}
