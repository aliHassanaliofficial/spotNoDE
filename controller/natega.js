const fs = require('fs');
const fastcsv = require('fast-csv');

async function searchCSV(number, csvFilePath) {
    const results = [];

    const stream = fs.createReadStream(csvFilePath, { encoding: 'utf8' });
    const csvStream = fastcsv.parseStream(stream, { headers: true });

    for await (const row of csvStream) {
        if (row.seating_no === number) {
            results.push({
                arabic_name: row.arabic_name,
                total_degree: row.total_degree,
                student_case_desc: row.student_case_desc,
            });
        }
    }
    return results;
}

module.exports = searchCSV;
