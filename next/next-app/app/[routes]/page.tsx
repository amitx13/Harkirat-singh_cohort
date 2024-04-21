export default function routeExample({ params }: { params: { routes: string } }) {
	return (
		<div>Hello dynamic {params.routes}</div>
	)
}
