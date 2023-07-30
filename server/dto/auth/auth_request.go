package authdto

type RegisterRequest struct {
	ID       int    `json:"id" gorm:"primaryKey:autoIncrement"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)" validate:"required"`
	Username string `json:"username" gorm:"type: varchar(255)" validate:"required"`
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: varchar(255)" validate:"required"`
	Role     string `json:"role" gorm:"type: text" validate:"required"`
	Gender   string `json:"gender" gorm:"type: text" validate:"required"`
	Phone    string `json:"phone" gorm:"type: text" validate:"required"`
	Address  string `json:"address" gorm:"type: text" validate:"required"`
}

type LoginRequest struct {
	Username string `json:"username" gorm:"type: varchar(255)" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

type ChangePhoto struct {
	Image string `json:"image" form:"image"`
}
