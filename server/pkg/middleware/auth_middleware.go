package middleware

import (
	dto "housy/dto/result"
	jwtToken "housy/pkg/jwt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

// Create Auth function
func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.Request().Header.Get("Authorization")

		if token == "" {
			return c.JSON(http.StatusUnauthorized, dto.ErrorResult{
				Status:  "Failed",
				Message: "Unauthorized",
			})
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, dto.ErrorResult{
				Status:  "Failed",
				Message: "Unauthorized",
			})
		}

		c.Set("userLogin", claims)
		return next(c)
	}
}
