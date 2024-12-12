export default function NotFoundContent() {
	return (
		<div className="text-center">
			<h2 className="mb-4 text-3xl font-bold">Page does not exist</h2>
			<p className="mb-6 text-lg text-gray-400">
				The page you&apos;re looking for doesn&apos;t exist. <br />
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
