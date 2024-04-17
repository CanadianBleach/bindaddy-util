import * as XLSX from 'xlsx';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const sortSheet = (data) => {
    if (!data)
        return;

    // Create sorted object with header row
    let sorted = [];
    let inactive = [];
    let errored = [];

    // Header row
    console.log(data[0]);

    // Get inactive clients
    for (const row in data) {
        if (data[row].Status === "Inactive")
            inactive.push(data[row]);
    }

    console.log("INACTIVE CLIENTS", inactive.length);

    for (const m in months) {
        // Set month header row
        sorted.push({ month: months[m] })

        // Set array to hold all clients for the month
        let currentMonth = [];

        // Go through all inactive clients
        for (const row in inactive) {
            // If month went inactive = month we're on
            try {
                const cancelled = getDateCancelled(inactive[row]);
                if (m == cancelled.month - 1) {
                    console.log("FOUND")
                    currentMonth.push(inactive[row]);
                } else if (cancelled == -1) {
                    errored.push(inactive[row]);
                }
            } catch (error) {
                                console.log("ERROR", error)
                errored.push(inactive[row]);
            }
        }

        sorted.push(...currentMonth);
    }

    console.log("SORTED", sorted);

    // New workbook
    const workbook = XLSX.utils.book_new();

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(sorted, { origin: 0 });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sorted Inactive Clients');


    // Generate the CSV file
    XLSX.writeFile(workbook, 'DataSheet.xlsx');
}

// Return an object with day, month, and year
const getDateCancelled = (row) => {
    if (row.Stat == "L") {
        return splitToDate(row["First Service"].split("/"));
    } else if (row.Stat_1 == "L") {
        return splitToDate(row["Second Service"].split("/"));
    } else if (row.Stat_2 == "L") {
        return splitToDate(row["Third Service"].split("/"));
    } else if (row.Stat_3 == "L") {
        return splitToDate(row["Fourth Service"].split("/"));
    } else if (row.Stat_4 == "L") {
        return splitToDate(row["Fifth Service"].split("/"));
    } else if (row.Stat_5 == "L") {
        return splitToDate(row["Sixth Service"].split("/"));
    } else if (row.Stat_6 == "L") {
        return splitToDate(row["Seventh Service"].split("/"));
    } else if (row.Stat_7 == "L") {
        return splitToDate(row["Eigth Service"].split("/"));
    } else {
        return -1;
    }
}

const splitToDate = (split) => {
    return {
        month: parseInt(split[0]),
        day: parseInt(split[1]),
        year: parseInt(split[2])
    }
}

export {
    sortSheet,
}

