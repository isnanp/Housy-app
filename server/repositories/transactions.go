package repositories

import (
	"fmt"
	"housy/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetTransactionByTenant(TenantID int) ([]models.Transaction, error)
	GetTransactionByOwner(OwnerID int) ([]models.Transaction, error)
	UpdateTransaction(status string, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction

	err := r.db.Preload("Tenant").Preload("Property").Preload("Property.Owner").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction

	err := r.db.Preload("Tenant").Preload("Property").Preload("Property.Owner").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetTransactionByTenant(TenantID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Tenant").Preload("Property").Preload("Property.Owner").Where("tenant_id = ?", TenantID).Order("id DESC").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransactionByOwner(OwnerID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Tenant").
		Preload("Property", func(db *gorm.DB) *gorm.DB {
			return db.Preload("Owner").Where("owner_id = ?", OwnerID)
		}).
		Order("id DESC").Find(&transactions).Error

	return transactions, err
}

func (r *repository) UpdateTransaction(status string, ID int) (models.Transaction, error) {
	var transaction models.Transaction
	fmt.Println(status)

	r.db.First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		r.db.First(&transaction, transaction.ID)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return transaction, err
}
