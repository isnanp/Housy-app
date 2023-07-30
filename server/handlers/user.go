package handlers

import (
	"context"
	"fmt"
	authdto "housy/dto/auth"
	dto "housy/dto/result"
	"housy/pkg/bcrypt"
	"housy/repositories"
	"net/http"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type userHandlers struct {
	UserRepository repositories.UserRepository
}

func HandlersUser(UserRepository repositories.UserRepository) *userHandlers {
	return &userHandlers{UserRepository}
}

func (h *userHandlers) FindUser(c echo.Context) error {
	user, err := h.UserRepository.FindUser()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: user})

}

func (h *userHandlers) GetUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	user := int(userId)
	User, err := h.UserRepository.GetUser(user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: User})
}

func (h *userHandlers) ChangePassword(c echo.Context) error {
	request := new(authdto.ChangePasswordRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUser(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	isValid := bcrypt.CheckPassword(request.OldPassword, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Status:  "Failed",
			Message: "Wrong Old Password",
		})
	}

	newPassword, err := bcrypt.HashingPassword(request.NewPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	user.Password = newPassword

	data, err := h.UserRepository.ChangePassword(user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success Change Password", Data: data})
}

func (h *userHandlers) ChangePhoto(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "housy"})
	if err != nil {
		fmt.Println(err)
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUser(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	user.Image = resp.SecureURL

	data, err := h.UserRepository.ChangePhoto(user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success Change Password", Data: data})
}
