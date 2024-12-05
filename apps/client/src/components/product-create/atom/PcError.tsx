import React from "react"

interface PcErrorProps {
	error: string
}

function PcError({ error }: PcErrorProps) {
	return <div>{error}</div>
}

export default PcError
