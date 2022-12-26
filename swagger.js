const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api/controllers/*.js']

swaggerAutogen(outputFile, endpointsFiles)