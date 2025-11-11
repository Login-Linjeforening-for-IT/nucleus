import config from "../constants"

type UpdateCourseProps = {
    courseID: string
    accepted: Card[]
    editing: Editing
}

type MarkProps = {
    courseID: string
    mark: boolean
}

// Fetches the scoreboard from the server
export async function getScoreBoard() {
    try {
        const response = await fetch(`${config.exam_api_url}/scoreboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        return await response.json()
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

// Fetches courses from server, different url based on location, therefore the 
// location parameter to ensure all requests are successful
export async function getCourses(): Promise<CourseAsList[] | string> {
    try {
        const response = await fetch(`${config.exam_api_url}/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        const courses = await response.json()
        return courses
    } catch (error) {
        const err = error as Error
        return err.message
    }
}

// Fetches the requested course from the server if possible.
// ID - Course ID
// location - Whether the request is coming from SSR or CSR
export async function getCourse(id: string): Promise<Course | string> {

    try {
        const response = await fetch(`${config.exam_api_url}/course/${id.toUpperCase()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        const course = await response.json()
        return course
    } catch (error) {
        const err = error as Error
        return err.message
    }
}

// Updates the passed course
export async function updateCourse({ courseID, accepted, editing }: UpdateCourseProps) {
    const user = { username: 'hei' } // getItem('user') as User | undefined
    const token = 'disabled' // getItem('token')

    try {
        if (!user) {
            throw Error('User not logged in')
        }

        const response = await fetch(`${config.exam_api_url}/course/${courseID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: user.username,
                accepted,
                editing
            })
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        const result = await response.json()
        return result
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

// Updates the user's time spent on the page
export async function updateUserTime({ time }: { time: number }) {
    const token = 'disabled' // getItem('token')
    const user = { username: 'hei' } // getItem('user') as User | undefined

    try {
        if (!user) {
            throw Error('Please log in to log your efforts.')
        }

        const response = await fetch(`${config.exam_api_url}/time`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: user.username,
                time
            })
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        const result = await response.json()
        return result
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

export async function getFile(courseID: string, name: string) {
    try {
        const response = await fetch(`${config.exam_api_url}/file/${courseID}/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        return await response.json()
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

export async function getFiles(courseID: string) {
    try {
        const response = await fetch(`${config.exam_api_url}/files/${courseID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        return await response.json()
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

export async function getUser(id: string): Promise<User | string> {
    try {
        const response = await fetch(`${config.exam_api_url}/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        const user: User = await response.json()
        return user
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

// Adds a course with the given user id, course name and questions
export async function addCourse(course: Course): Promise<void | string> {
    const user = { username: 'hei' } // getItem('user') as User | undefined
    const token = 'disabled' // getItem('token')

    try {
        if (user) {
            const response = await fetch(`${config.exam_api_url}/upload_course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: user.username,
                    course
                }),
            })

            if (!response.ok) {
                const data = await response.text()
                throw new Error(data)
            }

            const result = response.json()
            return result
        }

        return 'Please log in to add a course'
    } catch (error: unknown) {
        const err = error as Error
        return err.message
    }
}

// Adds a question to the course with the given user id
export async function addCard(courseID: string, card: Card): Promise<void | string> {
    const user = { username: 'hei' } // getItem('user') as User | undefined
    const token = 'disabled' // getItem('token')

    if (user) {
        const response = await fetch(`${config.exam_api_url}/upload_card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                courseID,
                username: user.username,
                card
            }),
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        return await response.json()
    }

    return 'Please log in to add a card'
}

// Adds a textinput to the course with the given user id
export async function sendText(courseID: string, text: string[]): Promise<void | string> {
    const user = { username: 'hei' } // getItem('user') as User | undefined
    const token = 'disabled' // getItem('token')

    if (user) {
        const response = await fetch(`${config.exam_api_url}/text`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: user.username,
                courseID,
                text
            }),
        })

        if (!response.ok) {
            const data = await response.text()
            throw new Error(data)
        }

        return await response.json()
    }

    return 'Please log in to add input'
}

export async function sendMark({ courseID, mark }: MarkProps) {
    try {
        const user = { username: 'hei' } // getItem('user') as User | undefined
    
        if (!user) {
            throw Error('You must be logged in to mark')
        }
    
        const response = await fetch(`${config.exam_api_url}/mark`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseID, mark
            })
        })
    
        if (!response.ok) {
                const data = await response.text()
                throw new Error(data)   
        }
    
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
