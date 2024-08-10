import Image from "next/image"
import React from "react"

const success = () => {
	return (
		<div className="h-screen grid place-items-center">
			<div className="flex items-center justify-center flex-col gap-2">
				<Image
					width={500}
					height={500}
					src="/logo.png"
					alt="logo"
					className="max-w-[200px]"
				/>

				<h1 className="text-4xl font-bold">Thank you</h1>
				<p className="text-muted-foreground text-sm">
					You can now close this window and continue on discord
				</p>
			</div>
		</div>
	)
}

export default success
