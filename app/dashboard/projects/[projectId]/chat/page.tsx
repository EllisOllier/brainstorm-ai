export default async function Chat({
  params,
}: {
  params: Promise<{ projectId: string }>
}){
    const { projectId } = await params;
    return (
        <div>
            <h1>Chat Page</h1>
            <h2>Project: {projectId}</h2>
        </div>
    )
}