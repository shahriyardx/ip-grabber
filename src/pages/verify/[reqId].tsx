import React, { useState } from "react"
import { Check, Dot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CheckedState } from "@radix-ui/react-checkbox"
import { toast } from "sonner"
import useParams from "@/hooks/useParams"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/router"

const Verify = () => {
	const router = useRouter()
	const { reqId } = useParams<{ reqId: string }>()
	const [agree, setAgree] = useState<CheckedState>()
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(1)

	const recordIp = async () => {
		if (!agree) {
			return toast.error("Please agree to our terms and conditions")
		}

		setLoading(true)

		const response = await fetch(`/api/verify/${reqId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})

		const data = (await response.json()) as { success: boolean }
		if (data.success) {
			router.push("/verify/success")
		}

		setLoading(false)
	}

	return (
		<div className="max-w-5xl mx-auto px-5 pt-5">
			<div className="flex flex-col items-center justify-center">
				<Image
					width={500}
					height={500}
					src="/logo.png"
					alt="logo"
					className="max-w-[100px]"
				/>
				<h1 className="text-3xl font-extrabold mt-2 text-brand">
					Welcome to CNC Leagues
				</h1>
			</div>
			{step === 1 && (
				<div className="mt-5">
					<p className="text-lg font-extrabold">
						IF YOU DO NOT FOLLOW EACH STEP SPECIFICALLY AND GET BANNED THROUGH
						VERIFICATION YOU WILL HAVE TO APPEAL YOUR BAN AND PAY TO BE UNBANNED
					</p>

					<p className="text-lg font-extrabold mt-3">
						YOU ARE AGREEING AND CONSENTING TO RULES AND DATA ACQUIRED. WE HAVE
						ZERO TOLERANCE AND WILL GIVE NO LEEWAY.
					</p>

					<div className="mt-5">
						<p className="underline">A few things before we get started</p>
						<ul>
							<li className="flex items-center gap-2">
								<Check className="text-primary" size={14} /> You must be home
								and connected to your home internet to verify.
							</li>
							<li className="flex items-center gap-2">
								<Check className="text-primary" size={14} /> You must have
								access to the internet from your home.
							</li>
							<li className="flex items-center gap-2">
								<Check className="text-primary" size={14} /> You must have your
								video game console available and connected to your home
								internet!
							</li>
						</ul>
						<p className="mt-2">
							We hope you believe in what we are building and hope you want to
							be a part of it. If you can meet each objective above, Please
							Click Continue.
						</p>
					</div>

					<div className="mt-5">
						<Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
					</div>
				</div>
			)}

			{step === 2 && (
				<div className="mt-5">
					<p>
						Please take a moment to read the following bullet points and if you
						agree to the our foundation then please take the Oath to Protect the
						League.
					</p>

					<div className="mt-5">
						<div className="grid gap-2">
							<div>
								<Label>
									1. This is a non-toxic league. We are a brotherhood and
									sisterhood. We are here for each other to create the best
									league.
								</Label>

								<ul className="text-sm mt-2">
									<li>
										<Dot className="inline-block text-primary" /> We have a 3
										Strike System.
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										1st strike is a warning (7 day mute) - this can be reduced
										with a mute appeal and buyout.
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										2nd strike is a (21 day mute) - this can be reduced with a
										mute appeal and buyout.
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										3rd strike will result in a Toxic Ban - this can be appealed
										and bought out.
									</li>
								</ul>
							</div>

							<div>
								<Label>
									2. Do not DOX people (No Personal Information) - Instant Toxic
									Ban
								</Label>
							</div>

							<div>
								<Label>
									3. Do not threaten people (No Hate Speech or Harmful Language)
								</Label>
							</div>

							<div>
								<Label>4. Do not refuse to play for anyone</Label>
							</div>

							<div>
								<Label>
									5. Do not cheat or knowingly let others cheat - Instant Cheat
									Ban
								</Label>
							</div>

							<div>
								<Label>6. Do not talk about politics or religion</Label>
							</div>

							<div>
								<Label>
									7. Rules are subject to common sense, What we deem toxic, you
									might not. Proceed with caution.
								</Label>
							</div>

							<div>
								<Label>
									8. Admin and Staff volunteer their time for the league, treat
									them with respect
								</Label>
							</div>

							<div>
								<Label>9. Do not harmfully comment about the following:</Label>
								<ul className="text-sm mt-2">
									<li>
										<Dot className="inline-block text-primary" /> Spouses
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										Children
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										Mothers
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										Sexual Orientation/Preference
									</li>
									<li>
										<Dot className="inline-block text-primary" />
										Race
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}

			{step === 2 && (
				<>
					<div className="items-top flex space-x-2 mt-5">
						<Checkbox onCheckedChange={(val) => setAgree(val)} id="terms" />
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								I agree to all of above and willing to take the Oath to protect
								the League
							</label>
							<p className="text-sm text-muted-foreground">
								by clicking this we assume that you have read all the points
								above and did not skip any of them.
							</p>
						</div>
					</div>
					<div className="mt-5">
						<Button onClick={() => recordIp()} disabled={loading}>
							<Loader2
								size={14}
								className={cn("animate-spin mr-2", !loading && "hidden")}
							/>
							Take the Oath
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

export default Verify
