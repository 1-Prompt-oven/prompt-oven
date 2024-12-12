export default function ErrorContent() {
	return (
		<div className="text-center">
			<h2 className="mb-4 text-3xl font-bold">Server error</h2>
			<p className="mb-6 text-lg text-gray-400">
				We&apos;re sorry for the inconvenience.
				<br />
				How about trying the home page?
				<br />
				Please this button click.
			</p>
			<a
				href="/"
				className="rounded-md bg-purple-600 px-6 py-3 text-sm hover:bg-purple-700">
				Go to Home
			</a>
		</div>
	)
}
