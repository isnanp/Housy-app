package routes

import (
	"housy/handlers"
	"housy/pkg/middleware"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/labstack/echo/v4"
)

func PropertiesRoutes(e *echo.Group) {
	PropertiesRepository := repositories.RepositoryProperties(mysql.DB)
	h := handlers.HandlerProperties(PropertiesRepository)

	e.POST("/add-properties", middleware.Auth(middleware.UploadFile(h.CreateProperties)))
	e.GET("/properties", h.FindProperties)
	e.GET("/property/:id", h.Getproperty)
	e.GET("/filter-city", h.FilterCity)
	e.GET("/filter-multy", h.FilterMulti)
	e.GET("/filter-city-multy", h.FilterCityMulti)
}
