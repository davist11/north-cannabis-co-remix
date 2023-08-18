export const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black/70">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="lds-hourglass"></div>
            </div>
        </div>
    )
}
