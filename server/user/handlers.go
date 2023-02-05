package user

import (
	"net/http"
	"net/mail"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/kamaal111/webauthn-play/utils"
)

type CreateUserPayload struct {
	Email       string `json:"email" binding:"required,min=5"`
	DisplayName string `json:"display_name" binding:"required,min=1"`
	WebauthnID  string `json:"webauthn_id" binding:"required,min=16"`
}

type CreateUserResponse struct {
	Email       string `json:"email"`
	DisplayName string `json:"display_name"`
	ID          uint   `json:"id"`
}

func handleCreateUser(context *gin.Context, db *gorm.DB) {
	var payload CreateUserPayload
	err := context.ShouldBindJSON(&payload)
	if err != nil {
		utils.MakeError(context, http.StatusBadRequest, "Invalid payload", err)
		return
	}

	_, err = mail.ParseAddress(payload.Email)
	if err != nil {
		utils.MakeError(context, http.StatusBadRequest, "Invalid email", err)
		return
	}

	user, err := createUser(db, payload.Email, payload.DisplayName, payload.WebauthnID)
	if err != nil {
		utils.MakeError(context, http.StatusConflict, "Email already exists", err)
		return
	}

	response := CreateUserResponse{Email: user.Email, DisplayName: user.DisplayName, ID: user.ID}
	context.JSON(http.StatusCreated, response)
}
