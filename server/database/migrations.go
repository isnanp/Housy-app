package database

import (
	"fmt"
	"housy/models"
	"housy/pkg/mysql"
)

func RunMigrations() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Properties{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("migrations failed")
	}

	fmt.Println("migrations SUCCESSFUL")
}
