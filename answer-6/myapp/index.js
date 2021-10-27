const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const neatCsv = require('neat-csv');
const hostname = '127.0.0.1';
const port = 3001;
const filePath = path.join(__dirname, '/data/data.csv');
const destinationPath = path.join(__dirname, '/data/');

const server = http.createServer(async (req, res) => {
  try {
    const fileData = await fs.readFile(filePath, "utf8"); // read data from CSV file
    const csvData = await neatCsv(fileData); // convert file to JSON format
    let splitDataByCompany = {};

    csvData.forEach((item) => {
      if (!splitDataByCompany[item.Company]) {
        splitDataByCompany[item.Company] = [];
      }
      const index = splitDataByCompany[item.Company].findIndex((s) => s.UserId === item.UserId);
      if (index !== -1) {
        if (splitDataByCompany[item.Company][index].Version <= item.Version) {
          // remove the record which has a lower version
          splitDataByCompany[item.Company].splice(index, 1);

          // add new record
          splitDataByCompany[item.Company].push({ ...item, FirstName: item.Name.split(" ")[0], LastName: item.Name.split(" ")[1] });
        }
      } else {
        // if the same userid doesn't exist, then just add new record
        splitDataByCompany[item.Company].push({ ...item, FirstName: item.Name.split(" ")[0], LastName: item.Name.split(" ")[1] }); // Add FirstName and LastName attributes to each item. 
      }
    })

    for ([key, value] of Object.entries(splitDataByCompany)) {
      // sort by Last and First Name
      const sortedValue = value.sort((a, b) => a.LastName > b.LastName ? 1 : a.LastName === b.LastName ? a.FirstName - b.FirstName : -1);
      let fileData = "";
      sortedValue.forEach((item) => {
        delete item.FirstName;
        delete item.LastName;
        fileData += JSON.stringify(item);
      })
      fs.writeFile(destinationPath + key + ".txt", fileData, (err) => { if (err) throw err; });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify("DONE"));
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
