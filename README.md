# newcross-chat-server

# Dummy User list : 
    [
        {
            "username" : "test1",
            "password" : "test1"
        },
        {
            "username" : "test2",
            "password" : "test2"
        }
    ]

# Login api: 
    curl --location --request POST 'http://localhost:3000/app/v1/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "test1",
        "password": "test1"
    }'

# GET Message: 
    curl --location --request GET 'http://localhost:3000/app/v1/message' \
    --header 'Authorization: Bearer <token>'

# Post Message: 
    curl --location --request POST 'http://localhost:3000/app/v1/message' \
    --header 'Authorization: Bearer <token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "message": "Hello message 3"
    }'

# To run in container: 
    docker-compose up --build