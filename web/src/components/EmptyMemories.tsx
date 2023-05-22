export function EmptyMemories() {
    return (
        <div className="flex p-16 flex-1 items-center justify-center">
            <p className="text-center leading-relaxed w-[360px]">
                You still haven't registered any memory, start {' '}
                <a href="" className="underline hover:text-gray-50">
                    creating now
                </a>
                !
            </p>
        </div>
    )
}