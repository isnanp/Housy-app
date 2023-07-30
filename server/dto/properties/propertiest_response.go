package propertiesdto

import "gorm.io/datatypes"

type PropertiesResponse struct {
	Name        string         `json:"name"`
	City        string         `json:"city"`
	Address     string         `json:"address"`
	Price       int            `json:"price"`
	Type        string         `json:"type"`
	Amenity     datatypes.JSON `json:"amenity"`
	Bedrooms    int            `json:"bedrooms"`
	Bathrooms   int            `json:"bathrooms"`
	Images      string         `json:"images"`
	Description string         `json:"description"`
}
