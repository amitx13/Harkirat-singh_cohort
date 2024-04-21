export default function ({ params }: { params: { routes2: string } }) {
    return (<div>hello this is catch all dynamic routes {params.routes2}</div>)
}
