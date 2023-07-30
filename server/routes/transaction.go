package routes

import (
	"housy/handlers"
	"housy/pkg/middleware"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlersTransactions(transactionRepository, userRepository)

	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transactions", h.FindTransaction)
	e.GET("/transaction/:id", h.GetTransaction)
	e.GET("/transactions-tenant", middleware.Auth(h.GetTransactionByTenant))
	e.GET("/transactions-owner", middleware.Auth(h.GetTransactionByOwner))
	e.GET("/getpayment/:id", h.GetPayment)
	e.POST("/notification", h.Notification)
}
