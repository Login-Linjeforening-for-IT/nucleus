type getTagsProps = {
    event: DetailedEvent
    lang: boolean
}

/**
 * Returns an array of relevant tags for each event
 * @param event Event prop with all details
 * @param lang User set language of the app 
 * @returns string array
 */
export default function getTags({event, lang}: getTagsProps) {
    const description = lang ? event.description_no : event.description_en
    const tags: string[] = []
    
    if (description) {
        if (description.toLowerCase().includes("prog & pils") && !tags.includes("P&P")) tags.push("P&P")
        if (description.toLowerCase().includes("prog og pils") && !tags.includes("P&P")) tags.push("P&P")
        if (description.toLowerCase().includes("prog og pils") && !tags.includes("P&P")) tags.push("P&P")
        if (!event.canceled && description.includes("er avlyst") || description.includes("is cancel") && !tags.includes("Canceled")) tags.push("Canceled")
        if (description.toLowerCase().includes("workshop")) tags.push("Workshop")
    }

    if (event.canceled && !tags.includes("canceled")) tags.push("Canceled")
    if (event.highlight) tags.push("Highlighted")
    if (event.name_no.toLowerCase().includes("ctf") && event.name_no.toLowerCase().includes("ctf")) tags.push("BedCTF")
    // if (event.name_no.toLowerCase().includes("bedpres")) tags.push("Bedpres")
    if (event.name_no.toLowerCase().includes("cyberdag")) tags.push("Cyberdays")

    return tags
}