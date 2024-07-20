TESTDB.createCollection( "Customers" ,
  {"$jsonSchema":{"bsonType":"object","additionalProperties":false,"required":["_id","FullName","VerifiedAge"],
    "properties": {
    "_id":{"bsonType":"double","description":"PK CustomerId becomes _id "},
    "FirstPurchase":{"bsonType":"date"},
    "LatestPurchase":{"bsonType":"date"},
    "FullName":{"bsonType":"string"},
    "VerifiedAge":{"bsonType":"int"}}},
    "$expr": [
    {"$gte":["$VerifiedAge",18]},
    {"$lte":["$FirstPurchase","$LatestPurchase"]}]}
)