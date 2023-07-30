package routes

import (
	handlers "housy/handlers"
	"housy/pkg/middleware"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlersUser(userRepository)

	e.GET("/users", h.FindUser)
	e.GET("/user", middleware.Auth(h.GetUser))
	e.PATCH("/changepw", middleware.Auth(h.ChangePassword))
	e.PATCH("/changephoto", middleware.Auth(middleware.UploadFile(h.ChangePhoto)))
}
