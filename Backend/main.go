package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"app/exaple/db"
	"app/exaple/handlers"
	"app/exaple/middleware"
)
var (
	url_DB string
	local = false
)

func main() {
	if(local){ url_DB = "mongodb://172.17.0.2:27017" } 
	else {
		url_DB = os.Getenv("MONGODB_URL")
		if url_DB == "" {
			log.Fatal("MONGODB_URL non definito")
		}
	}

	//*Connect to DB
	database, err := db.Init(url_DB, "MyApp")
	if err != nil {
		log.Panic(err)
	}
	defer func() {
		if err := database.Client.Disconnect(context.TODO()); err != nil {
			log.Println("Errore disconnessione DB:", err)
		}
	}()

	http.Handle("/dbmyapp/b2b", handlers.GetDatabase(database))
	http.Handle("/dbmyapp/system", handlers.GetStatusSystem(database))
	http.Handle("/initpackage", handlers.InitPackage(database))

	server := &http.Server{
		Addr:           ":8080",
		Handler:        middleware.Logger(http.DefaultServeMux),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	fmt.Println("Server avviato su http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}

