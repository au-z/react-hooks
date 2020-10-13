
export const sleep = (ms: number = 50) => new Promise((res) => setTimeout(() => res(), ms))

export const timeoutString = (str: string, delay: any) => new Promise<string>((res) => {
	setTimeout(() => res(str), delay)
})
