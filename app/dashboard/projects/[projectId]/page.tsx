import Editor from '@/component/Editor'

export default async function Project({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    // Wait for projectId passed into function
    const { projectId } = await params;

    return (
        <div>
            <h1>Project: {projectId}</h1>
            <Editor />
        </div>
    );
}
