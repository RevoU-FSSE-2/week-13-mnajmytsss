import { ReactNode, useMemo } from "react"

interface Props {
    status: ReactNode;
}

const useStatus = ({ status }: Props) => {
    
    const formatStatus = useMemo (
        () => {
            if(status === true) {
                return 'Active'
            }

            return 'Deactive'
        },
        [status]
    )

    return formatStatus
}

export default useStatus