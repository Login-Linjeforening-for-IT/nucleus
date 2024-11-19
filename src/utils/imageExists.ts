// Checks if a resource exists in our CDN
export default async function imageExists(url: string) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Image does not exist: ${response.text()}`)
        }

        return response.status
    } catch (error) {
        return 404
    }
}
