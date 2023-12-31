const app = require("./src/app")
const port = 4000
const server = app.listen(port, () => {
    console.log(`start port ${port}`);
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log("Server Exit");
    })
})
