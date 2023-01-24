export const setHeaders = ({ authToken }) => {
    console.log({ authToken })
    return {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    }
}
