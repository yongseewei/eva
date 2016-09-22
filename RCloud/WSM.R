# keep snippets here while working with your notebook's cells
calculateWSM <- function(dataTable) {
    # Normalize the numerical data
    rating <- normalizeRating(dataTable["Rating"])
    price <- linearNormalize(dataTable["Price"])
    distance <- linearNormalize(dataTable["Distance"])
    
    # create a new data frame/table
    normTable <- data.frame(rating, price, distance)
    normTableColNum <- length(normTable)
    normTableRowNum <- nrow(normTable)
    
    # Get ROC weights based on number of columns/factors
    ROC <- getROC(normTableColNum)
    
    # Calculate the WSM score for each row
    score <- data.frame()
    for(i in 1:normTableRowNum) {
        row <- normTable[i,]
        score[i, 1] <- ROC[1]*row["Rating"] + ROC[2]*(1-row["Price"]) + ROC[3]*(1-row["Distance"])
    }
    
    # Append score to table, order preserved
    dataTable["Score"] <- score
    
    # Sort the table by score, descending order
    dataTable <- dataTable[with(dataTable, order(-Score)), ]
    
    dataTableColNum = length(dataTable)
    dataTableRowNum = nrow(dataTable)
    
    # Loop Through each row
    stringTable <- ""
    for(i in dataTableRowNum:1) {
        # Loop through each column of each row
        tempRowString <- ""
        for (j in dataTableColNum:1) {
            tempRowString <- paste(dataTable[i,j], tempRowString, sep=",")
        }
        stringTable <- paste(tempRowString, stringTable, sep="\n")
    }
    
    return(stringTable)
}


getROC <- function(numOfRanks) {
    ROCList <- list()
    for (i in 1:numOfRanks) {
        weight <- 0
        for (j in i:numOfRanks) {
            weight <- weight + (1/j) 
        }
        weight <- weight / numOfRanks
        ROCList[i] <- weight
    }
    return(ROCList)
}

linearNormalize <- function(x) {
   (x-min(x))/(max(x)-min(x))
}

normalizeRating <- function(x) {
   (x-1)/(5-1)
}
