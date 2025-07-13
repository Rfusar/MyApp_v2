package handlers

import (
	"encoding/json"
	"net/http"
	"app/exaple/db"
)

type SystemRequest struct {
	Action string `json:"action"` // "test-connection" o "list-collections"
}

type CollectionStat struct {
	Collection string `json:"collection"`
	Size       int32  `json:"size"`
	Count      int32  `json:"count"`
}

type SystemResponse struct {
	Message     string           `json:"message,omitempty"`
	Collections []CollectionStat `json:"collections,omitempty"`
}

func GetStatusSystem(database *db.ClientDB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		w.Header().Set("Content-Type", "application/json")

		var req SystemRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "JSON non valido", http.StatusBadRequest)
			return
		}

		switch req.Action {
		case "test-connection":
			if err := database.Client.Ping(r.Context(), nil); err != nil {
				json.NewEncoder(w).Encode(SystemResponse{Message: "Connessione fallita: " + err.Error()})
			} else {
				json.NewEncoder(w).Encode(SystemResponse{Message: "Connessione riuscita"})
			}

		case "list-collections":
			cols, err := database.Client.Database(database.DBName).ListCollectionNames(r.Context(), struct{}{})
			if err != nil {
				http.Error(w, "Errore nel recupero collezioni", http.StatusInternalServerError)
				return
			}

			var stats []CollectionStat
			for _, col := range cols {
				stat, err := database.CollectionStats(col)
				if err != nil {
					continue // Ignora le collezioni con errori
				}

				stats = append(stats, CollectionStat{
					Collection: col,
					Size:       int32(stat["size"].(int32)),
					Count:      int32(stat["count"].(int32)),
				})
			}
			json.NewEncoder(w).Encode(SystemResponse{Collections: stats})

		default:
			http.Error(w, "Azione non riconosciuta", http.StatusBadRequest)
		}
	}
}

