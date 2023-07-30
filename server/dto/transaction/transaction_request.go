package transactiondto

type TransactionRequest struct {
	ID         int    `json:"id"`
	PropertyID int    `json:"property_id" form:"property_id"`
	TenantID   int    `json:"tenant_id" form:"tenant_id"`
	CheckIn    string `json:"checkIn" form:"check_in"`
	CheckOut   string `json:"checkOut" form:"check_out"`
	Duration   int    `json:"duration" form:"duration"`
	Price      int    `json:"price" form:"price"`
	Status     string `json:"status" gorm:"default:'pending'"`
}
