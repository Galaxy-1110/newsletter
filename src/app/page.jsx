"use client";
import React, { useState, useEffect } from "react";
const data = [
	"Product discovery and building what matters",
	"Measuring to ensure updates are a success",
	"And much more",
];

export default function Home() {
	const [error, setError] = useState(false);
	const [email, setEmail] = useState("");
	const [subscribe, setSubscribe] = useState(false);

	useEffect(() => {
		if (email === "") {
			setError(false);
			return;
		}
		const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		if (regex.test(email)) {
			setError(false);
		} else {
			setError(true);
		}
	}, [email]);

	const [windowWidth, setWindowWidth] = useState("");

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<main className="text-[#242742] md:h-dvh md:justify-center flex items-center">
			{subscribe ? (
				<div className="bg-white text-base gap-20 flex justify-center items-center w-full h-dvh md:h-auto md:max-w-[50%] lg:max-w-[40%] md:p-14 p-5 md:drop-shadow-2xl md:rounded-3xl">
					<div className="flex flex-col gap-10">
						<img className="sm:w-20 w-14" src="/icon-success.svg" />
						<h1 className="font-bold text-3xl sm:text-6xl">
							Thanks for subscribing!
						</h1>
						<p>
							A confirm email has been sent to <b>{email}</b>. Please open it
							and click the button inside to confirm your subscription
						</p>
						<button
							onClick={() => {
								setSubscribe(false);
								setEmail("");
							}}
							className="bg-[#3b3e59] text-white px-6 py-4 rounded-lg hover:bg-gradient-to-r to-[#FF6347] from-pink-500 from-10% border-none outline-none transition-all hover:drop-shadow-xl ease-in-out duration-300">
							Dismiss message
						</button>
					</div>
				</div>
			) : (
				<div className="bg-white text-base flex p-5 md:gap-20 gap-8 w-full md:w-auto md:h-auto md:max-h-[80%] h-full flex-col-reverse md:flex-row md:rounded-3xl md:p-10 md:drop-shadow-2xl">
					<div className="flex flex-col md:gap-12 gap-4 md:justify-center md:items-start">
						<section className="flex flex-col gap-5">
							<h1 className="font-bold text-5xl md:text-7xl">Stay updated!</h1>
							<p>Join 60,000+ product managers receiving monthly updates on:</p>
							{data.map((item, index) => (
								<div key={index} className="flex gap-5 items-center">
									<img src="/icon-list.svg" />
									<p>{item}</p>
								</div>
							))}
						</section>
						<section className="flex flex-col gap-7 w-full">
							<div className="flex flex-col gap-2">
								<label className="font-bold flex justify-between">
									<p>Email address:</p>{" "}
									{error ? (
										<p className="text-[#FF6347]">Valid email required</p>
									) : (
										""
									)}
								</label>
								<input
									type="email"
									placeholder="email@company.com"
									onChange={(e) => setEmail(e.target.value)}
									className={
										"border-solid border-[#A09E92] border-1.5 transition-all ease-in-out duration-300 outline-none px-6 py-4 rounded-lg " +
										(error
											? "border-[#FF6347] text-[#FF6347] bg-[#ffddd7] "
											: "")
									}
								/>
							</div>
							<button
								onClick={async () => {
									if (error == false && email !== "") setSubscribe(true);
									if (email == "") setError(true);
								}}
								className="bg-[#3b3e59] text-white px-6 py-4 rounded-lg hover:bg-gradient-to-r to-[#FF6347] from-pink-500 from-10% border-none outline-none transition-all hover:drop-shadow-xl ease-in-out duration-300">
								Subscribe to monthly newsletter
							</button>
						</section>
					</div>
					<div>
						{windowWidth >= 768 ? (
							<img className="h-full" src="/illustration-sign-up-desktop.svg" />
						) : (
							<img
								className="w-full"
								src="/illustration-sign-up-mobile.svg"></img>
						)}
					</div>
				</div>
			)}
		</main>
	);
}
