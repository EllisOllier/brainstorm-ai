export default async function Project({
  params,
}: {
  params: Promise<{ projectId: string }>
}){
    const { projectId } = await params;
    return (
        <div>
            <h1>Project: {projectId}</h1>
        </div>
    )
}