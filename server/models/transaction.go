package models

type Transaction struct {
	ID         int        `json:"id" gorm:"primaryKey"`
	PropertyID int        `json:"property_id"`
	Property   Properties `json:"property" gorm:"foreignKey:PropertyID"`
	TenantID   int        `json:"tenant_id"`
	Tenant     User       `json:"tenant" gorm:"foreignKey:TenantID"`
	CheckIn    string     `json:"checkIn"`
	CheckOut   string     `json:"checkOut"`
	Duration   int        `json:"duration"`
	Price      int        `json:"price"`
	Status     string     `json:"status" gorm:"default:'pending'"`
}
