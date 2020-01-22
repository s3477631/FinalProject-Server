function csvParsing(csvFile) {
    result = Papa.parse(csvFile)
    return result
}