package models

import (
	"gorm.io/datatypes"
)

type Properties struct {
	ID          int                  `json:"id" gorm:"primaryKey"`
	Name        string               `json:"name"`
	OwnerID     int                  `json:"owner_id"`
	Owner       UsersProfileResponse `json:"owner" gorm:"foreignKey:OwnerID"`
	City        string               `json:"city"`
	Address     string               `json:"address"`
	Price       int                  `json:"price"`
	Type        string               `json:"type"`
	Amenity     datatypes.JSON       `json:"amenity"`
	Bedrooms    int                  `json:"bedrooms"`
	Bathrooms   int                  `json:"bathrooms"`
	Images      string               `json:"images"`
	Description string               `json:"description"`
}

func (Properties) TableName() string {
	return "properties"
}
