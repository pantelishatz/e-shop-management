const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')
const Partner = require('./models/partner.model');


exports.options = {
    "definitions": {
        User: m2s(User),
        Product: m2s(Product),
        Partner: m2s(Partner)
    },


    "swagger":"2.0",
    "info":{
        "version":"1.0.0",
        "description": "Products Project Application API",
        "title": "Products CRUD API"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [
        {
            "name": "Users",
            "description": "API for users",
        },
        
        {
            "name": "Products",
            "description": "API for Products"
        },
        {
            "name": "Partners",
            "description": "API for partners"
        },
        
        {
            "name": "Users and Products",
            "description": "API for users and their products"
        },
    ],
    "schemes":["http"],
    "consumes": ["application/json"],
    "produces":["application/json"],
    "paths": {
        "/api/user/findAll": {
            "get": {
                "tags": [
                    "Users"
            ],
            "summary": "Get all users from system",
            "responses": {
                "200": {
                    "description": "OK",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                }
            }
        }
    },
    "/api/user/findOne/{username}": {
        "get": {
            "tags": [
                "Users"
        ],
        "parameters": [
            {
                "name": "username",
                "in": "path",
                "required": true,
                "description": "Username of user",
                "type": "string"
            }
        ],
        "summary": "Get a user from system",
        "responses": {
            "200": {
                "description": "User find",
                "schema": {
                    "$ref": "#/definitions/User"
                }
            }
        }
    }
},
"/api/user/login": {
  "post": {
      "tags": [
          "Users"
      ],
      "parameters": [
          {
              "name": "username",
              "in": "body",
              "required": true,
              "description": "Username of user",
              "type": "string"
          },
          {
              "name": "password",
              "in": "body",
              "required": true,
              "description": "Password of user",
              "type": "string"
          }
      ],
      "summary": "User login",
      "responses": {
          "200": {
              "description": "Successful login",
              "schema": {
                  "$ref": "#/definitions/User"
              }
          },
          "400": {
              "description": "Invalid username or password"
          }
      }
  }
},
"/api/user/create": {
    "post": {
        "tags": [
            "Users"
        ],
        "description": "Create new user in app",
        "parameters": [{
            "name": "Parameters for user",
            "in": "body",
            "description": "Users parameters that we will create",
            "schema": {
                 "$ref": "#/definitions/User",
                "properties": {
                    "name": { "type":"string" },
                    "surname": { "type":"string" },
                  "username": {"type":"string"},
                    "password": {"type":"string"},
                    "email": { "type":"string" },
                    "address": {"type": "string"},
                    "phone":{"type": "string"}, 
        },
        "required": ["username", "email"]
            }
            }],
            "produces": ["application/json"],
            "responses": {
                "200": {
                    "description": "New user is created",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                }
            }
        }
    },
    "/api/user/update/:username": {
        "patch":{
            "tags":[
                "Users"
            ],
            "description": "Update user in system",
            "parameters": [{
                "name": "username",
                "in": "body",
                "required": true,
                "description": "Username of user",
                "type": "string",
                "description": "User that will update",
                "schema": {
                    "type": "object",
                    "properties": {
                        "username": {"type": "string"},
                        "name": {"type": "string"},
                        "surname": {"type": "string"},
                        "email": {"type": "string"},
                        "address": {"type": "string"},
                        "phone":{"type": "string"}, 
                    },
                    "required": ["email"]
                }
            }],
            "produces": ["application/json"],
            "responses": {
                "200": {
                    "description": "Updated user"
                }
            }
        }
    },
    "/api/user/delete/{username}": {
        "delete": {
            "tags": [
                "Users"
            ],
            "description": "Deleted user from the system",
            "parameters":[{
                "name": "username",
                "in": "path",
                "description": "Username that we will delete"
            }],
            "responses": {
                "200": {
                    "description": "Deleted user"
                }
            }
        }
    },
    "/api/product/findAll": {
        "get": {
          "tags": [
            "Products"
          ],
          "summary": "Get all products from system",
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/Product"
              }
            }
          }
        }
      },
      "/api/product/create": {
        "post": {
          "tags": [
            "Products"
          ],
          "description": "Create new product in app",
          "parameters": [
            {
              "name": "Parameters for product",
              "in": "body",
              "description": "Product parameters that we will create",
              "schema": {
                "$ref": "#/definitions/Product"
              }
            }
          ],
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "New product is created",
              "schema": {
                "$ref": "#/definitions/Product"
              }
            }
          }
        }
      },
      "/api/product/update/{product}": {
        "patch": {
          "tags": [
            "Products"
          ],
          "description": "Update a product in app",
          "parameters": [
            {
              "name": "product",
              "in": "path",
              "description": "Name of product that needs to be updated",
              "type": "string",
              "required": true
            },
            {
              "name": "Update product in system",
              "in": "body",
              "description": "Product details to be updated",
              "schema": {
                "type": "object",
                "properties": {
                  "cost": {"type": "number"},
                  "description": {"type": "string"} ,
                  "quantity": {"type": "number"}
                }
              }
            }
          ],
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Product is updated",
            }
          }
        }
      },
      "/api/product/delete/{product}": {
        "delete": {
          "tags": [
            "Products"
          ],
          "description": "Delete a product in app",
          "parameters": [
            {
              "name": "product",
              "in": "path",
              "description": "ID of product that needs to be deleted",
              "required": true,
              "type": "string"
            }
          ],
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Product is deleted",
              "schema": {
                "$ref": "#/definitions/Product"
              }
            }
          }
        }
      },
        "/api/partner/findAll": {
          "get": {
            "tags": [
              "Partners"
            ],
            "summary": "Get all partners from the system",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Partner"
                }
              }
            }
          }
        },
        "/api/partner/create": {
          "post": {
            "tags": [
              "Partners"
            ],
            "description": "Create a new partner in the app",
            "parameters": [
              {
                "name": "Parameters for partner",
                "in": "body",
                "description": "Partner parameters that will be created",
                "schema": {
                  "$ref": "#/definitions/Partner"
                }
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "New partner is created",
                "schema": {
                  "$ref": "#/definitions/Partner"
                }
              }
            }
          }
        },
        "/api/partner/update/{surname}": {
          "patch": {
            "tags": [
              "Partners"
            ],
            "description": "Update a partner in the app",
            "parameters": [
              {
                "name": "surname",
                "in": "path",
                "description": "Surname of the partner that needs to be updated",
                "type": "string",
                "required": true
              },
              {
                "name": "Update partner in system",
                "in": "body",
                "description": "Partner details to be updated",
                "schema": {
                  "type": "object",
                  "properties": {
                    "address": {"type": "string"},
                    "phone": {"type": "string"},
                    "role": {"type": "string"}
                  }
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Partner is updated"
              },
              "404": {
                "description": "Partner not found"
              },
              "500": {
                "description": "Error updating partner"
              }
            }
          }
        },
        "/api/partner/delete/{surname}": {
          "delete": {
            "tags": [
              "Partners"
            ],
            "description": "Delete a partner from the app",
            "parameters": [
              {
                "name": "surname",
                "in": "path",
                "description": "Surname of the partner that needs to be deleted",
                "required": true,
                "type": "string"
              }
            ],
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "description": "Partner is deleted",
                "schema": {
                  "$ref": "#/definitions/Partner"
                }
              }
            }
          }
        },
    '/api/userproducts/findone/{username}': {
        "get": {
            "tags": [
                "Users and Products"
            ],
            "parameters": [{
                "name": "username",
                "in": "path",
                "description": "Find user's products",
                "type": "string"
        }],
        "responses":{
            "200": {
                "description": "User and Products"
            }
        }
        }
    }  
  }
}