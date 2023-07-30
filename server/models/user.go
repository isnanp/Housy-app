package models

import "time"

type User struct {
	ID        int       `json:"id" gorm:"primaryKey:autoIncrement"`
	Fullname  string    `json:"fullname" gorm:"type: varchar(255)"`
	Username  string    `json:"username" gorm:"type: varchar(255)"`
	Email     string    `json:"email" gorm:"type: varchar(255)"`
	Password  string    `json:"password" gorm:"type: varchar(255)"`
	Role      string    `json:"role" gorm:"type: varchar(255)"`
	Gender    string    `json:"gender" gorm:"type: varchar(255)"`
	Phone     string    `json:"phone" gorm:"type: varchar(255)"`
	Address   string    `json:"address" gorm:"type: text"`
	Image     string    `json:"image" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type UsersProfileResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname" `
	Username string `json:"username" `
	Email    string `json:"email"`
	Role     string `json:"role"`
	Gender   string `json:"gender" `
	Phone    string `json:"phone" `
	Address  string `json:"address" `
	Image    string `json:"image" `
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
