import { LDAP_API_URL } from "@/constants";
import valid from "./valid";

type LoginProps = {
    username: string
    password: string
}

export default async function login({username, password}: LoginProps) {

    const response = await fetch(LDAP_API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: username, pass: password})
    })

    if (!response.ok) {
        console.log("Fetch failed")
        return false
    }

    const data = await response.json()
    return valid(data.authorized)
}
