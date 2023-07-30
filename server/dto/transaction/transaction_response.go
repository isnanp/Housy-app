package transactiondto

type TransactionResponse struct {
	ID         int    `json:"id" gorm:"primaryKey"`
	PropertyID int    `json:"property_id"`
	TenantID   int    `json:"tenant_id"`
	CheckIn    string `json:"checkIn"`
	CheckOut   string `json:"checkOut"`
	Duration   int    `json:"duration"`
	Price      int    `json:"price"`
	Status     string `json:"status" gorm:"default:'pending'"`
}
