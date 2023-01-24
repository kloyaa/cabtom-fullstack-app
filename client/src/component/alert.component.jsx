import { AlertIcon, ScaleFade, Alert } from "@chakra-ui/react"

export const AlertMessage = ({ type, message }) => {
    return <ScaleFade initialScale={0.9} in={true}>
    <Alert status={type} borderRadius={"md"} fontSize={"small"}>
      <AlertIcon />
      {message}
    </Alert>
</ScaleFade>
}
