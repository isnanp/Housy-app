package repositories

import (
	"housy/models"

	"gorm.io/gorm"
)

type PropertiesRepository interface {
	CreateProperties(Properties models.Properties) (models.Properties, error)
	FindProperties() ([]models.Properties, error)
	GetProperty(ID int) (models.Properties, error)
	FilterCity(city string) ([]models.Properties, error)
	FilterMulti(Type string, Bedrooms, Bathrooms, Price int) ([]models.Properties, error)
	FilterCityMulti(City, Type string, Bedrooms, Bathrooms, Price int) ([]models.Properties, error)
}

func RepositoryProperties(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateProperties(properties models.Properties) (models.Properties, error) {
	err := r.db.Create(&properties).Error

	return properties, err
}

func (r repository) FindProperties() ([]models.Properties, error) {
	var Properties []models.Properties
	err := r.db.Preload("Owner").Find(&Properties).Error

	return Properties, err
}

func (r repository) GetProperty(ID int) (models.Properties, error) {
	var property models.Properties
	err := r.db.Preload("Owner").First(&property, ID).Error

	return property, err
}

func (r *repository) FilterCity(city string) ([]models.Properties, error) {
	var Properties []models.Properties
	err := r.db.Where("city = ?", city).Preload("Owner").Find(&Properties).Error

	return Properties, err
}

func (r *repository) FilterMulti(Type string, Bedrooms, Bathrooms, Price int) ([]models.Properties, error) {
	var properties []models.Properties

	err := r.db.Where("type = ? AND bedrooms = ? AND bathrooms = ? AND price < ?", Type, Bedrooms, Bathrooms, Price).Preload("Owner").Find(&properties).Error

	return properties, err
}

func (r *repository) FilterCityMulti(City, Type string, Bedrooms, Bathrooms, Price int) ([]models.Properties, error) {
	var properties []models.Properties

	err := r.db.Where("city = ? AND type = ? AND bedrooms = ? AND bathrooms = ? AND price < ?", City, Type, Bedrooms, Bathrooms, Price).Preload("Owner").Find(&properties).Error

	return properties, err
}
