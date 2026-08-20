function Loading() {
    const loading = "/assets/gif/loading.gif"
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <img
        src={loading}
        className="w-40 h-40"
    />
</div>
    );
}

export default Loading;