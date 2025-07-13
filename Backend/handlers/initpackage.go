package handlers

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"app/exaple/db"
	"go.mongodb.org/mongo-driver/bson"
)

var databases = []string{"Users", "Services", "APIs"}

type AdminUser struct {
	CompanyName string `json:"companyName"`
	Password string `json:"password"`
}

func InitPackage(database *db.ClientDB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Creazione collezioni (ignora errore se già esistono)
		for _, v := range databases {
			err := database.Client.Database(database.DBName).CreateCollection(context.TODO(), v)
			if err != nil && !isCollectionExistsError(err) {
				http.Error(w, "Errore creazione collezioni", http.StatusInternalServerError)
				return
			}
		}

		// Leggi body JSON
		bodyBytes, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Errore lettura body", http.StatusBadRequest)
			return
		}
		defer r.Body.Close()

		var admin AdminUser
		if err := json.Unmarshal(bodyBytes, &admin); err != nil {
			http.Error(w, "JSON non valido", http.StatusBadRequest)
			return
		}

		// Inserisci admin in collezione Users
		collection := database.Client.Database(database.DBName).Collection("Users")
		res, err := collection.InsertOne(context.Background(), bson.M{
			"nameID":   "Administrator",
			"companyName": admin.CompanyName,
			"password": admin.Password, // idealmente password hashata prima di salvare
			"group": "Admins",
		})
		if err != nil {
			http.Error(w, "Errore inserimento dati", http.StatusInternalServerError)
			return
		}

		// Risposta con ID inserito
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(res)
	}
}

// Funzione per rilevare errore "collection already exists"
func isCollectionExistsError(err error) bool {
	return err != nil
}

