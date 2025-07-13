package db

import (
	"fmt"
	"strings"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ClientDB struct {
	DBConnection string
	DBName       string
	Client       *mongo.Client
	Col          *mongo.Collection
}

//*INIT PACKAGE
func isNamespaceExistsError(err error) bool {
	return err != nil && strings.Contains(err.Error(), "NamespaceExists")
}
var collections = []string{ "Users", "Services", "APIs", }
func Init(uri, name string) (*ClientDB, error) {
	clientOpts := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), clientOpts)
	if err != nil {
		return nil, err
	}

	db := client.Database(name)

	for _, col := range collections {
		err := db.CreateCollection(context.TODO(), col)
		if err != nil && !isNamespaceExistsError(err) {
			return nil, err
		}
	}
	return &ClientDB{DBConnection: uri, DBName: name, Client: client}, nil
}


func (db *ClientDB) Ping() error {
	if db.Client == nil {
		return fmt.Errorf("Mongo client is nil")
	}
	return db.Client.Ping(context.TODO(), nil)
}


func (db *ClientDB) ConnectDB(name string) {
	db.Col = db.Client.Database(db.DBName).Collection(name)
}

//*SYSTEM
func (db *ClientDB) ListCollections() ([]string, error) {
	if db.Client == nil {
		return nil, fmt.Errorf("Mongo client is nil")
	}
	collections, err := db.Client.Database(db.DBName).ListCollectionNames(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	return collections, nil
}

func (db *ClientDB) CollectionStats(collectionName string) (bson.M, error) {
	if db.Client == nil {
		return nil, fmt.Errorf("client Mongo non inizializzato")
	}
	if db.DBName == "" {
		return nil, fmt.Errorf("nome del database non specificato")
	}

	command := bson.D{{Key: "collStats", Value: collectionName}}

	var result bson.M
	err := db.Client.Database(db.DBName).RunCommand(context.TODO(), command).Decode(&result)
	if err != nil {
		return nil, fmt.Errorf("errore nel comando collStats: %w", err)
	}

	return result, nil
}

//TODO Aggragate (da finire)
func (db *ClientDB) AggregateData(pipeline mongo.Pipeline) ([]bson.M, error) {
	if db.Col == nil {
		return nil, fmt.Errorf("Collection is nil")
	}

	cursor, err := db.Col.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}
	return results, nil
}


//*DELETE
func (db *ClientDB) DeleteData(filter interface{}, many bool) (*mongo.DeleteResult, error) {
	if db.Col == nil {
		return nil, fmt.Errorf("Collection is nil")
	}

	if many {
		return db.Col.DeleteMany(context.TODO(), filter)
	}
	return db.Col.DeleteOne(context.TODO(), filter)
}


//*INSERT
func (db *ClientDB) InsertData(data interface{}, many bool) (interface{}, error) {
	if db.Col == nil {
		return nil, fmt.Errorf("Collection is nil")
	}

	if many {
		// data deve essere []interface{}
		docs, ok := data.([]interface{})
		if !ok {
			return nil, fmt.Errorf("Data non è un array di documenti")
		}
		return db.Col.InsertMany(context.TODO(), docs)
	}
	// singolo documento
	return db.Col.InsertOne(context.TODO(), data)
}


//*UPDATE
func (db *ClientDB) UpdateData(filter interface{}, update interface{}, many bool) (*mongo.UpdateResult, error) {
	if db.Col == nil {
		return nil, fmt.Errorf("Collection is nil")
	}

	if many {
		return db.Col.UpdateMany(context.TODO(), filter, bson.M{"$set": update})
	}
	return db.Col.UpdateOne(context.TODO(), filter, bson.M{"$set": update})
}

//*VIEW
func (db *ClientDB) GetData(filter interface{}) ([]bson.M, error) {
	if db.Col == nil {
		return nil, fmt.Errorf("Collection is nil")
	}

	cursor, err := db.Col.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}
	return results, nil
}
