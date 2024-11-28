export const promptVariableRegex = /\[[^\]]+]/g

export interface PromptVariableType {
	name: string
	value: string
}
export const extractPromptVariables = (
	prompt: string,
): PromptVariableType[] => {
	const matches = prompt.match(promptVariableRegex)

	if (matches) {
		const uniqueVariables = Array.from(new Set(matches)).map((variable) =>
			variable.slice(1, -1),
		)
		// Create a new array of fields based on the order of uniqueVariables
		return uniqueVariables.map((variable) => {
			return { name: variable, value: "" }
		})
	}
	// No variables found, remove all fields
	return []
}

export const replaceVariables = (
	prompt: string,
	variableValues: Record<string, string>,
): string => {
	return prompt.replace(promptVariableRegex, (match, variableName) => {
		if (Object.prototype.hasOwnProperty.call(variableValues, variableName)) {
			return `[${variableValues.variableName}]`
		}
		return match
	})
}
