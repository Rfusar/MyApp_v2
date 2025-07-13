package handlers

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"

    "app/exaple/db"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type Query struct {
    Method     string                 `json:"method"`     // es: get, insert, update, delete, aggregate
    Many       bool                   `json:"many"`       // true per operazioni multiple
    SetFilters map[string]interface{} `json:"setFilters"` // filtro MongoDB
    Data       map[string]interface{} `json:"data"`       // dati per insert/update/aggregate
}

type RequestQuery struct {
    Collection string `json:"collection"` // nome della collection
    Query      Query  `json:"query"`      // dettagli della query
}

func GetDatabase(database *db.ClientDB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        bodyBytes, err := io.ReadAll(r.Body)
        if err != nil {
            http.Error(w, "Errore lettura body", http.StatusBadRequest)
            return
        }
        defer r.Body.Close()

        var rq RequestQuery
        if err := json.Unmarshal(bodyBytes, &rq); err != nil {
            http.Error(w, "JSON non valido", http.StatusBadRequest)
            return
        }

        database.ConnectDB(rq.Collection)
        filter := bson.M(rq.Query.SetFilters)
        data := rq.Query.Data
        many := rq.Query.Many

        var result interface{}

        switch rq.Query.Method {
        case "get":
            result, err = database.GetData(filter)
        case "insert":
            // se many, converti map in slice
            if many {
                var docs []interface{}
                for _, v := range data {
                    docs = append(docs, v)
                }
                result, err = database.InsertData(docs, true)
            } else {
                result, err = database.InsertData(data, false)
            }
        case "update":
            result, err = database.UpdateData(filter, data, many)
        case "delete":
            result, err = database.DeleteData(filter, many)
        case "aggregate":
            pipelineSlice, ok := data["pipeline"].([]interface{})
            if !ok {
                http.Error(w, "Pipeline non valida", http.StatusBadRequest)
                return
            }

            var pipeline mongo.Pipeline
            for _, stage := range pipelineSlice {
                stageMap, ok := stage.(map[string]interface{})
                if !ok {
                    http.Error(w, "Stage pipeline non valido", http.StatusBadRequest)
                    return
                }

                for key, val := range stageMap {
                    pipeline = append(pipeline, bson.D{{Key: key, Value: val}})
                }
            }

            result, err = database.AggregateData(pipeline)
        default:
            http.Error(w, "Metodo non supportato", http.StatusBadRequest)
            return
        }

        if err != nil {
            http.Error(w, fmt.Sprintf("Errore esecuzione metodo: %v", err), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(result)
    }
}

