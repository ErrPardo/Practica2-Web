export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="ml-4 text-xl">Cargando, por favor espera...</p>
        </div>
    );
}
