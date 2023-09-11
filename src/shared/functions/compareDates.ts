type CompareDatesProps = {
    firstDate: string
    secondDate: string
}

/**
 * Function for comparing dates, true if the first is newer than the second
 *
 * @param {*} firstDate     First date to compare
 * @param {*} secondDate    Second date to compare
 * @returns                 Boolean, true if first is newer, otherwise false
 */
export default function CompareDates ({firstDate, secondDate}: 
CompareDatesProps): boolean | number {
    if(firstDate != null && secondDate != null){
        // Concatenating start:
        const firstYear   = (firstDate)[0] + (firstDate)[1] 
            + (firstDate)[2] + (firstDate)[3]
        const firstMonth  = (firstDate)[5] + (firstDate)[6]
        const firstDay    = (firstDate)[8] + (firstDate)[9]
        const firstHour   = (firstDate)[11] + (firstDate)[12]
        const firstMinute = (firstDate)[14] + (firstDate)[15]
        // Concatenating end:
        const secondYear     = (secondDate)[0]  + (secondDate)[1] 
            + (secondDate)[2] + (secondDate)[3]
        const secondMonth    = (secondDate)[5]  + (secondDate)[6]
        const secondDay      = (secondDate)[8]  + (secondDate)[9]
        const secondHour     = (secondDate)[11] + (secondDate)[12]
        const secondMinute   = (secondDate)[14] + (secondDate)[15]

        if (firstYear >= secondYear) {
            if(firstYear > secondYear) return false
            if (firstMonth >= secondMonth) {
                if(firstMonth > secondMonth) return false
                if (firstDay >= secondDay) {
                    if(firstDay > secondDay) return false
                    if (firstHour >= secondHour) {
                        if(firstHour > secondHour) return false
                        if (firstMinute >= secondMinute) return false
                        else return true
                    } else return true
                } else return true
            } else return true
        } else return true
        // True if no seconddate exists
    } else if (firstDate != null) return true
    // -1 if fatal error
    else return -1
}