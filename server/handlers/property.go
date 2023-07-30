package handlers

import (
	"context"
	"fmt"
	dto "housy/dto/result"
	"housy/models"
	"housy/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"gorm.io/datatypes"
)

type PropertiesHandlers struct {
	PropertiesRepositories repositories.PropertiesRepository
}

func HandlerProperties(propertiesRepositories repositories.PropertiesRepository) *PropertiesHandlers {
	return &PropertiesHandlers{propertiesRepositories}
}

func (h *PropertiesHandlers) CreateProperties(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("ini data file", dataFile)

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

	price, _ := strconv.Atoi(c.FormValue("price"))
	bedroom, _ := strconv.Atoi(c.FormValue("bedroom"))
	bathroom, _ := strconv.Atoi(c.FormValue("bathroom"))

	request := models.Properties{
		Name:        c.FormValue("name"),
		OwnerID:     int(userId),
		City:        c.FormValue("city"),
		Address:     c.FormValue("address"),
		Price:       price,
		Type:        c.FormValue("type"),
		Amenity:     datatypes.JSON(c.FormValue("amenity")),
		Bedrooms:    bedroom,
		Bathrooms:   bathroom,
		Images:      resp.SecureURL,
		Description: c.FormValue("description"),
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: "Validator error"})
	}

	data, err := h.PropertiesRepositories.CreateProperties(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: "Goblok"})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   data,
	})

}

func (h *PropertiesHandlers) FindProperties(c echo.Context) error {
	properties, err := h.PropertiesRepositories.FindProperties()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: properties})
}

func (h *PropertiesHandlers) Getproperty(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	properties, err := h.PropertiesRepositories.GetProperty(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   properties,
	})

}

func (h *PropertiesHandlers) FilterCity(c echo.Context) error {
	city := c.QueryParam("city")

	properties, err := h.PropertiesRepositories.FilterCity(city)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: properties})
}

func (h *PropertiesHandlers) FilterMulti(c echo.Context) error {
	Type := c.QueryParam("type")
	Bedrooms, _ := strconv.Atoi(c.QueryParam("bedrooms"))
	Bathrooms, _ := strconv.Atoi(c.QueryParam("bathrooms"))
	Price, _ := strconv.Atoi(c.QueryParam("price"))

	properties, err := h.PropertiesRepositories.FilterMulti(Type, Bedrooms, Bathrooms, Price)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: properties})
}

func (h *PropertiesHandlers) FilterCityMulti(c echo.Context) error {
	City := c.QueryParam("city")
	Type := c.QueryParam("type")
	Bedrooms, _ := strconv.Atoi(c.QueryParam("bedrooms"))
	Bathrooms, _ := strconv.Atoi(c.QueryParam("bathrooms"))
	Price, _ := strconv.Atoi(c.QueryParam("price"))

	properties, err := h.PropertiesRepositories.FilterCityMulti(City, Type, Bedrooms, Bathrooms, Price)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: properties})
}
