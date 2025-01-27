import { ResponseStatuses } from "@/modules/CustomAPI/ReponseStatuses";

export const appDetails = {
    name: "Test",
    description: "This is a sample server Petstore server. You can find out more about Swagger at http://swagger.io or on irc.freenode.net, #swagger.",
    path: "/api/v1/pet",
    swaggerJson: "\n{\n  \"openapi\": \"3.0.0\",\n  \"info\": {\n    \"title\": \"Stupro API\",\n    \"version\": \"v2\"\n  },\n  \"servers\": [\n    {\n      \"url\": \"https://stupro.stublab.in/v2\",\n      \"description\": \"Production Server\"\n    }\n  ],\n  \"paths\": {\n    \"/getUserDetails\": {\n      \"get\": {\n        \"summary\": \"Get User Details\",\n        \"description\": \"Fetch user details from Mongo DB\",\n        \"responses\": {\n          \"200\": {\n            \"description\": \"Successful operation\",\n            \"content\": {\n              \"application/json\": {\n                \"schema\": {\n                  \"type\": \"object\",\n                  \"properties\": {\n                    \"AVAILABLE\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"sold\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"not-available\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"Added\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"string\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"Test\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"pending\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"available\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"Not Av\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"terminator\": { \"type\": \"integer\", \"format\": \"int32\" },\n                    \"adopted\": { \"type\": \"integer\", \"format\": \"int32\" }\n                  }\n                }\n              }\n            }\n          },\n          \"400\": {\n            \"description\": \"Invalid status value\"\n          },\n          \"503\": {\n            \"description\": \"Service Error\"\n          }\n        }\n      },\n      \"post\": {\n        \"summary\": \"Create User Details\",\n        \"description\": \"Create user details and add it to Mongo DB\",\n        \"requestBody\": {\n          \"required\": true,\n          \"content\": {\n            \"application/json\": {\n              \"schema\": {\n                \"type\": \"object\",\n                \"properties\": {\n                  \"AVAILABLE\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"sold\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"not-available\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"Added\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"string\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"Test\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"pending\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"available\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"Not Av\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"terminator\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"adopted\": { \"type\": \"integer\", \"format\": \"int32\" }\n                }\n              }\n            }\n          }\n        },\n        \"responses\": {\n          \"201\": {\n            \"description\": \"User created successfully\"\n          },\n          \"400\": {\n            \"description\": \"Bad Request\"\n          },\n          \"503\": {\n            \"description\": \"Service Error\"\n          }\n        }\n      },\n      \"put\": {\n        \"summary\": \"Update User Details\",\n        \"description\": \"Update user details in Mongo DB\",\n        \"requestBody\": {\n          \"required\": true,\n          \"content\": {\n            \"application/json\": {\n              \"schema\": {\n                \"type\": \"object\",\n                \"properties\": {\n                  \"AVAILABLE\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"sold\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"not-available\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"Added\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"string\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"Test\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"pending\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"available\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"Not Av\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"terminator\": { \"type\": \"integer\", \"format\": \"int32\" },\n                  \"adopted\": { \"type\": \"integer\", \"format\": \"int32\" }\n                }\n              }\n            }\n          }\n        },\n        \"responses\": {\n          \"200\": {\n            \"description\": \"User updated successfully\"\n          },\n          \"400\": {\n            \"description\": \"Bad Request\"\n          },\n          \"500\": {\n            \"description\": \"Internal Server Error\"\n          }\n        }\n      }\n    }\n  }\n}\n",
    apiDetails: [{
        id: "12345",
        method: "GET",
        url: "/api/v1/get",
        name: "Get api",
        defaultStatusCode: "200",
        responseStatusCodes: [{
            code: 200
        },
        {
            code: 201
        },
        {
            code: 400
        },
        {
            code: 500
        },
        {
            code: 404
        },
    ]

    },
    {
        id: "12345",
        method: "POST",
        url: "/api/v1/post",
        name: "Post api",
        defaultStatusCode: "200",
        responseStatusCodes: [{
            code: 200
        },
        {
            code: 201
        },
        {
            code: 400
        },
        {
            code: 500
        },
        {
            code: 404
        },
    ]

    }, {
        id: "12345",
        method: "PUT",
        url: "/api/v1/put",
        name: "Put api",
        defaultStatusCode: "200",
        responseStatusCodes: [{
            code: 200
        },
        {
            code: 201
        },
        {
            code: 400
        },
        {
            code: 500
        },
        {
            code: 404
        },
    ]

    }, {
        id: "12345",
        method: "DELETE",
        url: "/api/v1/delete",
        name: "Delete api",
        defaultStatusCode: "200",
        responseStatusCodes: [{
            code: 200
        },
        {
            code: 201
        },
        {
            code: 400
        },
        {
            code: 500
        },
        {
            code: 404
        },
    ]
    }],
}